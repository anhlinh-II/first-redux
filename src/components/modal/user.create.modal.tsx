import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewUser, resetCreate } from "../../redux/user/user.slide";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

interface IProps {
     isOpenCreateModal: boolean;
     setIsOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserCreateModal = (props: IProps) => {
     const { isOpenCreateModal, setIsOpenCreateModal } = props;
     const dispatch = useAppDispatch();

     const [email, setEmail] = useState<string>("");
     const [name, setName] = useState<string>("");
 
     const isCreateSuccess = useAppSelector(state => state.user.isCreateSuccess)

     useEffect(() => {
          if (isCreateSuccess === true) {
               setIsOpenCreateModal(false);
               toast('🦄 Wow so easy! Create User Successfully!')
               setEmail("")
               setName("")
               // refresh redux
               dispatch(resetCreate());
          }
     }, [isCreateSuccess])

     const handleSubmit = () => {
          if (!email)
               return;

          if (!name) {
               return;
          }
          dispatch(createNewUser({ email, name }))
     }

     console.log("check create >> ", { email, name })


     return (
          <>
               <Modal show={isOpenCreateModal} onHide={() => setIsOpenCreateModal(!isOpenCreateModal)}>
                    <Modal.Header closeButton>
                         <Modal.Title>Add new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <FloatingLabel
                              controlId="floatingInput"
                              label="Email address"
                              className="mb-3"
                         >
                              <Form.Control type="email" placeholder="name@example.com" value={email}
                                   onChange={e => setEmail(e.target.value)} />
                         </FloatingLabel>
                         <FloatingLabel controlId="floatingName" label="Name">
                              <Form.Control type="name" placeholder="ex: thuyvan" value={name} onChange={e => setName(e.target.value)} />
                         </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => setIsOpenCreateModal(!isOpenCreateModal)}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={() => handleSubmit()}>
                              Save Changes
                         </Button>
                    </Modal.Footer>
               </Modal >
          </>
     )
}



export default UserCreateModal;