import React, { useEffect, useContext, useState } from "react";
import DataTable from 'react-data-table-component';
import { Auth } from "../services/AuthContext";
import app from "../firebaseConfig";
import ImageUpload from 'image-upload-react';
import "../App.css";
import Swal from 'sweetalert2';
import $ from "jquery";
import uuid from 'react-uuid';
import * as config from "../IPServidor";

const Inventario = () => {
    const { usuario } = useContext(Auth);
    const db = app.firestore();
    const [imageSrc, setImageSrc] = useState(null);
    const [imgFile, setImg] = useState(null);
    const [itsAdmin, setAdmin] = useState(false);
    const [list, setList] = useState([]);
    const [listI, setListI] = useState([]);
    const [deleteList, setListDelete] = useState([]);

    const columns = [
        {
            name: 'Icono',
            selector: 'url',
            sortable: true,
            cell: row => <img height="50px" width="50px" src={row.url} />
        },
        {
            name: 'Raza',
            selector: 'raza',
            sortable: true,
        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
        },
        {
            name: 'Número',
            selector: 'numero',
            sortable: true,
        },
        {
            name: 'Apartado',
            selector: 'apartado',
            sortable: true,
        },
        {
            name: 'Edad',
            selector: 'edad',
            sortable: true,
            right: true,
        },

    ];

    var haveVideo = false;
    var urlImg = "";

    const [raza, setRaza] = useState("");
    const [numero, setNumero] = useState(0);
    const [edad, setEdad] = useState(0);
    const [idApartado, setApartado] = useState("");
    const [state, setState] = useState("");
    const [id, setId] = useState("");
    const [urlE, setUrl] = useState("");

    function changeRaza(event) {
        setRaza(event.target.value);
    }

    function changeNumero(event) {
        setNumero(event.target.value);
    }

    function changeEdad(event) {
        setEdad(event.target.value);
    }

    function changeIdApartado(event) {
        setApartado(event.target.value);
    }

    function changeEState(event) {
        setState(event.target.value);
    }

    function edit() {
        if (deleteList.length == 1){
            setRaza(deleteList[0].raza);
            setNumero(deleteList[0].numero);
            setEdad(deleteList[0].edad);
            setApartado(deleteList[0].apartado);
            setState(deleteList[0].estado);
            setId(deleteList[0].id);
            setUrl(deleteList[0].url);
            $("#editM").click();
        } else if (deleteList.length == 0){
            Swal.fire({
                title: 'error',
                text: 'Debe seleccionar algún elemento para editar',
                icon: 'error',
                timer: 2500
            });
        }else{
            Swal.fire({
                title: 'error',
                text: 'Debe seleccionar solo un elemento, hay más de uno',
                icon: 'error',
                timer: 2500
            });
        }
    }

    function deleteElements() {
        if(deleteList.length == 0){
            Swal.fire({
                title: 'error',
                text: 'Debe seleccionar algún elemento para eliminar',
                icon: 'error',
                timer: 2500
            });
        }else{

            deleteList.forEach(
                element => {
                    console.log(element);

                    var data = {
                        id: element.id
                    }
                    const requestOptions = {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    };

                    fetch(config.IP + '/inventario', requestOptions)
                        .then(response => response.json())
                        .then(
                            data => {
                                console.log(data);
                            }, data2 => {

                            }
                        );
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Se ha eliminado correctamente',
                showConfirmButton: true,
                timer: 15000
            });

            setTimeout(() => {
                window.location.reload(false);
            }, 500);
        }
    }

    function changeState(state) {
        if (deleteList.length == 0) {
            Swal.fire({
                title: 'error',
                text: 'Debe seleccionar algún elemento primero',
                icon: 'error',
                timer: 2500
            });
        }else{
            var state_ = "";

            if (!state) {
                state_ = "en_Finca";
            } else {
                state_ = "vendido";
            }

            deleteList.forEach(
                element => {
                    var data = {
                        id: element.id,
                        raza: element.raza,
                        edad: element.edad,
                        numero: element.numero,
                        apartado: element.apartado,
                        url: element.url,
                        estado: state_
                    }

                    console.log(data);

                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    };

                    fetch(config.IP + '/inventario', requestOptions)
                        .then(response => response.json())
                        .then(
                            data => {
                                console.log(data);
                            }, data2 => {

                            }
                        );
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Se ha modificado el estado de los elementos correctamente',
                showConfirmButton: true,
                timer: 15000
            });

            setTimeout(() => {
                window.location.reload(false);
            }, 500);

        }
    }

    const handleImageSelect = (e) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]));
        setImg(e.target.files[0]);
    }

    const tableChange = (e) => {
        setListDelete(e.selectedRows);

        if(e.selectedRows != null){
            e.selectedRows.forEach(element => {
                console.log(element);
            });
        }
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
        loadListApartado();
        loadListInvertario();
    }, [usuario]);

    function loadListApartado() {
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

    function loadListInvertario() {
        setListI([]);
        const requestOptionsGet = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(config.IP + '/inventario', requestOptionsGet)
            .then(response => response.json())
            .then(
                data => {
                    if (data != null) {
                        setListI(data);
                        console.log(data);
                    }
                }
            );
    }

    return (
        <div className="container-fluid px-0 px-lg-1">
            <div className="jumbotron mb-0">
                <h1 className="display-4 text-center text-lg-left">Inventario</h1>
            </div>
            {itsAdmin ? (
                <div>
                    <button className="btn btn-secondary rounded-circle mr-lg-5" style={{ position: "absolute", left: "0", zIndex: 2 }} data-toggle="modal" data-target="#add">
                        <i className="fas fa-plus fa-2x"></i>
                    </button>
                    <button className="btn btn-secondary rounded-circle mr-lg-5" data-toggle="tooltip" data-placement="bottom" title="Pasar a finca"
                        onClick={() => {
                            Swal.fire({
                                text: "¿ Estas seguro de pasar a finca, este o estos elementos ya vendidos?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, pasar a finca!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    //deleteElements();
                                    changeState(false);
                                }
                            })
                        }
                        }  style={{ position: "absolute", left: "20%", zIndex: 2 }}>
                        <i className="fas fa-compress-arrows-alt fa-2x"></i>
                    </button>
                    <button id="editM" className="btn btn-secondary rounded-circle mr-lg-5" data-toggle="modal" data-target="#modify" hidden>
                    </button>
                    <button className="btn btn-secondary rounded-circle mr-lg-5"
                    onClick={() => {
                        edit();
                    }}  style={{ position: "absolute", left: "43%", zIndex: 2 }} >
                        <i className="fas fa-pencil-alt fa-2x"></i>
                    </button>
                    <button className="btn btn-secondary rounded-circle mr-lg-5" data-toggle="tooltip" data-placement="bottom" title="Vender" onClick={() => {
                        Swal.fire({
                            text: "¿ Estas seguro de vender este o estos elementos ?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, vender!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                //deleteElements();
                                changeState(true);
                            }
                        })
                    }
                    } style={{ position: "absolute", left: "67%", zIndex: 2 }} >
                        <i className="fas fa-expand-arrows-alt fa-2x"></i>
                    </button>
                    <button className="btn btn-secondary rounded-circle mr-lg-5" style={{ position: "absolute", right: "0", zIndex: 2 }} onClick={() => {
                        Swal.fire({
                            text: "¿ Estas seguro de eliminar este o estos elementos del inventario ?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, eliminar!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                deleteElements();
                            }
                        })
                    }
                    }>
                        <i className="fas fa-trash-alt fa-2x"></i>
                    </button>
                </div>
            ):(
                <div></div>
            )}
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-12">
                        <DataTable
                            columns={columns}
                            data={listI}
                            selectableRows
                            pagination
                            onSelectedRowsChange={tableChange}
                        />
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addT">Añadir a inventario</h5>
                            <button id="closeAdd" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="col-12 text-left">
                                    <div className="form-group">
                                        <label>Raza</label>
                                        <input onChange={changeRaza} type="text" className="form-control" placeholder="Escribir la raza" />
                                    </div>
                                    <div className="form-group">
                                        <label>Número del animal</label>
                                        <input onChange={changeNumero} type="number" className="form-control" placeholder="Escribir el número del animal" />
                                    </div>
                                    <div className="form-group">
                                        <label>Edad del animal</label>
                                        <input onChange={changeEdad} type="number" className="form-control" placeholder="Escribir la edad del animal" />
                                    </div>
                                    <div className="form-group">
                                        <label>Apartado</label>
                                        <select onChange={changeIdApartado} className="form-control" >
                                            <option selected disabled>Seleccione...</option>
                                            {list.map(
                                                ({ id, nombre, mt2 }) => (
                                                    <option value={nombre+" : "+mt2+"mt2"}>{nombre} : {mt2}mt2</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 text-left mt-2">
                                    <h6>Subir imagen:</h6>
                                </div>
                                <div className="col-10 text-center">
                                    <ImageUpload
                                        handleImageSelect={handleImageSelect}
                                        imageSrc={imageSrc}
                                        setImageSrc={setImageSrc}
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            background: '#c7c6bc59'
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                        <button className="btn btn-primary btn-block" onClick={ ()=>{
                                            Swal.fire({
                                                text: "¿ Estas seguro de guardar esto en inventarío ?",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Si, guardar!'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    if (raza != "" && edad != 0 && numero != 0 && idApartado != "" && imgFile != null){

                                                        var nameFile = imgFile.size + uuid();

                                                        console.log(nameFile);

                                                        var urlImg = "";
                                                        const storageRef = app.storage().ref(`images/${nameFile}`)
                                                        const task = storageRef.put(imgFile)

                                                        var lastResult = null;

                                                        task.on('state_changed', (snapshot) => {
                                                            lastResult = snapshot;
                                                            var porcentaje = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
                                                        }, (error) => {
                                                            console.error(error.message);
                                                        }, () => {
                                                            app.storage()
                                                                .ref("images")
                                                                .child(nameFile)
                                                                .getDownloadURL()
                                                                .then(url => {
                                                                    urlImg = url;

                                                                    var data={
                                                                        id: uuid(),
                                                                        raza:raza,
                                                                        edad:edad,
                                                                        numero:numero,
                                                                        apartado:idApartado,
                                                                        url:url,
                                                                        estado:"en_Finca"
                                                                    }

                                                                    const requestOptions = {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify(data)
                                                                    };

                                                                    fetch(config.IP + '/inventario', requestOptions)
                                                                        .then(response => response.json())
                                                                        .then(
                                                                            data => {}
                                                                        )

                                                                    $("#itsProgress").hide();
                                                                    Swal.fire({
                                                                        title: 'Success',
                                                                        text: 'Se ha guardado correctamente',
                                                                        icon: 'success',
                                                                        timer: 3500
                                                                    });
                                                                    $("#closeAdd").click();
                                                                    loadListInvertario();
                                                                    window.location.reload(false);
                                                                });
                                                        })
                                                    }else{
                                                        Swal.fire({
                                                            title: 'error',
                                                            text: 'No puedes dejar espacios en blanco',
                                                            icon: 'error',
                                                            timer: 2500
                                                        });
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
            <div className="modal fade" id="modify" tabindex="-1" role="dialog" aria-labelledby="modify" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addT">Editar inventario</h5>
                            <button id="closeEdit" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="col-12 text-left">
                                    <div className="form-group">
                                        <label>Raza</label>
                                        <input onChange={changeRaza} value={raza} type="text" className="form-control" placeholder="Escribir la raza" />
                                    </div>
                                    <div className="form-group">
                                        <label>Número del animal</label>
                                        <input onChange={changeNumero} value={numero} type="number" className="form-control" placeholder="Escribir el número del animal" />
                                    </div>
                                    <div className="form-group">
                                        <label>Edad del animal</label>
                                        <input onChange={changeEdad} value={edad} type="number" className="form-control" placeholder="Escribir la edad del animal" />
                                    </div>
                                    <div className="form-group">
                                        <label>Apartado</label>
                                        <select onChange={changeIdApartado} value={idApartado} className="form-control" >
                                            <option selected disabled>Seleccione...</option>
                                            {list.map(
                                                ({ id, nombre, mt2 }) => (
                                                    <option value={nombre + " : " + mt2 + "mt2"}>{nombre} : {mt2}mt2</option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Estado</label>
                                        <select onChange={changeEState} className="form-control"  value={state}>
                                            <option value="en_Finca">En Finca</option>
                                            <option value="vendido">Vendido</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 text-left mt-2">
                                    <h6>Subir imagen:</h6>
                                </div>
                                <div className="col-10 text-center">
                                    <ImageUpload
                                        handleImageSelect={handleImageSelect}
                                        imageSrc={imageSrc}
                                        setImageSrc={setImageSrc}
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            background: '#c7c6bc59'
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary btn-block" onClick={() => {
                                        Swal.fire({
                                            text: "¿ Estas seguro de editar ?",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Si, guardar!'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                if (raza != "" && edad != 0 && numero != 0 && idApartado != "" && imgFile != null) {
                                                    var nameFile = imgFile.size + uuid();

                                                    console.log(nameFile);

                                                    var urlImg = "";
                                                    const storageRef = app.storage().ref(`images/${nameFile}`)
                                                    const task = storageRef.put(imgFile)

                                                    var lastResult = null;

                                                    task.on('state_changed', (snapshot) => {
                                                        lastResult = snapshot;
                                                        var porcentaje = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
                                                    }, (error) => {
                                                        console.error(error.message);
                                                    }, () => {
                                                        app.storage()
                                                            .ref("images")
                                                            .child(nameFile)
                                                            .getDownloadURL()
                                                            .then(url => {
                                                                urlImg = url;

                                                                var data = {
                                                                    id: uuid(),
                                                                    raza: raza,
                                                                    edad: edad,
                                                                    numero: numero,
                                                                    apartado: idApartado,
                                                                    url: urlImg,
                                                                    estado: state
                                                                }

                                                                const requestOptions = {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify(data)
                                                                };

                                                                fetch(config.IP + '/inventario', requestOptions)
                                                                    .then(response => response.json())
                                                                    .then(
                                                                        data => { }
                                                                    )

                                                                $("#itsProgress").hide();
                                                                Swal.fire({
                                                                    title: 'Success',
                                                                    text: 'Se ha editado correctamente',
                                                                    icon: 'success',
                                                                    timer: 3500
                                                                });
                                                                $("#closeEdit").click();
                                                                loadListInvertario();
                                                                window.location.reload(false);
                                                            });
                                                    })
                                                } else if (imgFile == null){
                                                    var data = {
                                                        id: id,
                                                        raza: raza,
                                                        edad: edad,
                                                        numero: numero,
                                                        apartado: idApartado,
                                                        url: urlE,
                                                        estado: state
                                                    }

                                                    console.log(data);

                                                    const requestOptions = {
                                                        method: 'PUT',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify(data)
                                                    };

                                                    fetch(config.IP + '/inventario', requestOptions)
                                                        .then(response => response.json())
                                                        .then(
                                                            data => { }
                                                        )

                                                    $("#itsProgress").hide();
                                                    Swal.fire({
                                                        title: 'Success',
                                                        text: 'Se ha editado correctamente',
                                                        icon: 'success',
                                                        timer: 3500
                                                    });
                                                    $("#closeEdit").click();
                                                    loadListInvertario();
                                                    //window.location.reload(false);
                                                } else {
                                                    Swal.fire({
                                                        title: 'error',
                                                        text: 'No puedes dejar espacios en blanco',
                                                        icon: 'error',
                                                        timer: 2500
                                                    });
                                                }
                                            }
                                        })
                                    }
                                    }>
                                        Editar
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

export default Inventario;

