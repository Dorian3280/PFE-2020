import styled from 'styled-components';

const Details = styled.div`
    height: 90vh;
    width: 100vw;
    position: fixed;
    top: 0;
    right: ${({rightSide}) => rightSide ? '-100%' : '0'};
    transition: 0.5s;
    background: #404040;
`

export default Details;