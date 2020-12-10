import styled from 'styled-components';

const Infos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3rem;

    &:not(:first-child) {
        border-left: 2px solid black;
    }
`;

export default Infos;