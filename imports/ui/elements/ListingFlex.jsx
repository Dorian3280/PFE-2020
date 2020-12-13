import styled from 'styled-components';

const ListingFlex = styled.div`
    display: ${({show}) => show ? 'flex' : 'none'};
    flex-wrap: wrap;
    justify-content: center;
`;

export default ListingFlex;