import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/user/user.slide';
import { Button } from 'react-bootstrap';
import DeleteUserModal from './modal/deleteModal';
import UpdateUserModal from './modal/updateUserModal';

interface IUser {
     id: number;
     name: string;
     email: string;
}

function UsersTable() {

     const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
     const [showEditModal, setShowEditModal] = useState<boolean>(false);
     const [userEmail, setUserEmail] = useState<string>("");
     const [userId, setUserId] = useState<number | null>(null);

     const dispatch = useAppDispatch();
     const users = useAppSelector(state => state.user.listUsers)

     useEffect(() => {
          dispatch(fetchListUsers(123));
          // toast('🦄 Wow so easy!')
     }, [])

     const handleDeleteUser = (user: IUser) => {
          setShowDeleteUserModal(true);
          setUserEmail(user.email)
          setUserId(user.id)
     }

     const handleEditUser = (user : IUser) => {
          setShowEditModal(true);
          setUserEmail(user.email)
          setUserId(user.id)
     }

     return (
          <>
               <Table striped bordered hover>
                    <thead>
                         <tr>
                              <th>Id</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Actions</th>
                         </tr>
                    </thead>
                    <tbody>
                         {users?.map(user => {
                              return (
                                   <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                             <Button variant='warning' className='me-3 ms-3' onClick={() => handleEditUser(user)}>Edit</Button>
                                             <Button variant='danger' onClick={() => handleDeleteUser(user)}>Delete</Button>
                                        </td>
                                   </tr>
                              )
                         })}

                    </tbody>
               </Table>
               <DeleteUserModal
                    userId={userId}
                    userEmail={userEmail}
                    show={showDeleteUserModal}
                    setShow={setShowDeleteUserModal}
               />
               <UpdateUserModal
                    show={showEditModal}
                    setShow={setShowEditModal}
                    userId={userId}
                    userEmail={userEmail}
               />
          </>

     );
}

export default UsersTable;