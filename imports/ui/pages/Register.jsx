import { Accounts } from 'meteor/accounts-base';

import React, { useCallback, useState } from 'react';

import Background from '../components/Background';
import RegisterForm from '../components/RegisterForm';
import RegisterChoice from '../components/RegisterChoice';
import ControlContainer from '../components/ControlContainer';
import Flex from '../components/Flex';
import Control from '../components/Control';
import Image from '../components/Image';
import Button from '../components/Button';
import CenterFlex from '../components/CenterFlex';
import Grid from '../components/Grid';
import Span from '../components/Span';

const Register = ( {history} ) => {

    const [error, setError] = useState("");
    const [signIn, setSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        if (signIn) {
            Meteor.loginWithPassword({ email }, password, (error) => {
                if (error) {
                    setError(Meteor.translateToFrench(error.reason))
                } else {
                    history.push('/accueil');
                }
            });
        } else {
            if (password === confirmPwd) {
                Accounts.createUser({email, password}, (error) => {
                    if (error) {
                        setError(Meteor.translateToFrench(error.reason))
                    } else {
                        history.push('/accueil');
                    }
                });
            } else {
                setError("Les mots de passe ne correspondent pas")
            }
        }
    }, [email, password, confirmPwd, signIn]);

    const handleChangeEmail = useCallback((value) => setEmail(value), [email]);
    const handleChangePassword = useCallback((value) => setPassword(value), [password]);
    const handleChangeConfirmPassword = useCallback((value) => setConfirmPwd(value), [confirmPwd]);

    return (
        <Background page="register">
            <RegisterForm onSubmit={handleSubmit}>
                <Flex contain="true" fld="row"> 
                    <RegisterChoice onClick={() => setSignIn(true)} actif={signIn}><CenterFlex>CONNEXION</CenterFlex></RegisterChoice>
                    <RegisterChoice onClick={() => setSignIn(false)} actif={!signIn}><CenterFlex>INSCRIPTION</CenterFlex></RegisterChoice>
                </Flex>
                <Flex grow="1" fld="column" jcc="center" aic="center">
                    <ControlContainer>
                        <Grid type="columns" size={['80px', '1fr']}>
                            <Image height="50" width="50" src={`../../../images/icons/email.png`}/>
                            <Control onChange={handleChangeEmail} dataType="text" value={email} placeholder="Email"/>
                        </Grid>
                    </ControlContainer>
                    <ControlContainer>
                        <Grid type="columns" size={['80px', '1fr']}>
                            <Image height="50" width="50" src={`../../../images/icons/password.png`}/>
                            <Control onChange={handleChangePassword} dataType="password" value={password} placeholder="Mot de passe"/>
                        </Grid>
                    </ControlContainer>
                    {!signIn ?<ControlContainer>
                        <Grid type="columns" size={['80px', '1fr']}>
                            <Image height="50" width="50" src={`../../../images/icons/password.png`}/>
                            <Control onChange={handleChangeConfirmPassword} dataType="password" value={confirmPwd} placeholder="Confirmation"/>
                        </Grid>
                    </ControlContainer> : ''}
                    <Span size="1" color="red">{error}</Span>
                    <Button type='submit'>{signIn ? 'LOG IN' : 'SIGN UP'}</Button>
                </Flex>
            </RegisterForm>
        </Background>
    )
}

export default Register;