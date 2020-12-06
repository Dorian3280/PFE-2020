import styled from 'styled-components';

const Background = styled.div`
    position: fixed;
    z-index: 1;
    height: 100%;
    width: 100%;
    ${({page}) => page ? `background-image: url('../../../images/backgrounds/${page}.jpg');` : 'background: #404040;'}
    background-size: cover;
    background-position: center center;
`;

export default Background;