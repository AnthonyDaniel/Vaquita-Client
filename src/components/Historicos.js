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

const Historicos = () => {
    const  usuario  = useContext(Auth);
    const db = app.firestore();
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

    const tableChange = (e) => {
        setListDelete(e.selectedRows);

        if (e.selectedRows != null) {
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
                        var list = [];
                        data.forEach(element=>{
                            if (element.estado == "vendido"){
                                list.push(element);
                            }
                        });
                        setListI(list);
                    }
                }
            );
    }

    return (
        <div className="container-fluid px-0 px-lg-1">
            <div className="jumbotron mb-0">
                <h1 className="display-4 text-center text-lg-left">Historicos</h1>
            </div>

            <div className="container-fluid mt-2">
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
        </div>
    );
}

export default Historicos;

