import React, { useEffect, useContext, useState } from "react";
import { Auth } from "../services/AuthContext";
import app from "../firebaseConfig";
import "../App.css";
import Swal from 'sweetalert2';
import $ from "jquery";
import * as config from "../IPServidor";
import uuid from 'react-uuid';

const Apartado = () => {
    const { usuario } = useContext(Auth);
    const db = app.firestore();
    const [itsAdmin, setAdmin] = useState(false);
    const [list, setList] = useState([]);

    var name = "",mt2 = "";

    function changeName(event) {
        name = event.target.value;
    }

    function changeMt2(event) {
        mt2 = event.target.value;
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        };

        fetch(config.IP + '/user/itsadmin', requestOptions)
            .then(response => response.json())
            .then(
                data => {
                    setAdmin(data.itsAdmin);
                    console.log(itsAdmin);
                }
            );
        loadList();
    }, [usuario]);

    function loadList(){
        setList([]);
        const requestOptionsGet = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(config.IP + '/apartado', requestOptionsGet)
            .then(response => response.json())
            .then(
                data => {
                    if (data != null) {
                        setList(data);
                    }
                }
        );
    }

    return (
        <div className="container-fluid px-0 px-lg-1">
            <div className="jumbotron mb-0">
                <h1 className="display-4 text-center text-lg-left">Apartado</h1>
            </div>
            {itsAdmin ? (
                <button className="btn btn-primary rounded-circle mr-lg-5" style={{ position: "absolute", right: "0" }} data-toggle="modal" data-target="#addP">
                    <i className="fas fa-plus fa-2x"></i>
                </button>
            ) : (
                    <div></div>
                )}

            <div className="container-fluid mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">MT2</th>
                            {itsAdmin ? (
                                <th scope="col">Acciones</th>
                            ) : (
                               <th scope="col" hidden>Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(
                            ({ id, nombre, mt2 }) => (
                                <tr>
                                    <td className="text-center">{nombre}</td>
                                    <td className="text-center">{mt2}</td>
                                    {itsAdmin ? (
                                        <td className="text-center">
                                            <button type="button" className="btn btn-danger" onClick={() => {
                                                Swal.fire({
                                                    text: "¿ Estas seguro de eliminar este apartado ?",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Si, eliminar!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        var data={
                                                            id:id
                                                        }
                                                        const requestOptions = {
                                                            method: 'DELETE',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify(data)
                                                        };

                                                        fetch(config.IP + '/apartado', requestOptions)
                                                            .then(response => response.json())
                                                            .then(
                                                                data => {
                                                                    console.log(data);
                                                                },data2=>{
                                                                    Swal.fire({
                                                                        icon: 'success',
                                                                        title: 'Se ha eliminado correctamente',
                                                                        showConfirmButton: true,
                                                                        timer: 15000
                                                                    });
                                                                    loadList();
                                                                }
                                                            );
                                                    }
                                                })
                                            }
                                            }><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    ) : (
                                        <td hidden>
                                        </td>
                                    )}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>    

            <div className="modal fade" id="addP" tabindex="-1" role="dialog" aria-labelledby="addP" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addT">Añadir apartado</h5>
                            <button id="closeModelP" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="col-12 text-left">
                                    <div className="form-group">
                                        <label>Nombre de Apartado</label>
                                        <input onChange={changeName} type="text" className="form-control" placeholder="Escribir el nombre del apartado" />
                                    </div>
                                    <div className="form-group">
                                        <label>Mt2</label>
                                        <input onChange={changeMt2} type="number" className="form-control" placeholder="Escribir los mt2" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary btn-block" onClick={() => {
                                        Swal.fire({
                                            text: "¿ Estas seguro de guardar este apartado ?",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Si, guardar!'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                if(name=="" || mt2==""){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'No debes dejar espacios en blanco',
                                                        showConfirmButton: true,
                                                        timer: 15000
                                                    });
                                                }else{
                                                    var data = {
                                                        id: uuid(),
                                                        nombre:name,
                                                        mt2:mt2
                                                    }

                                                    const requestOptions = {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify(data)
                                                    };

                                                    fetch(config.IP + '/apartado', requestOptions)
                                                        .then(response => response.json())
                                                        .then(
                                                            data => {
                                                                name = "";
                                                                mt2 = "";
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Se ha guardado correctamente',
                                                                    showConfirmButton: true,
                                                                    timer: 15000
                                                                });
                                                                console.log(data);
                                                            }, 
                                                            data2 => {
                                                                name = "";
                                                                mt2 = "";
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Se ha guardado correctamente',
                                                                    showConfirmButton: true,
                                                                    timer: 15000
                                                                });
                                                                $("#closeModelP").click();
                                                                loadList();
                                                            }
                                                        );
                                                }
                                            }
                                        })

                                    }
                                    }>
                                        Guardar
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Apartado;

