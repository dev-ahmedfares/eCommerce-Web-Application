import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import styles from "./styles.module.css";
import { Link, NavLink } from "react-router-dom";
import HeadersCounter from "./HeaderLeftBar/HeaderLeftBar";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
import { authLogout } from "@store/auth/authSlice";
import User from "@assets/svg/user.svg?react";

const { headerContainer, headerLogo, navbar, menu } = styles;

export default function Header() {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("productIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <Container fluid={"md"}>
      <header className={headerContainer}>
        <h1 className={headerLogo}>
          <Link to={"/"}>DEPOT</Link>
        </h1>

        <Navbar expand="lg" className={navbar}>
          <Navbar.Toggle
            onClick={handleShow}
            aria-controls="basic-navbar-nav"
            className="ms-auto m-lg-0"
          />
          {show === false && (
            <Navbar.Collapse id="basic-navbar-nav" className="d-none">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">
                  HOME
                </Nav.Link>
                <Nav.Link as={NavLink} to="products">
                  PRODUCTS
                </Nav.Link>
                <Nav.Link as={NavLink} to="about-us">
                  ABOUT US
                </Nav.Link>
              </Nav>

              <div className="d-flex gap-3">
                <HeadersCounter />

                {!accessToken ? (
                  <Nav>
                    <Nav.Link as={NavLink} to="login">
                      <div className="d-flex align-items-center gap-2">
                        <User />
                        <span className="d- mt-1">LOGIN</span>
                      </div>
                    </Nav.Link>
                  </Nav>
                ) : (
                  <NavDropdown
                    title={`${user?.firstName} ${user?.lastName}`}
                    id="basic-nav-dropdown"
                    align={"end"}
                    as="div"
                    role="heading"
                    className={menu}
                  >
                    <NavDropdown.Item as={NavLink} to="profile" end>
                      PROFILE
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="profile/orders">
                      MY ORDERS
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="dashboard">
                      DASHBOARD
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to={"/"}
                      onClick={() => dispatch(authLogout())}
                    >
                      LOGOUT
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            </Navbar.Collapse>
          )}

          {/* Offcanvas */}
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            style={{ width: "300px", backgroundColor: "var(--primary)" }}
          >
            <Offcanvas.Header
              closeButton
              style={{
                filter:
                  "invert(100%) sepia(64%) saturate(0%) hue-rotate(359deg) brightness(103%) contrast(103%)",
              }}
            />
            <Offcanvas.Body>
              <ul className="canvas mt-3">
                <Nav>
                  <Nav.Link as={NavLink} to="/">
                    HOME
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="products">
                    PRODUCTS
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="about-us">
                    ABOUT US
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="cart">
                    CART
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="wishlist">
                    WISHLIST
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="profile" end>
                    PROFILE
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="profile/orders">
                    ORDERS
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="dashboard">
                    Dashboard
                  </Nav.Link>
                  {accessToken ? (
                    <Nav.Link
                      as={Link}
                      to={"/"}
                      onClick={() => {
                        setShow(false);
                        dispatch(authLogout());
                      }}
                    >
                      LOGOUT
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to={"/login"}>
                      LOGIN
                    </Nav.Link>
                  )}
                </Nav>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar>
      </header>
    </Container>
  );
}
