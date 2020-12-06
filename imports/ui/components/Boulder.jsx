import styled from 'styled-components';

const Boulder = styled.div`
    width: 100%;
    height: 60px;

    &:not(:first-child) {
        border-top: 2px solid black;
    }
`;

export default Boulder;