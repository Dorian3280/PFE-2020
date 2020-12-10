import { Accounts } from 'meteor/accounts-base';

import React, { useCallback, useState } from 'react';

import Background from '../elements/Background';
import RegisterForm from '../elements/RegisterForm';
import RegisterChoice from '../elements/RegisterChoice';
import ControlContainer from '../elements/ControlContainer';
import Flex from '../elements/Flex';
import Control from '../elements/Control';
import Image from '../elements/Image';
import Button from '../elements/Button';
import CenterFlex from '../elements/CenterFlex';
import Grid from '../elements/Grid';
import Span from '../elements/Span';

const Register = ( {history} ) => {

    const [error, setError] = useState("");
    const [signIn, setSignIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        if (signIn) {
            Meteor.loginWithPassword({ username }, password, (error) => {
                if (error) {
                    setError(Meteor.translateToFrench(error.reason))
                } else {
                    history.push('/accueil');
                }
            });
        } else {
            if (password === confirmPwd) {
                Accounts.createUser({username, password}, (error) => {
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
    }, [username, password, confirmPwd, signIn, error]);

    const handleChangeUsername = useCallback((value) => setUsername(value), [username]);
    const handleChangePassword = useCallback((value) => setPassword(value), [password]);
    const handleChangeConfirmPassword = useCallback((value) => setConfirmPwd(value), [confirmPwd]);

    return (
        <Background page="register">
            <RegisterForm onSubmit={handleSubmit}>
                <Flex contain="true" fld="row"> 
                    <RegisterChoice onClick={() => {setSignIn(true); setError("")}} actif={signIn}><CenterFlex>CONNEXION</CenterFlex></RegisterChoice>
                    <RegisterChoice onClick={() => {setSignIn(false); setError("")}} actif={!signIn}><CenterFlex>INSCRIPTION</CenterFlex></RegisterChoice>
                </Flex>
                <Flex grow="1" fld="column" jcc="center" aic="center">
                    <ControlContainer>
                        <Grid type="columns" size={['80px', '1fr']}>
                            <Image height="50" width="50" src={`../../../images/icons/username.png`}/>
                            <Control onChange={handleChangeUsername} dataType="text" value={username} placeholder="Nom d'utilisateur"/>
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