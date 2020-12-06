import React, { useMemo } from "react";

import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tbody from '../../../components/Tbody';
import Tr from '../../../components/Tr';
import Td from '../../../components/Td';

const TableResult = (props) => {

    const { climbers, kind } = props;

    const listOfClimbers = useMemo(() => {

        // Classer par nombre de points
        climbersList = [...climbers].sort((a, b) => a.points < b.points);

        // Permet de mémoriser le classement du dernier grimpeur pour gérer le classement au cas d'égalité
        ranking = [1, 1];

        return climbersList.map((climber, i) => {
            if ((climbersList[i-1] !== undefined) && (climbersList[i-1].points !== climber.points)) {
                ranking[1] = ranking[0];
            }
            ranking[0]++;
            climber.ranking = ranking[1];

            return <Tr key={`${climber._id}`}>
                        <Td>{climber.ranking}</Td>
                        <Td>{climber.lastName}</Td>
                        <Td>{climber.firstName}</Td>
                        <Td>{climber.points}</Td>
                    </Tr>
        })
    }, [props])

    return (
        <div>
            <Table id={`${kind}-result`}>
                <Thead>
                    <Tr>
                        <Td>Classement</Td>
                        <Td>Nom</Td>
                        <Td>Prenom</Td>
                        <Td>Points</Td>
                    </Tr>
                </Thead>
                <Tbody>{listOfClimbers}</Tbody>
            </Table>
        </div>
    )
}

export default TableResult;