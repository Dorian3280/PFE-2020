import React from 'react';

import { Modal } from 'rsuite';
import { Button } from 'rsuite';

const ModalComponent = (props) => {

    const { showModal, handleChange, handleKeep } = props
    return (
        <div className="modal-container">
            <Modal backdrop="static" show={showModal} size="xs">
            <Modal.Body>
            Une personne est déjà prénommée ainsi, que souhaitez-vous faire ?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleChange} block appearance="primary">Changer votre nom ou/et votre prénom</Button>
                <Button onClick={handleKeep} block appearance="primary">Rendre unique votre identité avec un numéro</Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
};

export default ModalComponent;