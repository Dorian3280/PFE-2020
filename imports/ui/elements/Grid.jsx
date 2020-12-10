import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template: ${({type}) => type === 'columns' ? 'none /' : ''} ${({size}) => size.map((i) => `${i} `)}${({type}) => type === 'rows' ? ' / none' : ''};
    height: 100%;
    transform: ${({detailsOn}) => detailsOn ? 'translateX(-50vw)' : ''};
    transition: 0.25s;
`;

export default Grid;