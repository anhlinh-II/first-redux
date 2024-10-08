import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/user/user.slide';
import UserDeleteModal from './modal/user.delete.modal';
import UserUpdateModal from './modal/user.update.modal';
import { Button } from 'react-bootstrap';

interface IUser {
     id: number;
     name: string;
     email: string;
}

function UsersTable() {

     const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
     const [showEditModal, setShowEditModal] = useState<boolean>(false);
     const [userEmail, setUserEmail] = useState<string>("");
     const [userName, setUserName] = useState<string>("");
     const [userId, setUserId] = useState<number | null>(null);

     const dispatch = useAppDispatch();
     const users = useAppSelector(state => state.user.listUsers)

     useEffect(() => {
          dispatch(fetchListUsers());
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
          setUserName(user.name)
     }

     console.log(users.length);

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
          <UserDeleteModal
               userId={userId}
               userEmail={userEmail}
               show={showDeleteUserModal}
               setShow={setShowDeleteUserModal}
          />
          <UserUpdateModal
               show={showEditModal}
               setShow={setShowEditModal}
               userId={userId}
               userEmail={userEmail}
               userName={userName}
          />
     </>

     );
}

export default UsersTable;