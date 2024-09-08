import { Button, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './users.table';
import { useState } from 'react';
import AddNewModal from './modal/addNewModal';

function TabsContent() {

     const [showAddNew, setShowAddNew] = useState<boolean>(false);

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
                                   onClick={() => setShowAddNew(!showAddNew)}
                              >
                                   Add new
                              </Button>
                         </div>
                         <UsersTable />
                    </Tab>
                    <Tab eventKey="blog" title="Blogs">
                         Tab content for profile
                    </Tab>
               </Tabs>
               <AddNewModal
                    show={showAddNew}
                    setShow={setShowAddNew}
               />
          </Container>
     );
}

export default TabsContent;