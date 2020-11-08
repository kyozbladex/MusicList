import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => <NavLink tag={Link} to="/account/login">Log In</NavLink>;
// const renderGreeting = name => <span>Welcome, {name}</span>;

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logOutClick = this.logOutClick.bind(this);
        this.renderGreeting = this.renderGreeting.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          isOpen: false,
        };
      }

      logOutClick(e) {
        e.preventDefault();
        const { logUserOutFunction } = this.props;
        logUserOutFunction();
      }

      toggleNavbar() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
      }
      
      renderGreeting(name) {
        return (
          <span>
            Welcome, {name} | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
          </span>
        );
      }

      render() {
        const { isLoggedIn, firstName } = this.props.authentication;
        return (
          <header className="wrapper">
            <Navbar color="faded" light toggleable>
              <NavbarToggler right onClick={this.toggleNavbar} />
              <NavbarBrand tag={Link} to="/">MusicList</NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                  { isLoggedIn ? this.renderGreeting(firstName) : renderLogin() }
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </header>
        );
      }
}

/* export default function Header(props) {
  const { username } = props;
  return (
    <header>
      <h1>MusicList</h1>
      <div className="user-menu">
        <h2>Welcome { username }</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account/profile/captainCode">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
} */