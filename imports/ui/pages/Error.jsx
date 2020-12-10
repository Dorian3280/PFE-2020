import React from 'react';

import Background from '../elements/Background';
import CenterFlex from '../elements/CenterFlex';
import Span from '../elements/Span';

const Error = (props) => {

    return (
        <Background>
            <CenterFlex>
                <Span size="2.5">{props.location.state !== undefined ? props.location.state.error : 'ERROR 404'}</Span>
            </CenterFlex>
        </Background>
    )
};

export default Error;