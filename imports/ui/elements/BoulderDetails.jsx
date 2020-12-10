import styled from 'styled-components';

const BoulderDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;

    &:not(:first-child) {
        border-left: 2px solid black;
    }
`;

export default BoulderDetails;