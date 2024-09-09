import { Button, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './users.table';
import { useState } from 'react';
import UserCreateModal from './modal/user.create.modal';

function TabsContent() {
     const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

     return (

          <Container>
               <Tabs
                    defaultActiveKey="user"
                    id="uncontrolled-tab-example"
                    className="mb-3 mt-3"
               >
                    <Tab eventKey="user" title="Users">
                         <div className='d-flex justify-content-between'>
                              <h2> Table User</h2>
                              <Button
                                   variant='primary'
                                   className='mb-3'
                                   onClick={() => {setIsOpenCreateModal(!isOpenCreateModal)
                                        console.log(isOpenCreateModal)
                                   }}
                              >
                                   Add new
                              </Button>
                         </div>
                         <UsersTable />
                    </Tab>
                    <Tab eventKey="blog" title="Blogs">
                         Tab content for blogs
                    </Tab>
               </Tabs>
               <UserCreateModal
                    isOpenCreateModal={isOpenCreateModal}
                    setIsOpenCreateModal={setIsOpenCreateModal}
               />
          </Container>
     );
}

export default TabsContent;