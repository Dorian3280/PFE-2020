import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Redirect } from 'react-router-dom';

import Background from '../../../components/Background';
import Empty from '../../../components/Empty';
import Display from '../../../components/Display';
import Details from '../../../components/Details';
import MiniBoulder from '../../../components/MiniBoulder';
import ListingFlex from '../../../components/ListingFlex';
import CenterFlex from '../../../components/CenterFlex';
import Flex from '../../../components/Flex';
import Grid from '../../../components/Grid';
import Boulder from '../../../components/Boulder';
import BoulderDetails from '../../../components/BoulderDetails';
import Span from '../../../components/Span';
import InlineBlock from '../../../components/InlineBlock';
import Infos from '../../../components/Infos';
import Image from '../../../components/Image';
import Check from '../../../components/Check';
import Footer from '../../../components/Footer';
import Control from '../../../components/Control';

import Climbers from '/imports/api/climbers/index';

var moment = require('moment');

const Register = (props) => {

    const idClimber = props.match.params.id;
    const { code } = props.match.params;
    
    const [climber, setClimber] = useState({ boulders: [] });
    const [contest, setContest] = useState({});

    const [ detailsOn, setDetailsOn ] = useState(false);
    const [ activeEditIdentity, setActiveEditIdentity ] = useState(false);
    const [ identityType, setIdentityType ] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        const contestPromise = Meteor.callWithPromise('contest.findByCode', code);
        const climberPromise = Meteor.callWithPromise('climber.findById', idClimber);

        Promise.all([climberPromise, contestPromise])
            .then(([climberResponse, contestResponse]) => {
                setClimber(climberResponse);
                setContest(contestResponse);
            })
            .catch((errorResponse) => {
                setError(errorResponse.message)
            });

    }, []);

    const [readyTrackerClimber, trackerClimber] = useTracker(() => {
        const publication = Meteor.subscribe('climbers.findOne', idClimber);
    
        return [
          publication.ready(),
          Climbers.findOne()
        ];
      }, [Climbers, idClimber]);
    
    useEffect(() => {
          if (readyTrackerClimber && trackerClimber !== undefined) {
              setClimber(trackerClimber)
            }
      }, [trackerClimber, readyTrackerClimber]);

    const successBoulder = useCallback((event) => {

        if (moment().toDate() < contest.startAt) {
            console.log('Le contest n\'a pas commencé');
            return false
        }

        const idBoulder = parseInt(event.currentTarget.attributes.id.value);
        const push = !climber.boulders.includes(idBoulder);
        
        Meteor.call('climber.updateBouldersOfClimber', idClimber, idBoulder, push)
        Meteor.call('boulders.updateBoulder', {idBoulder, idClimber, methods: contest.methods, kind: climber.kind, push})

    }, [climber, idClimber, contest]);

    const updateIdentity = useCallback((value) => {
        Meteor.call('climber.updateName', idClimber, identityType, value)
    }, [idClimber, identityType]);

    const errorRoute = useMemo(() => {
        if (error !== "") {
            return <Redirect to={{pathname: `/error`, state: {"error": error} }} />
        } else {
            return ''
        }
    },[error, climber]);

    const firstName = useMemo(() => {
        if (identityType === "firstName") {
            return <Control type="text" onChange={updateIdentity} value={climber.firstName}/>
        } else {
            return climber.firstName;
        }
    }, [identityType, climber]);

    const lastName = useMemo(() => {
        if (identityType === "lastName") {
            return <Control type="text" onChange={updateIdentity} value={climber.lastName}/>
        } else {
            return climber.lastName;
        }
    }, [identityType, climber]);

    return (
        <Background>
            {errorRoute}
            <Display onClick={(event) => {if ((event.target.attributes['data-focus'] === undefined) && (event.target.tagName !== 'IMG') && (event.target.tagName !== 'INPUT')) {setActiveEditIdentity(false); setIdentityType("")}}}>
                <div>
                    {Array.from(Array(contest.nbrBoulder).keys()).map((id) => 
                        <Boulder key={id}>
                            <Grid type="columns" size={['50%', '25%', '25%']}>
                                <BoulderDetails>{id+1}</BoulderDetails>
                                <BoulderDetails><Image height="40" width="40" src={`../../../../images/icons/localisation.png`}/></BoulderDetails>
                                <BoulderDetails id={id} data-success={climber.boulders.includes(id)} onClick={successBoulder}><Check>{climber.boulders.includes(id) ? '✔' : ''}</Check></BoulderDetails>
                            </Grid>
                        </Boulder>)}
                    <Empty height="10vh"/>
                </div>
                <Details hidden={!detailsOn}>
                    <Grid type="rows" size={['10%', '45%', '20%', '20%']}>
                        <Flex jcc="center" aic="center" data-identity>
                            <Span size="1.8" paddingX="5" marginX="2" data-focus={activeEditIdentity} onClick={() => { if (activeEditIdentity) setIdentityType("firstName")}}>{firstName}</Span>
                            <Span size="1.8" paddingX="5" marginX="2" data-focus={activeEditIdentity} onClick={() => { if (activeEditIdentity) setIdentityType("lastName")}}>{lastName}</Span>
                            <Image onClick={() => {if (identityType === "") setActiveEditIdentity(!activeEditIdentity)}} height="30" width="30" src={`../../../images/icons/edit.png`} style={{ marginLeft: "20px" }}/>
                        </Flex>
                        <Flex jcc="center" aic="center">
                            <ListingFlex>
                                {Array.from(Array(contest.nbrBoulder).keys()).map((id) =>
                                    <MiniBoulder key={id} data-success={climber.boulders.includes(id)}><CenterFlex>{id+1}</CenterFlex></MiniBoulder>)}
                            </ListingFlex>
                        </Flex>
                        <Flex fld="column" jcc="center" aic="center">
                            <Span size="1.8">Nombre de blocs <Check>&#10004;</Check></Span>
                            <InlineBlock>{(Object.keys(climber).length !== 0) ? climber.boulders.length : 0}</InlineBlock>
                        </Flex>
                        <Flex fld="column" jcc="center" aic="center">
                            <Span size="1.8">Nombre de points</Span>
                            <InlineBlock>{climber.points}</InlineBlock>
                        </Flex>
                    </Grid>
                </Details>
            </Display>
            <Footer>
                <Grid type="columns" size={['20%', '1fr']}>
                    <Infos>?</Infos>
                    <Infos onClick={() => setDetailsOn(!detailsOn)}>Voir les détails</Infos>
                </Grid>
            </Footer>
        </Background>
    )
}

export default Register;