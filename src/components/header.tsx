import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeMode } from '../redux/app/app.slide';

function Header() {

     const mode = useAppSelector(state => state.app.mode) 
     const dispatch = useAppDispatch();

     useEffect(() => {
          const body = document.querySelector("body");
          if(body) body.setAttribute('data-bs-theme', mode)
     }, [mode])

     return (
          <Navbar className="bg-body-tertiary">
               <Container>
                    <Navbar.Brand href="#home">HoiThuyVan Redux</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                         <Form.Check
                              value={mode}
                              onChange={(e) => dispatch(changeMode(e.target.value === "light" ? "dark" : "light"))}
                              type="switch"
                              id="custom-switch"
                              label={
                                   mode === "light"
                                        ? <Navbar.Text>Light Mode</Navbar.Text>
                                        : <Navbar.Text>Dark Mode</Navbar.Text>
                              }
                         />
                    </Navbar.Collapse>
               </Container>
          </Navbar>
     );
}

export default Header;