import React, { useEffect, useState } from "react";

import Details from '../../../../elements/Details';
import Span from '../../../../elements/Span';
import InlineBlock from '../../../../elements/InlineBlock';
import MiniBoulder from '../../../../elements/MiniBoulder';
import ListingFlex from '../../../../elements/ListingFlex';
import CenterFlex from '../../../../elements/CenterFlex';
import Flex from '../../../../elements/Flex';
import Grid from '../../../../elements/Grid';
import Image from '../../../../elements/Image';
import ListBoulderButton from '../../../../elements/ListBoulderButton';

var dayjs = require('dayjs');

const DetailsComponent = (props) => {

    const { activeEditIdentity, setActiveEditIdentity, contest, setIdentityType, identityType, firstName, lastName, climber, rightSide } = props;
    const [ points, setPoints ] = useState(0);
    const [ lastRefresh, setLastRefresh ] = useState(dayjs().toDate());
    const [ openBoulderList, setOpenBoulderList ] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(climber.points)
            setLastRefresh(dayjs().toDate())
        }, 300000);
        return () => clearInterval(interval);
      }, [climber]);

    return (
        <Details rightSide={rightSide}>
            <Grid type="rows" size={['15%', '55%', '25%']}>
                <Flex jcc="center" aic="center" data-identity>
                    <Span size="1.8" paddingX="5" marginX="2" data-focus={activeEditIdentity} onClick={() => { if (activeEditIdentity) setIdentityType("firstName")}}>{firstName}</Span>
                    <Span size="1.8" paddingX="5" marginX="2" data-focus={activeEditIdentity} onClick={() => { if (activeEditIdentity) setIdentityType("lastName")}}>{lastName}</Span>
                    <Image onClick={() => {if (identityType === "") setActiveEditIdentity(!activeEditIdentity)}} height="25" width="25" src={`../../../../images/icons/edit.png`} style={{ marginLeft: "20px" }}/>
                </Flex>
                <Flex fld="column" jcc="center" aic="center">
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '10px'}}>
                        <Span size="1.8">Blocs {(Object.keys(climber).length !== 0) ? climber.boulders.length : 0}/{contest.nbrBoulder}</Span>
                        <ListBoulderButton onClick={() => setOpenBoulderList(!openBoulderList)}>
                            <CenterFlex>
                                <Span size="1.1">Liste des blocs {openBoulderList ? '↓' : '↑'}</Span>
                            </CenterFlex>
                        </ListBoulderButton>
                    </div>
                    <Flex width="80%" jcc="center" aic="center">
                        <ListingFlex show={openBoulderList}>
                            {Array.from(Array(contest.nbrBoulder).keys()).map((id) =>
                                <MiniBoulder key={id} data-success={climber.boulders.includes(id)}><CenterFlex>{id+1}</CenterFlex></MiniBoulder>)}
                        </ListingFlex>
                    </Flex>
                </Flex>
                <Flex fld="column" jcc="center" aic="center">
                    <Span size="1.8">Nombre de points</Span>
                    <InlineBlock>{points}</InlineBlock>
                    <Span size="0.9">Dernière actualisation : {dayjs(lastRefresh).format("HH:mm")}</Span>
                </Flex>
            </Grid>
        </Details>
    )
}

export default DetailsComponent;