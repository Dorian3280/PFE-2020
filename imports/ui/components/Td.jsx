import styled from 'styled-components';

const Td = styled.td`
    min-width: ${({width}) => width ? width : '40'}px;
    border: 1px solid #ffffff;
    padding: 5px;
    text-align: center;
    background: ${(props) => props['data-success'] ? 'green' : 'none'};
`;

export default Td;