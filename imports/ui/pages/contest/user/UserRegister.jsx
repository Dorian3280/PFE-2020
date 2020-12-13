import { Meteor } from 'meteor/meteor';
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Background from '../../../elements/Background';
import UserInformations from '../../../elements/UserInformations';
import Flex from '../../../elements/Flex';
import Control from '../../../elements/Control';
import Span from '../../../elements/Span';
import CenterFlex from '../../../elements/CenterFlex';
import ModalComponent from './components/ModalComponent';

import { Button } from 'rsuite';
import { Loader } from 'rsuite';

const User = (props) => {
    
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [kind, setKind] = useState(1);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const { url } = props.match;
    const { code } = props.match.params;

    useEffect(() => {
        Meteor.callWithPromise('climber.testId', window.localStorage.getItem('id'))
        .then((res) => {
            if (res) setId(res)
        })
    }, [id])

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (lastName.trim() === "") {
            setError('Veuillez ajouter un nom');
            return false;
        }
        if (firstName.trim() === "") {
            setError('Veuillez ajouter un prénom');
            return false;
        }
        setLoader(true);

        Meteor.callWithPromise('climber.findByIdentity', { firstName, lastName, kind })
            .then((res) => {
                setLoader(false);
                if (res === undefined) {
                    return Meteor.callWithPromise('climber.create', { kind, code, firstName, lastName })
                } else {
                    handleShowModal();
                    throw undefined
                }
            })
            .then((res) => {
                window.localStorage.setItem('id', res);
                setId(res);
            })
            .catch(() => undefined);

    }, [loader, error, firstName, lastName, id, kind]);

    const handleChangeLastName = useCallback((value) => setLastName(value), [lastName]);
    const handleChangeFirstName = useCallback((value) => setFirstName(value), [firstName]);
    const handleChangeKind = useCallback((value) => setKind(value), [kind]);
    const handleChangeEmail = useCallback((value) => setEmail(value), [email]);


    const handleShowModal = useCallback(() => setShowModal(!showModal), [showModal])

    const handleKeep = useCallback(() => {
        setLoader(true);
        Meteor.callWithPromise('climber.create', { kind, code, firstName, lastName })
        .then((res) => {
            window.localStorage.setItem('id', res);
            setId(res);
        })
    }, [loader, id, kind, code, firstName, lastName]);

    const handleChange = useCallback(() => {
        handleShowModal();
        setError("Veuilly changer votre nom ou/et votre prénom");
    }, [showModal, error]);

    const handleLogIn = useCallback(() => {
        handleShowModal();
        setError("Veuilly changer votre nom ou/et votre prénom");
    }, [showModal, error]);

    const redirectMemo = useMemo(() => id ? <Redirect to={`${url}/${id}`} /> : '' , [id]);  
    const loaderMemo = useMemo(() => loader ? <Loader content="Chargement..." speed="normal" /> : '', [loader]);
    
    return (
        <Background>
            {redirectMemo}
            <ModalComponent
                showModal={showModal}
                handleKeep={handleKeep}
                handleChange={handleChange}
                handleLogIn={handleLogIn}
                firstName={firstName}
                lastName={lastName}
            ></ModalComponent>
            <CenterFlex>
                <UserInformations>
                    <Flex fld="column" jcc="space-evenly" aic="center">
                        <Control type="text" onChange={handleChangeLastName} size="lg" value={lastName} placeholder="Nom"/>
                        <Control type="text" onChange={handleChangeFirstName} size="lg" value={firstName} placeholder="Prénom"/>
                        <Control type="select" onChange={handleChangeKind} width="100%" size="lg" value={kind} name="kind"/>
                        <Control type="text" onChange={handleChangeEmail} size="lg" value={email} placeholder="Email*"/>
                        <Span size="0.9">* L'email n'est pas obligatoire</Span>
                        <Span size="1" color="red">{error}</Span>
                        {loaderMemo}
                        <Button block color="orange" size="lg" onClick={handleSubmit}>Accéder à la compétition</Button>
                    </Flex>
                </UserInformations>
            </CenterFlex>
        </Background>
    )
}

export default User;