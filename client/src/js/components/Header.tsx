import React from 'react';
import {Link, NavLink} from "react-router-dom";

class Header extends React.Component {
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
                                    <NavLink to={"/"}>Models</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to={"/"}>Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to={"/"}>Live Cams</NavLink>
                                </li>
                            </ul>
                        </nav>

                        <div className="user-actions">
                            <div>
                                <Link className="login" to={"/login"}>Login</Link>
                            </div>
                            <div>
                                <Link className="btn btn-primary sign-up" to={"/register"}>Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
