import React, { useEffect, useContext } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import * as firebase from "firebase/app";
import { faPlus, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Auth } from "../services/AuthContext";
import app from '../firebaseConfig';
import icono from "../assets/icono.png";

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
            {usuario == null ? (
                <NavItem className="d-block d-lg-none" style={{listStyle:"none", position:"absolute", top:"0",right:"0"}}>
                    <NavLink to="/login" className="nav-link">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </NavLink>
                </NavItem>
            ) : (
                <NavItem className="d-block d-lg-none" style={{ listStyle: "none", position: "absolute", top: "0", right: "0" }}>
                        <button onClick={() => {app.auth().signOut();    window.location.reload(false);}} className="nav-link btn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </NavItem>
            )}

            <nav className="navbar navbar-expand-md navbar-light sticky-top d-none d-lg-block " role="navigation">  
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" className="nav-link">
                        <img src={icono} className="img-fluid" width="60"></img>
                    </NavLink>
                    <Nav className="ml-auto">
                      
                        <NavItem>
                            <NavLink to="/" className="nav-link">
                                <i class="fas fa-hat-cowboy-side "></i> Inventario
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/apartados" className="nav-link">
                                <i class="fas fa-puzzle-piece"></i> Apartados
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/historicos" className="nav-link">
                                <i class="fas fa-history"></i> Históricos
                            </NavLink>
                        </NavItem>
                            
                    
                        {usuario == null ? (
                            <NavItem>
                                <NavLink to="/login" className="nav-link">
                                    <i class="fas fa-sign-in-alt"></i> Login
                                </NavLink>
                            </NavItem>
                        ) : (
                                <NavItem>
                                    <button onClick={() => { app.auth().signOut(); window.location.reload(false); }}  className="nav-link btn">
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
                    <div className=" d-flex flex-row justify-content-around w-100" style={{ backgroundColor:"whitesmoke"}}>
                        <NavItem>
                            <NavLink to="/" className="nav-link" activeClassName="active">
                                <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <div>
                                            <div>
                                                <i class="fas fa-hat-cowboy-side fa-2x"></i>
                                            </div>
                                        </div>
                                    <div>Inventario</div>
                                </div>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/apartados" className="nav-link" activeClassName="active">
                                <div className="row d-flex flex-column justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <i class="fas fa-puzzle-piece fa-2x"></i>
                                        </div>
                                    </div>
                                    <div>Apartados</div>
                                </div>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/historicos" className="nav-link" activeClassName="active">
                                <div className="row d-flex flex-column justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <i class="fas fa-history fa-2x"></i>
                                        </div>
                                    </div>
                                    <div>Históricos</div>
                                </div>
                            </NavLink>
                        </NavItem>
                    </div>
                </Nav>
            </nav>
        </div>
    )
};
export default Navigation;