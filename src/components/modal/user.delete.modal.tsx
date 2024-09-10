import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteUser, resetDelete } from '../../redux/user/user.slide';
import { toast } from 'react-toastify';

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     userEmail: string;
     userId: number | null;
}

function UserDeleteModal(props: IProps) {
     const {setShow} = props
     const dispatch = useAppDispatch();
     const isDeleteSuccess = useAppSelector(state => state.user.isDeleteSuccess);

     const handleClose = (id: number | null) => {
          props.setShow(false)
          console.log(id);
     };
     const handleShow = () => props.setShow(true);

     const handleSubmit = () => {
          dispatch(deleteUser({ id: props.userId }))
          if (isDeleteSuccess === true) {
               setShow(false)
               toast('🦄 Wow so easy! Delete User Successfully!')
               dispatch(resetDelete())
          }
          // props.setShow(false)
     }

     // useEffect(() => {
          
     // }, [isDeleteSuccess])

     return (
          <>

               <Modal
                    show={props.show}
                    onHide={() => handleClose(props.userId)}
                    backdrop="static"
                    keyboard={false}
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {`Are you sure to delete user with email ${props.userEmail}`}
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => handleClose(props.userId)}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={() => handleSubmit()}>Understood</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}

export default UserDeleteModal;