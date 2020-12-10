import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React, { useState, useCallback, useEffect } from "react";

import TableLive from './components/TableLive';
import TableResult from './components/TableResult';
import Options from './components/Options';

import Background from '../../../elements/Background';
import BackgroundOpacity from '../../../elements/BackgroundOpacity';
import GridContest from '../../../elements/GridContest';
import MainEvent from '../../../elements/MainEvent';
import KindChoice from '../../../elements/KindChoice';
import Span from '../../../elements/Span';
import Flex from '../../../elements/Flex';
import CenterFlex from '../../../elements/CenterFlex';
import Button from '../../../elements/Button';

import Climbers from '/imports/api/climbers/index';
import Boulders from '/imports/api/boulders/index';

var moment = require('moment');

const ContestLiveSolo = (props) => {

  const [ contest, setContest ] = useState({});
  const [ userLink, setUserLink ] = useState("");
  const [ climbers, setClimbers ] = useState({ 1: [], 2: [] });
  const [ boulders, setBoulders ] = useState({ 1: [], 2: [] });
  const [ kind, setKind ] = useState(1);
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
    }).catch(err => console.log(err.message))
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
        1: trackerClimbers.filter(climber => climber.kind === 1),
        2: trackerClimbers.filter(climber => climber.kind === 2)
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

    //if (moment().toDate() < contest.startAt) return false

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
      <Options
        setOptionsActive={setOptionsActive}
        optionsActive={optionsActive}
        contest={contest}
        userLink={userLink}
      ></Options>
      <GridContest>
        <Flex fld="column" aic="center" style={{borderRight: '1px solid lightGrey'}}>
          <Span marginY="20" size="1.8">Résultats Femmes</Span>
          <TableResult kind={2} climbers={climbers[2]}/>
        </Flex>
        <MainEvent>
          <Flex fld="column" aic="center">
            <Flex width="80%" height="12%" jcc="space-evenly" aic="center">
              <Flex contain="true" fld="row"> 
                  <KindChoice onClick={() => setKind(1)} actif={kind === 1}><CenterFlex>HOMMES</CenterFlex></KindChoice>
                  <KindChoice onClick={() => setKind(2)} actif={kind === 2}><CenterFlex>FEMMES</CenterFlex></KindChoice>
              </Flex>
              <Button onClick={() => addClimbers(kind)}>Ajouter un{kind === 1 ? ' grimpeur' : 'e grimpeuse'}</Button>
            </Flex>
            <TableLive
              kind = {kind}
              nbrBoulder = {contest.nbrBoulder}
              climbers = {climbers}
              setClimberName = {setClimberName}
              successBoulder = {successBoulder}
            />
          </Flex>
        </MainEvent>
        <Flex fld="column" aic="center" style={{borderLeft: '1px solid lightGrey'}}>
          <Span marginY="20" size="1.8">Résultats Hommes</Span>
          <TableResult kind={1} climbers={climbers[1]}/>
        </Flex>
      </GridContest>
    </>
  )
};

export default ContestLiveSolo;