import React from 'react';
import {connect} from 'react-redux';
import {Link, NavLink} from "react-router-dom";
import {userLogout} from "../actions/userActions";

type HeaderProps = {
    authenticated: boolean;
    userLogout: () => {};
}

class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className="main-header">
                <div className="container container-fluid max-width">
                    <div className="main-header--inner">
                        <div className="logo">
                            <Link to={"/"}>LOGO</Link>
                        </div>

                        <nav className="navigation">
                            <ul>
                                <li>
                                    <NavLink to={"/"}>One</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to={"/"}>Two</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to={"/"}>Three</NavLink>
                                </li>
                            </ul>
                        </nav>

                        <div className="user-actions">
                            {
                                this.props.authenticated ? (
                                    <>
                                        <div>
                                            <Link className="btn" to={"/profile"}>Account</Link>
                                        </div>
                                        <div>
                                            <button className="btn" onClick={this.props.userLogout}>Logout</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Link className="login" to={"/login"}>Login</Link>
                                        </div>
                                        <div>
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
