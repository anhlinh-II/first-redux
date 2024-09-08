import { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddNewModal(props: IProps) {

     const [input, setInput] = useState("");
     const handleClose = () => {props.setShow(false)
          console.log(input)
     };

     return (
          <>
               <Modal show={props.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Add new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <FloatingLabel
                              controlId="floatingInput"
                              label="Email address"
                              className="mb-3"
                         >
                              <Form.Control type="email" placeholder="name@example.com" value={input}
                                   onChange={e => setInput(e.target.value)}/>
                         </FloatingLabel>
                         <FloatingLabel controlId="floatingName" label="Name">
                              <Form.Control type="name" placeholder="ex: thuyvan" />
                         </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={handleClose}>
                              Save Changes
                         </Button>
                    </Modal.Footer>
               </Modal >
          </>
     );
}

export default AddNewModal;