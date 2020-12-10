import React from 'react';

import OptionsContainer from '../../../../elements/OptionsContainer';
import OptionsButton from '../../../../elements/OptionsButton';
import OptionsMenu from '../../../../elements/OptionsMenu';
import OptionsHover from '../../../../elements/OptionsHover';
import Span from '../../../../elements/Span';
import Flex from '../../../../elements/Flex';


import { tablesToExcel } from '/imports/utils/methods';

const Options = (props) => {

  const { setOptionsActive, optionsActive, contest, userLink } = props;

    return (
        <OptionsContainer active={optionsActive}>
        <OptionsButton onClick={() => setOptionsActive(!optionsActive)} active={optionsActive}>
          <Flex jcc="space-evenly" aic="center">
            <Span size="1.8">{optionsActive ? '↓' : `↑`}</Span>
            <Span size="1.8">Options</Span>
            <Span size="1.8">{optionsActive ? '↓' : '↑'}</Span>
          </Flex>
        </OptionsButton>
        <OptionsHover onClick={() => setOptionsActive(!optionsActive)} active={optionsActive}></OptionsHover>
        <OptionsMenu>
          <Flex fld="column" jcc="center" aic="center" rGap="10">
            <Span size="1.3">En solo</Span>
            <Span size="1.3">{contest.nbrBoulder} blocs</Span>
            <Span size="1.3">{contest.hostName}</Span>
          </Flex>
          <Flex fld="column" jcc="center" aic="center" rGap="10">
            <Span size="1.5">Règles du Contest</Span>
            <Span size="1.5"><a target="_blank" href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://live-contest.com/${userLink}`}>Lien QR Code</a></Span>    
            <button id="test-table-xls-button" onClick={() => tablesToExcel(['men-result', 'women-result'], ['men', 'result'], 'myfile.xls')}>Export to Excel</button>
          </Flex>
        </OptionsMenu>
      </OptionsContainer>
    )
};

export default Options;