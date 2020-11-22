import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import * as firebase from "firebase/app";
import app from "../firebaseConfig";
import { Auth } from "../services/AuthContext";
import Swal from 'sweetalert2'
import "../App.css";
import icono from "../assets/icono.png";
import * as config from "../IPServidor";

const Login = ({ history }) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

    const [signup, setsignup] = useState(false);
    const { usuario } = useContext(Auth);
    const [error, seterror] = useState('')

    useEffect(() => {
        if (usuario) {
            history.push("/");
        }
    }, [history, usuario]);

    const correoClave = async e => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(usuario.value, clave.value)
            .then(result => {
                Swal.fire({
                    title: 'Bienvenido a Vaquita',
                    text: 'Has iniciado sesión correctamente!!',
                    icon: 'success',
                    timer: 500
                });
                history.push("/");
            })
            .catch(error => {
                seterror(error.message)
                Swal.fire({
                    title: 'Error!',
                    text: 'Error, intenta de nuevo por favor!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            });
    };

    const socialLogin = async (provider) => {
        await app
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                Swal.fire({
                    title: 'Bienvenido a Vaquita',
                    text: 'Has iniciado sesión correctamente!!',
                    icon: 'success',
                    timer: 500
                });


                console.log(result);

                var data = {
                    email: "",
                    role: ""
                }

                data.email = result.user.email;
                data.role = 0;

                console.log("IPSERVER: " + config.IP);
                console.log(data);

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                };

                fetch(config.IP+'/user', requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data));

                history.push("/");
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
                seterror(error.message)
            });
    }
    return (
        <div className="container-fluid">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={icono} id="icon" alt="User Icon" />
                    </div>
                    <div id="formFooter">
                        <p>Iniciar sesión</p>
                        <button className="btn btn-default  fa-3x text-center underlineHover">
                            <i className="fab fa-google" style={{ color: "var(--text)" }} onClick={() => socialLogin(googleAuthProvider)}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default withRouter(Login);
