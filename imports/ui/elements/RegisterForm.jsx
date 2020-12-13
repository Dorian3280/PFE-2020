import React from 'react';
import styled from 'styled-components';

const RegisterForm = ({className, ...props}) => <form className={className} {...props}></form>

const RegisterFormStyled = styled(RegisterForm)`
     width: 400px;
     height: 450px;
     position: absolute;
     top: 20%;
     left: calc(50% - 200px);
     background: rgb(0, 0, 0, 0.65);
     display: flex;
     flex-direction: column;
    font-size: 1.5rem;
`;

export default RegisterFormStyled;