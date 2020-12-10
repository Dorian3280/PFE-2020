import React from 'react';
import styled from 'styled-components';

const RegisterForm = ({className, ...props}) => <form className={className} {...props}></form>

const RegisterFormStyled = styled(RegisterForm)`
     width: 500px;
     height: 600px;
     position: absolute;
     top: 10%;
     left: 10%;
     background: rgb(0, 0, 0, 0.65);
     display: flex;
     flex-direction: column;
    font-size: 1.5rem;
`;

export default RegisterFormStyled;