import styled from 'styled-components';

const OptionsContainer = styled.div`
    position: fixed;
    z-index: 4;
    width: 40%;
    bottom: ${({active}) => active ? '0' : '-238'}px;
    left: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.25s;

    ${({active}) => !active ? `&:hover {
        bottom: -200px;
    } ` : ''};
`;

export default OptionsContainer;