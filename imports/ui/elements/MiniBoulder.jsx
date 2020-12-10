import styled from 'styled-components';

const MiniBoulder = styled.div`
    height: 40px;
    width: 40px;
    border: 1px solid #000;
    margin: 1px;
    font-size:  1.2rem;
    background: ${(props) => props['data-success'] ? 'green' : 'none'};
`;

export default MiniBoulder;