import styled from 'styled-components';

const Details = styled.div`
    height: 90vh;
    width: 100vw;
    position: fixed;
    top: 0;
    transform: ${({hidden}) => hidden ? 'translateX(100%)' : 'translateX(0)'};
    transition: 1s;
    background: #404040;
`

export default Details;