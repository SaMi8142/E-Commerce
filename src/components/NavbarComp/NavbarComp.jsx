import React, { useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Menu, Dropdown } from 'antd';
import { UserOutlined, ArrowRightOutlined, CustomerServiceFilled } from '@ant-design/icons';
import Cart from './Cart/Cart'
import { logout } from '../../actions/auth'

import { useStateContext, useDispatchContext } from '../../GlobalStateProvider'



function NavbarComp() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useStateContext()
    const { setUser } = useDispatchContext()
    // const home = useRef(null); const shop = useRef(null); const admin = useRef(null)
    // const signup = useRef(null); const login = useRef(null)

    const isAdmin = localStorage.getItem("auth") && JSON.parse(localStorage.getItem("auth")).user.email === 'iamanadmin@gmail.com'

    // useEffect(() => {
    //     if (home) home.current.id = ''
    //     if (shop) shop.current.id = ''
    //     if (isAdmin) admin.current.id = ''
    //     if (!user?.name) signup.current.id = ''
    //     if (!user?.name) login.current.id = ''

    //     if (location.pathname === '/') home.current.id = 'selected-link'
    //     if (location.pathname === '/shop') shop.current.id = 'selected-link'
    //     if (location.pathname === '/admin/products') admin.current.id = 'selected-link'
    //     if (location.pathname === '/signup') signup.current.id = 'selected-link'
    //     if (location.pathname === '/login') login.current.id = 'selected-link'
    // }, [location])

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link className="fix-antDproblem" to="/orders" ><CustomerServiceFilled className='icon-user' style={{ padding: '0' }} /> Orders</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3"><Link className="fix-antDproblem" onClick={handleLogout} to="/logout"> <ArrowRightOutlined className='icon-user' /> Logout </Link></Menu.Item>
        </Menu>
    );

    function handleLogout(e) {
        console.log('logout')
        logout()
            .then(data => {
                navigate('/login', { replace: true })
                setUser({})
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    return (
        <>
            <Navbar fixed="top" collapseOnSelect className="nav-comp" expand="lg" variant="dark">
                <Container>
                    <Link id="brand" className="nav-links" to="/"><span className="len">LEN</span>DAILY</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="links nav-links nav-toggle home" to="/">Home</Link>
                            <Link className="links nav-links nav-toggle shop" to="/shop">Shop</Link>
                            {isAdmin && <Link className="links nav-links nav-toggle products" to="/admin/products">Products</Link>}
                        </Nav>
                        <Nav>
                            {localStorage.getItem("auth") ?
                                (<Dropdown className="links nav-links" overlay={menu}>
                                    <span className="links nav-links" >
                                        <UserOutlined id="user" />
                                        <span id="username">{user && user.name}</span>
                                    </span>
                                </Dropdown>) :
                                (<>
                                    <Link className="links nav-links" to="/signup">Sign Up</Link>
                                    <Link className="links nav-links" to="/login">Login</Link>
                                </>)
                            }
                            <div className="nav-links" id="cart"><Cart /></div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NavbarComp