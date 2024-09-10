import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteBlog, resetDelete } from "../../redux/blog/blog.slide";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IProps {
     show: boolean;
     setShow: React.Dispatch<React.SetStateAction<boolean>>;
     blogDeleteData: {
          id: number | null;
          title: string;
     }
}

const BlogDeleteModal = (props: IProps) => {
     const { show, setShow, blogDeleteData } = props;

     const dispatch = useAppDispatch();
     const isDeleteSuccess = useAppSelector(state => state.blog.isDeleteSuccess);

     useEffect(() => {
          if(isDeleteSuccess) {
               toast.success("delete blog successfully!");
               setShow(false);
               dispatch(resetDelete())
          }
     }, [isDeleteSuccess])

     const handleSubmit = () => {
          dispatch(deleteBlog({id: blogDeleteData.id}));
     }

     const deleteNoti = <p>Are you sure to delete the blog with title <strong>{blogDeleteData.title}</strong></p>

     return (
          <>
               <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    backdrop="static"
                    keyboard={false}
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Delete Blog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {deleteNoti}
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => setShow(false)}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={() => handleSubmit()}>Confirm</Button>
                    </Modal.Footer>
               </Modal>
          </>
     )
}

export default BlogDeleteModal;