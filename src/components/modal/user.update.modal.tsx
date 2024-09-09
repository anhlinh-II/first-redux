import { useEffect, useId, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { resetUpdate, updateUser } from '../../redux/user/user.slide';
import { toast } from 'react-toastify';

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     userId: number | null;
     userEmail: string
     userName: string
}

function UserUpdateModal(props: IProps) {

     const { show, setShow, userId, userEmail, userName } = props;

     const [email, setEmail] = useState(userEmail);
     const [name, setName] = useState(userName);
     const [id, setId] = useState<number | null>(userId);

     const dispatch = useAppDispatch();
     const isUpdateSuccess = useAppSelector(state => state.user.isUpdateSuccess)

     const handleClose = () => {
          setShow(false)
     };

     useEffect(() => {
          if (isUpdateSuccess === true) {
               setShow(false);
               toast('🦄 Wow so easy! Update User Successfully!')
               // refresh redux
               dispatch(resetUpdate());
          }
     }, [isUpdateSuccess])

     useEffect(() => {
          setEmail(userEmail);
          setName(userName);
          setId(userId)
     }, [userEmail, userName, userId]);

     const handleSubmit = () => {
          if (!email)
               return;

          if (!name) {
               return;
          }
          dispatch(updateUser({ email, name, id }))
          console.log({ email, name, id })
     }

     return (
          <>
               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Update user</Modal.Title>
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
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={handleSubmit}>
                              Save Changes
                         </Button>
                    </Modal.Footer>
               </Modal >
          </>
     );
}

export default UserUpdateModal;
