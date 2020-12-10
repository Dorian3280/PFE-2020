import React from 'react';
import styled from 'styled-components';

const CustomizeButton = ({ className, children, ...props }) => <button {...props} className={className}>{children}</button>

const StyledButton = styled(CustomizeButton)`
    position: absolute;
    bottom: 50px;
    right: 100px;
    margin: 20px;
    width: 250px;
    height: 60px;
    background: rgb(255, 0, 0);
    border-radius: 5px;
    transition: 0.25s;
    border: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 1.4rem;
    &:hover {
        background: rgb(190, 0, 0);
    }
`

export default StyledButton;