import React from 'react';
import styled from 'styled-components';
import colors from '/imports/utils/colors';

const CustomizeButton = ({ className, children, ...props }) => <button {...props} className={className}>{children}</button>

const StyledButton = styled(CustomizeButton)`
    margin: 20px;
    width: 600px;
    height: 200px;
    background: #F4820F;
    border-radius: 10px;
    transition: 0.25s;
    border: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 3rem;
    &:hover {
        background: #b45a00;
    }
`

export default StyledButton;