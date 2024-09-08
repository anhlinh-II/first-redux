import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     userEmail: string;
     userId: number | null;
}

function DeleteUserModal(props: IProps) {
     //   const [show, setShow] = useState(false);

     const handleClose = (id : number | null) => {props.setShow(false)
          console.log(id);
     };
     const handleShow = () => props.setShow(true);

     return (
          <>
               <Button variant="primary" onClick={handleShow}>
                    Launch static backdrop modal
               </Button>

               <Modal
                    show={props.show}
                    onHide={() => handleClose(props.userId)}
                    backdrop="static"
                    keyboard={false}
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {`Are you sure to delete user with email ${props.userEmail}`}
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => handleClose(props.userId)}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={() => handleClose(props.userId)}>Understood</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}

export default DeleteUserModal;