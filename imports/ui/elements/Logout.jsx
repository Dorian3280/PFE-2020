import React from 'react';
import styled from 'styled-components';

const CustomizeButton = ({ className, children, ...props }) => <button {...props} className={className}>{children}</button>

const StyledButton = styled(CustomizeButton)`
    position: absolute;
    top: 30px;
    right: 50px;
    padding: 20px;
    background: rgb(255, 0, 0);
    border-radius: 5px;
    transition: 0.25s;
    border: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 1.3rem;
    &:hover {
        background: rgb(190, 0, 0);
    }
`

export default StyledButton;