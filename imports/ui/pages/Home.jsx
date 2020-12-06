import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

import React, { useState, useCallback, useEffect, useMemo } from 'react';

import Background from '../components/Background';
import BackgroundOpacity from '../components/BackgroundOpacity';
import ContestInformation from '../components/ContestInformation';
import Flex from '../components/Flex';
import Form from '../components/Form';
import BigButton from '../components/BigButton';
import Control from '../components/Control';
import Logout from '../components/Logout';
import Chevron from '../components/Chevron';
import Span from '../components/Span';

import { Tooltip, Whisper } from 'rsuite';

var moment = require('moment');

const Home = ( {history} ) => {

    const [error, setError] = useState("");
    const [hostName, setHostName] = useState('');
    const [format, setFormat] = useState(1);
    const [methods, setMethods] = useState(1);
    const [nbrBoulder, setNbrBoulder] = useState(30);
    const [startAt, setStartAt] = useState(moment().hour(18).minute(0).second(0).toDate());
    const [url, setUrl] = useState('');

    // Si il n'est pas connecté
    const userId =  useTracker(() => Meteor.userId(), []);
    useEffect(() => {
        if (!userId) history.push('/')
    }, [userId]);
    
    const logout = useCallback(() => Meteor.logout(), []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        
        /* if (startAt < moment().toDate()) {
            setError("La date choisie est passée")
            return false;
        } */
        if (nbrBoulder > 150 || nbrBoulder < 5) {
            setError("Le nombre de blocs est incohérent")
            return false;
        }
        if (format === 1) {
            fetch("https://www.uuidtools.com/api/generate/v1")
                .then((res) => res.json())
                .then((code) => {
                    const data = {
                        hostName,
                        nbrBoulder,
                        code: code[0],
                        methods,
                        startAt,
                        createdAt: new Date(),
                    }
                    Meteor.call('contest.create', data);
                    Meteor.call('boulders.create', nbrBoulder);
                    setUrl(`contest&id=${code}`);
                });
        } else {
            setError("La création de compétition sous ce format est toujours en cours de développement")
        }
    }, [format, startAt, nbrBoulder, hostName, methods]);

    const handleChangeFormat = useCallback((value) => setFormat(value), [format]);
    const handleChangeNbrBoulder = useCallback((value) => setNbrBoulder(value), [nbrBoulder]);
    const handleChangeHostName = useCallback((value) => setHostName(value), [hostName]);
    const handleChangeStartAt = useCallback((value) => setStartAt(moment(value).toDate()), [startAt]);
    const handleChangeMethods = useCallback((value) => setMethods(value), [methods]);

    const route = useMemo(() => url ? <Redirect to={`/${url}`} /> : '', [url]);

    return (
        <Background page="home">
            {route}
            <BackgroundOpacity>
                <Form onSubmit={handleSubmit}>
                    <Flex fld="row" jcc="space-evenly" aic="center">
                        <ContestInformation>
                            <Flex fld="column" jcc="space-evenly" aic="center">
                                <Control type="text" onChange={handleChangeHostName} width="80%" size="lg" value={hostName} name="hostName" placeholder="Nom de la salle"/>
                                <Control type="select" onChange={handleChangeFormat} width="80%" size="lg" value={format} name="format"/>
                                <Control type="select" onChange={handleChangeMethods} width="80%" size="lg" value={methods} name="methodes"/>
                                <Whisper trigger="active" placement="top" speaker={<Tooltip>Nombres de blocs</Tooltip>}>
                                    <Control type="number" onChange={handleChangeNbrBoulder} width="80%" size="lg" name="nbrBoulder" value={nbrBoulder} min={5} max={150}/>
                                </Whisper>
                                <Whisper trigger="active" placement="top" speaker={<Tooltip>Début de la compétition</Tooltip>}>
                                    <Control type="date" onChange={handleChangeStartAt} value={startAt} format="DD MMM YYYY HH:mm"/>
                                </Whisper>
                                <Span size="1" color="red">{error}</Span>
                            </Flex>
                        </ContestInformation>
                        <Chevron>&gt;</Chevron>
                        <BigButton type='submit'>CREEZ VOTRE PROPRE CONTEST DE BLOC</BigButton>
                    </Flex>
                </Form>
                <Logout onClick={logout}>Déconnexion</Logout>
            </BackgroundOpacity>
        </Background>
    )
};

export default Home;