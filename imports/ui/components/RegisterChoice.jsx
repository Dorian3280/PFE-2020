import styled from 'styled-components';

const RegisterChoice = styled.div`
     width: 50%;
     height: 100px;
     border-bottom: 1px solid white;
     font-size: 30px;
     cursor: pointer;
     background-color: ${({actif}) => actif ? '#616161' : 'none'};

     &:first-child {
     border-right: 1px solid white;
     }
`;

export default RegisterChoice;