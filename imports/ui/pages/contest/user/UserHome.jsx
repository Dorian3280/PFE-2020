import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Redirect } from 'react-router-dom';

import Background from '../../../elements/Background';
import Empty from '../../../elements/Empty';
import Display from '../../../elements/Display';
import Grid from '../../../elements/Grid';
import Boulder from '../../../elements/Boulder';
import BoulderDetails from '../../../elements/BoulderDetails';
import Infos from '../../../elements/Infos';
import Image from '../../../elements/Image';
import Check from '../../../elements/Check';
import Footer from '../../../elements/Footer';
import Control from '../../../elements/Control';
import DetailsComponent from './components/DetailsComponent';

import Climbers from '/imports/api/climbers/index';

var dayjs = require('dayjs');

const Register = (props) => {

    const idClimber = props.match.params.id;
    const { code } = props.match.params;

    const [climber, setClimber] = useState({ boulders: [] });
    const [contest, setContest] = useState({});

    const [detailsOn, setDetailsOn] = useState(false);
    const [identityType, setIdentityType] = useState("");
    const [activeEditIdentity, setActiveEditIdentity] = useState(false);

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

        if (dayjs().toDate() < contest.startAt) {
            return false
        }

        const idBoulder = parseInt(event.currentTarget.attributes.id.value);
        const push = !climber.boulders.includes(idBoulder);

        Meteor.call('climber.updateBouldersOfClimber', idClimber, idBoulder, push)
        Meteor.call('boulders.updateBoulder', { idBoulder, idClimber, methods: contest.methods, kind: climber.kind, push })

    }, [climber, idClimber, contest]);

    const updateIdentity = useCallback((value) => {
        Meteor.call('climber.updateName', idClimber, identityType, value)
    }, [idClimber, identityType]);

    const errorRoute = useMemo(() => {
        if (error !== "") {
            return <Redirect to={{ pathname: `/error`, state: { "error": error } }} />
        } else {
            return ''
        }
    }, [error, climber]);

    const firstName = useMemo(() => {
        if (identityType === "firstName") {
            return <Control type="text" onChange={updateIdentity} value={climber.firstName} />
        } else {
            return climber.firstName;
        }
    }, [identityType, climber]);

    const lastName = useMemo(() => {
        if (identityType === "lastName") {
            return <Control type="text" onChange={updateIdentity} value={climber.lastName} />
        } else {
            return climber.lastName;
        }
    }, [identityType, climber]);

    return (
        <Background onClick={(event) => {if ((event.target.attributes['data-focus'] === undefined) && (event.target.tagName !== 'IMG') && (event.target.tagName !== 'INPUT')) {setActiveEditIdentity(false); setIdentityType("")}}}>
            {errorRoute}
            <Display>
                {Array.from(Array(contest.nbrBoulder).keys()).map((id) => 
                    <Boulder key={id}>
                        <Grid type="columns" size={['50%', '25%', '25%']}>
                            <BoulderDetails>{id+1}</BoulderDetails>
                            <BoulderDetails><Image height="40" width="40" src={`../../../../images/icons/localisation.png`}/></BoulderDetails>
                            <BoulderDetails id={id} data-success={climber.boulders.includes(id)} onClick={successBoulder}><Check>{climber.boulders.includes(id) ? '✔' : ''}</Check></BoulderDetails>
                        </Grid>
                    </Boulder>)}
                <Empty height="10vh"/>
            </Display>
            <DetailsComponent
                rightSide={!detailsOn}
                contest={contest}
                climber={climber}
                setIdentityType={setIdentityType}
                identityType={identityType}
                firstName={firstName}
                lastName={lastName}
                activeEditIdentity={activeEditIdentity}
                setActiveEditIdentity={setActiveEditIdentity}
            ></DetailsComponent>
            <Footer>
                <Grid type="columns" size={['20%', '1fr']}>
                    <Infos>?</Infos>
                    <Infos onClick={() => setDetailsOn(!detailsOn)}>{detailsOn ? 'Retour' : 'Voir les détails'}</Infos>
                </Grid>
            </Footer>
        </Background >
    )
}

export default Register;
