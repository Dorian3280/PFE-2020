import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    height: ${({height}) => height}px;
    width: ${({width}) => width}px;
    align-self: center;
    justify-self: center;
`;

export default Image;