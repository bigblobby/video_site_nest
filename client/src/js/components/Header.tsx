import React from 'react';
import {connect} from 'react-redux';
import {Link, NavLink} from "react-router-dom";
import {userLogout} from "../actions/userActions";

type HeaderProps = {
    authenticated: boolean;
    userLogout: () => void;
}

class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className="container container-fluid max-width">
                <div className="header">
                    <div className="header__inner">
                        <div className="header__logo">
                            <Link class="header__logo-link" to={"/"}>LOGO</Link>
                        </div>

                        <nav className="navigation">
                            <ul className="navigation__list">
                                <li className="navigation__item">
                                    <NavLink className="navigation__link" to={"/"}>One</NavLink>
                                </li>
                                <li className="navigation__item">
                                    <NavLink className="navigation__link" to={"/"}>Two</NavLink>
                                </li>
                                <li className="navigation__item">
                                    <NavLink className="navigation__link" to={"/"}>Three</NavLink>
                                </li>
                            </ul>
                        </nav>

                        <div className="user-actions">
                            {
                                this.props.authenticated ? (
                                    <>
                                        <div className="user-actions__link-container">
                                            <Link className="btn" to={"/user/profile"}>Account</Link>
                                        </div>
                                        <div className="user-actions__link-container">
                                            <button className="btn" onClick={this.props.userLogout}>Logout</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="user-actions__link-container">
                                            <Link className="user-actions__link-login" to={"/login"}>Login</Link>
                                        </div>
                                        <div className="user-actions__link-container">
                                            <Link className="btn btn-primary sign-up" to={"/register"}>Sign Up</Link>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({userReducer}) => {
    const {authenticated} = userReducer;
    return {
        authenticated
    }
}

export default connect(mapStateToProps, { userLogout })(Header);
