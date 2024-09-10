import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetUpdate, updateBlog } from "../../redux/blog/blog.slide";
import { toast } from "react-toastify";

interface IProps {
     show: boolean,
     setShow: React.Dispatch<React.SetStateAction<boolean>>,
     blogData: {
          id: number | null;
          title: string;
          author: string;
          content: string;
     }
}

const BlogUpdateModal = (props: IProps) => {
     const { show, setShow, blogData } = props;
     const [title, setTitle] = useState<string>("");
     const [author, setAuthor] = useState<string>("");
     const [content, setContent] = useState<string>("");

     const dispatch = useAppDispatch();
     const isUpdateSuccess = useAppSelector(state => state.blog.isUpdateSuccess);

     useEffect(() => {
          setTitle(blogData.title)
          setAuthor(blogData.author)
          setContent(blogData.content)
     }, [blogData.title, blogData.author, blogData.content]);

     useEffect(() => {
          if (isUpdateSuccess) {
               setShow(false);
               toast.success("update blog successfully!");
               dispatch(resetUpdate());
          }
     }, [isUpdateSuccess])

     const handleSubmit = () => {
          dispatch(updateBlog({ id: blogData.id, title, author, content }))
     }

     return (
          <>
               <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                         <Modal.Title>Update Blog</Modal.Title>
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
                              <Form.Control type="name" placeholder="ex: thuyvan" value={content} onChange={(e) => setContent(e.target.value)} />
                         </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => setShow(false)}>
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

export default BlogUpdateModal; 