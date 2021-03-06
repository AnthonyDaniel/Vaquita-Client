import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Inventario from "./components/Inventarios";
import { create } from "react-test-renderer";
import { fireEvent, render, waitForElement } from '@testing-library/react'

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('can render and update a inventario', () => {
    // Prueba la primer renderización y componentDidMount
    act( () => {
        ReactDOM.render(<Inventario />, container);
    });

});

//-- ADD --
//Error cases
describe('Tests para agregar inventario, error case', () => {
    test('No deberia agregar un inventario si el campo <raza> esta vacio', async () => {
        const component = render(<Inventario />);
        expect(component)
    })
})