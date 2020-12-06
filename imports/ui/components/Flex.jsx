import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    width: ${({width, contain}) => contain ? 'none' : width ? `${width}` : '100%'};
    height: ${({height, contain}) => contain ? 'none' : height ? `${height}` : '100%'};
    flex-direction: ${({fld}) => fld};
    justify-content: ${({jcc}) => jcc};
    align-items: ${({aic}) => aic};
    flex-grow: ${({grow}) => grow ? grow : 'none'};
    row-gap: ${({rGap}) => rGap ? `${rGap}px` : '0'};
    column-gap: ${({cGap}) => cGap ? `${cGap}px` : '0'};
`

export default Flex;