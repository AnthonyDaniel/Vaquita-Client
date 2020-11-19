import React, { useEffect, useContext } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import * as firebase from "firebase/app";
import { faPlus, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Auth } from "../services/AuthContext";
import app from '../firebaseConfig'

const tabs = [{
    route: "/",
    icon: faHome,
    label: "Home",
    icon: false,
}, {
    route: "/add",
    icon: faPlus,
    label: "",
    icon: true
}, {
    route: "/user",
    icon: faHome,
    label: "User",
    icon: false
}]

const Navigation = (props) => {

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    const { usuario } = useContext(Auth);
    var user;

    useEffect(() => {
        if (usuario != null) {
            //history.push("/");
            user = true;
        }else{
            user = false;
        }
    }, [usuario]);

    return (
        <div>
            {/* Top Bar*/}
            <nav className="navbar navbar-expand-md navbar-light sticky-top d-none d-lg-block " role="navigation">  
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" className="nav-link">
                        <img src="" className="img-fluid" width="60"></img>
                    </NavLink>
                    <Nav className="ml-auto">
                        {usuario == null ? (
                            <div></div>
                        ) : (
                                <NavItem>
                                    <NavLink to="/add" className="nav-link">
                                        <i class="fas fa-plus"></i> Add
                                    </NavLink>
                                </NavItem>
                            )}
                        {usuario == null ? (
                            <div></div>
                        ) : (
                                <NavItem>
                                    <NavLink to="/user" className="nav-link">
                                        <i class="fas fa-user"></i> User
                                    </NavLink>
                                </NavItem>
                            )}
                        {usuario == null ? (
                            <NavItem>
                                <NavLink to="/login" className="nav-link">
                                    <i class="fas fa-sign-in-alt"></i> Login
                                </NavLink>
                            </NavItem>
                        ) : (
                                <NavItem>
                                    <button onClick={() => app.auth().signOut()} className="nav-link btn">
                                        <i class="fas fa-sign-out-alt"></i> Logout
                                    </button>
                                </NavItem>
                            )}

                    </Nav>
                </div>
            </nav>

            {/* Bottom Tab Navigator*/}
            <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav pr-0 p-0" style={{paddingTop:"0px",paddingBottom:"0px", paddingLeft:"0px",paddingRight:"0px"}} role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100" style={{ backgroundColor:"var(--background)"}}>
                        {
                            tabs.map((tab, index) => (
                                <NavItem key={`tab-${index}`}>
                                    <NavLink to={tab.route} className="nav-link" activeClassName="active">
                                        <div className="row d-flex flex-column justify-content-center align-items-center" >
                                            {!tab.icon ? (
                                                <div>
                                                    {tab.label == "Home" ? (
                                                        <div>
                                                            <i class="fas fa-home fa-2x"></i>
                                                        </div>
                                                    ) : (
                                                        <i class="fas fa-user fa-2x"></i>
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                    {usuario!=null ? (
                                                        <div>
                                                                <i class="fas fa-map-marker fa-3x" style={{ color:"#ff4a4a"}}></i>
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </div>
                                            )}
                                            <div>{tab.label}</div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </div>
                </Nav>
            </nav>
        </div>
    )
};
export default Navigation;