import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchListBlogs } from "../redux/blog/blog.slide";
import { useEffect, useState } from "react";
import BlogUpdateModal from "./modal/blog.update.modal";
import BlogDeleteModal from "./modal/blog.delete.modal";

interface IBlog {
     id: number | null;
     title: string;
     author: string;
     content: string;
}

interface IBlogDeleteData {
     id: number | null;
     title: string;
}

const BlogsTable = () => {

     const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
     const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
     const [blogUpdateData, setBlogUpdateData] = useState<IBlog>({
          id: null,
          title: "",
          author: "",
          content: ""
     });
     const [blogDeleteData, setBlogDeleteData] = useState<IBlogDeleteData>({
          id: null,
          title: ""
     })

     const dispatch = useAppDispatch();
     const blogs = useAppSelector(state => state.blog.listBlogs);

     useEffect(() => {
          dispatch(fetchListBlogs());
     }, []);

     const handleEditBtn = (blog: IBlog) => {
          setBlogUpdateData({
               id: blog.id,
               title: blog.title,
               author: blog.author,
               content: blog.content
          })
          setIsOpenEditModal(true);
     }

     const handleDeleteBtn = (blog : IBlog) => {
          setBlogDeleteData({
               id: blog.id,
               title: blog.title
          })
          setIsOpenDeleteModal(true);
     }

     return (
          <>
               <Table striped bordered hover>
                    <thead>
                         <tr>
                              <th>Id</th>
                              <th>Title</th>
                              <th>Author</th>
                              <th>Content</th>
                              <th>Actions</th>
                         </tr>
                    </thead>
                    <tbody>
                         {blogs?.map(blog => {
                              return (
                                   <tr key={`key-is-${blog.id}`}>
                                        <td>{blog.id}</td>
                                        <td>{blog.title}</td>
                                        <td>{blog.author}</td>
                                        <td>{blog.content}</td>
                                        <td className="ps-3 pe-3">
                                             <Button variant='warning' className='mb-3 mt-3 ps-4 pe-4' onClick={() => handleEditBtn(blog)}>Edit</Button>
                                             <Button variant='danger' className="pe-3" onClick={() => handleDeleteBtn(blog)}>Delete</Button>
                                        </td>
                                   </tr>
                              )
                         })}
                    </tbody>
               </Table>
               <BlogUpdateModal
                    show={isOpenEditModal}
                    setShow={setIsOpenEditModal}
                    blogData={blogUpdateData}
               />
               <BlogDeleteModal 
                    show={isOpenDeleteModal}
                    setShow={setIsOpenDeleteModal}
                    blogDeleteData={blogDeleteData}
               />
          </>
     )
}

export default BlogsTable;