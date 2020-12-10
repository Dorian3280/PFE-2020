import React, { useMemo } from "react";

import Table from '../../../../elements/Table';
import Thead from '../../../../elements/Thead';
import Tbody from '../../../../elements/Tbody';
import Tr from '../../../../elements/Tr';
import Td from '../../../../elements/Td';
import Input from '../../../../elements/Input';

const TableLive = (props) => {

    const { climbers, kind, nbrBoulder, setClimberName, successBoulder } = props;

    return (
        <div style={{width: '85%', overflowX: 'scroll', marginBottom: '80px'}}>
            <Table>
                <Thead>
                    <Tr>
                        <Td width="120">Nom</Td>
                        <Td width="120">Prenom</Td>
                        <Td width="60">Points</Td>
                        {Array.from(Array(nbrBoulder).keys()).map((id) => <Td key={id}>{kind === 1 ? 'M' : 'W'}{id+1}</Td>)}
                    </Tr>
                </Thead>
                <Tbody>{climbers[kind].map((climber) => 
                    <Tr key={`${climber._id}`} id={climber._id} kind={kind} >
                        <Td width="120"><Input data="lastName" type="text" placeholder="..." onChange={setClimberName} value={climber.lastName}/></Td>
                        <Td width="120"><Input data="firstName" type="text" placeholder="..." onChange={setClimberName} value={climber.firstName}/></Td>
                        <Td width="60">{climber.points}</Td>
                        {Array.from(Array(nbrBoulder).keys()).map((id) => <Td data-success={climber.boulders.includes(id)} key={id} id={id} onClick={successBoulder}></Td>)}
                    </Tr>)}
                </Tbody>
            </Table>
        </div>
    )
};

export default TableLive;