import styled, { keyframes, css } from 'styled-components';

const BackgroundOpacity = styled.div`
    width: 130px;
    height: 60px;
    margin: 20px 0;
    border: 1px solid #616161;
    cursor: pointer;
    background-color: ${({actif}) => actif ? '#616161' : 'none'};
    box-shadow:${({actif}) => actif ? '0px 0px 0px 2px #616161' : 'none'};
    border-radius:${({actif}) => actif ? '3px' : 'none'};
    transition: 0.15s;
    ${({actif}) => actif ? css`
        animation-name: ${activeAnimation};
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    ` : ''}
`;

const activeAnimation = keyframes`
    0% { background-color:#616161; border: 1px solid #616161; border-radius: 0px 0px 0px 2px #616161;}
    100% { background-color: #838383; border: 1px solid #838383; border-radius: 0px 0px 0px 2px #838383;}
`;

export default BackgroundOpacity;