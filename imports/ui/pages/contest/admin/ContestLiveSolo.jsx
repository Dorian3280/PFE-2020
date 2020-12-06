import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React, { useState, useCallback, useEffect } from "react";

import TableLive from './TableLive';
import TableResult from './TableResult';

import Background from '../../../components/Background';
import BackgroundOpacity from '../../../components/BackgroundOpacity';
import GridContest from '../../../components/GridContest';
import MainEvent from '../../../components/MainEvent';
import KindChoice from '../../../components/KindChoice';
import Span from '../../../components/Span';
import Flex from '../../../components/Flex';
import CenterFlex from '../../../components/CenterFlex';
import Button from '../../../components/Button';
import OptionsContainer from '../../../components/OptionsContainer';
import OptionsButton from '../../../components/OptionsButton';
import OptionsMenu from '../../../components/OptionsMenu';
import OptionsHover from '../../../components/OptionsHover';

import { tablesToExcel } from '/imports/utils/methods';

import Climbers from '/imports/api/climbers/index';
import Boulders from '/imports/api/boulders/index';

var moment = require('moment');

const ContestLiveSolo = (props) => {

  const [ contest, setContest ] = useState({});
  const [ userLink, setUserLink ] = useState("");
  const [ climbers, setClimbers ] = useState({ men: [], women: [] });
  const [ boulders, setBoulders ] = useState({ men: [], women: [] });
  const [ kindActive, setKindActive ] = useState("men");
  const [ optionsActive, setOptionsActive ] = useState(false);

  const { code } = props.match.params;

  // Si il n'est pas connecté
  const userId =  useTracker(() => Meteor.userId(), []);
  useEffect(() => {
      if (!userId) props.history.push('/')
  }, [userId]);

  useEffect(() => {
    Meteor.callWithPromise('contest.findByCode', code)
    .then(res => {
      setContest(res);
      setUserLink(`contest_${res.hostName}&${res.code}`)
    }).catch( err => console.log(err.message))
  }, []);

  const [readyTrackerClimbers, trackerClimbers] = useTracker(() => {
    const publication = Meteor.subscribe('climbers.findAll', code);

    return [
      publication.ready(),
      Climbers.find({}).fetch()
    ];
  }, [Climbers]);

  const [readyTrackerBoulders, trackerBoulders] = useTracker(() => {
    const publication = Meteor.subscribe('boulders.findAll');

    return [
      publication.ready(),
      Boulders.find({}).fetch()
    ];
  }, [Boulders]);

  useEffect(() => {
    if (readyTrackerClimbers) {
      setClimbers({
        men: trackerClimbers.filter(climber => climber.kind == 'men'),
        women: trackerClimbers.filter(climber => climber.kind == 'women')
      })
    }
  }, [trackerClimbers, readyTrackerClimbers]);

  useEffect(() => {
    if (readyTrackerBoulders) setBoulders(trackerBoulders)
  }, [trackerClimbers, readyTrackerBoulders]);

  const addClimbers = useCallback((kind) => Meteor.call('climber.create', { kind, code }), [])

  const setClimberName = useCallback((event) => {
    const id = event.target.parentNode.parentNode.attributes.id.value;
    const type = event.target.attributes.data.value;
    const value = event.target.value;
    
    Meteor.call('climber.updateName', id, type, value)
  }, []);

  const successBoulder = useCallback((event) => {

    //if (moment().toDate() < contest.startAt) {console.log('Le contest n\'a pas commencé'); return false}

    const idBoulder = parseInt(event.target.attributes.id.value);
    const idClimber = event.target.parentNode.attributes.id.value;
    const kind = event.target.parentNode.attributes.kind.value;
    const push = !climbers[kind].find(e => e._id == idClimber).boulders.includes(idBoulder);

    Meteor.call('climber.updateBouldersOfClimber', idClimber, idBoulder, push)
    Meteor.call('boulders.updateBoulder', {idBoulder, idClimber, methods: contest.methods, kind, push})

  }, [boulders, climbers]);

  return (
    <>
      <Background page="contest"></Background>
      <BackgroundOpacity></BackgroundOpacity>
      <OptionsContainer active={optionsActive}>
        <OptionsButton onClick={() => setOptionsActive(!optionsActive)} active={optionsActive}>
          <Flex jcc="space-evenly" aic="center">
            <Span size="1.8">{optionsActive ? '↓' : `↑`}</Span>
            <Span size="1.8">Options</Span>
            <Span size="1.8">{optionsActive ? '↓' : '↑'}</Span>
          </Flex>
        </OptionsButton>
        <OptionsHover onClick={() => setOptionsActive(!optionsActive)} active={optionsActive}></OptionsHover>
        <OptionsMenu>
          <Flex fld="column" jcc="center" aic="center" rGap="10">
            <Span size="1.3">En solo</Span>
            <Span size="1.3">{contest.nbrBoulder} blocs</Span>
            <Span size="1.3">{contest.hostName}</Span>
          </Flex>
          <Flex fld="column" jcc="center" aic="center" rGap="10">
            <Span size="1.5">Règles du Contest</Span>
            <Span size="1.5"><a target="_blank" href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://live-contest.com/${userLink}`}>Lien QR Code</a></Span>    
            <button id="test-table-xls-button" onClick={() => tablesToExcel(['men-result', 'women-result'], ['men', 'result'], 'myfile.xls')}>Export to Excel</button>
          </Flex>
        </OptionsMenu>
      </OptionsContainer>
      <GridContest>
        <Flex fld="column" aic="center" style={{borderRight: '1px solid lightGrey'}}>
          <Span marginY="20" size="1.8">Résultats Femmes</Span>
          <TableResult kind="women" climbers={climbers['women']}/>
        </Flex>
        <MainEvent>
          <Flex fld="column" aic="center">
            <Flex width="80%" height="12%" jcc="space-evenly" aic="center">
              <Flex contain="true" fld="row"> 
                  <KindChoice onClick={() => setKindActive('men')} actif={kindActive === "men"}><CenterFlex>HOMMES</CenterFlex></KindChoice>
                  <KindChoice onClick={() => setKindActive('women')} actif={kindActive === "women"}><CenterFlex>FEMMES</CenterFlex></KindChoice>
              </Flex>
              <Button onClick={() => addClimbers(kindActive)}>Ajouter un{kindActive === 'men' ? ' grimpeur' : 'e grimpeuse'}</Button>
            </Flex>
            <TableLive
              kind = {kindActive}
              nbrBoulder = {contest.nbrBoulder}
              climbers = {climbers}
              setClimberName = {setClimberName}
              successBoulder = {successBoulder}
            />
          </Flex>
        </MainEvent>
        <Flex fld="column" aic="center" style={{borderLeft: '1px solid lightGrey'}}>
          <Span marginY="20" size="1.8">Résultats Hommes</Span>
          <TableResult kind="men" climbers={climbers['men']}/>
        </Flex>
      </GridContest>
    </>
  )
};

export default ContestLiveSolo;