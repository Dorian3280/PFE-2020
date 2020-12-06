import React from 'react';
import styled from 'styled-components';

const CustomizeButton = ({ className, children, ...props }) => <button {...props} className={className}>{children}</button>

const StyledButton = styled(CustomizeButton)`
    margin: 20px 0;
    width: 350px;
    height: 70px;
    transition: 0.25s;
    border: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    background-color: #F4820f;

    &:hover {
        background-color: #b45a00;
    }
`

export default StyledButton;