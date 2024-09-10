import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewBlog, fetchListBlogs } from "../../redux/blog/blog.slide";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
     isOpenCreateBlogsModal: boolean;
     setIsOpenCreateBlogsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogsCreateModal = (props: IProps) => {

     const [title, setTitle] = useState<string>("")
     const [author, setAuthor] = useState<string>("")
     const [content, setContent] = useState<string>("")

     const { isOpenCreateBlogsModal, setIsOpenCreateBlogsModal } = props
     const dispatch = useAppDispatch();
     const isCreateSuccess = useAppSelector(state => state.blog.isCreateSuccess);

     const handleSubmit = () => {
          dispatch(createNewBlog({ title, author, content }));
     }

     useEffect(() => {
          if(isCreateSuccess) {
               setIsOpenCreateBlogsModal(false)
               toast.success("create new blog successfully!");
               
          }
     }, [isCreateSuccess])

     return (
          <>
               <Modal show={isOpenCreateBlogsModal} onHide={() => setIsOpenCreateBlogsModal(false)}>
                    <Modal.Header closeButton>
                         <Modal.Title>Add new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <FloatingLabel
                              controlId="floatingInput"
                              label="Title"
                              className="mb-3"
                         >
                              <Form.Control type="text" placeholder="name@example.com" value={title}
                                   onChange={(e) => setTitle(e.target.value)} />
                         </FloatingLabel>
                         <FloatingLabel
                              controlId="floatingInput"
                              label="Author"
                              className="mb-3"
                         >
                              <Form.Control type="text" placeholder="name@example.com" value={author}
                                   onChange={(e) => setAuthor(e.target.value)} />
                         </FloatingLabel>
                         <FloatingLabel controlId="floatingName" label="Content">
                              <Form.Control type="text" placeholder="ex: thuyvan" value={content} onChange={(e) => setContent(e.target.value)} />
                         </FloatingLabel>

                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary">
                              Close
                         </Button>
                         <Button variant="primary" onClick={() => handleSubmit()}>
                              Save Changes
                         </Button>
                    </Modal.Footer>
               </Modal>
          </>
     )
}

export default BlogsCreateModal;