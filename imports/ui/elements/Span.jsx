import styled from 'styled-components';

const Span = styled.span`
    text-align: ${({align}) => align ? align : 'center'};
    font-size: ${({size}) => size}rem;
    color: ${({color}) => color ? color : 'inherit'};
    margin: ${({marginY}) => marginY ? `${marginY}px` : '0'} ${({marginX}) => marginX ? `${marginX}px` : '0'};
    padding: ${({paddingY}) => paddingY ? `${paddingY}px` : '0'} ${({paddingX}) => paddingX ? `${paddingX}px` : '0'};
    border: ${(props) => props['data-focus'] ? '2px solid red' : ''};
`;

export default Span;
