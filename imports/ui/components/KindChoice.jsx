import styled from 'styled-components';

const BackgroundOpacity = styled.div`
    width: 130px;
    height: 60px;
    margin: 20px 0;
    border: 1px solid grey;
    cursor: pointer;
    background-color: ${({actif}) => actif ? '#616161' : 'none'};
`;

export default BackgroundOpacity;