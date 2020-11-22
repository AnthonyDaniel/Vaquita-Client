import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Historicos from "./components/Historicos";
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

it('can render and update a historicos', () => {
    // Prueba la primer renderización y componentDidMount
    act( () => {
        ReactDOM.render(<Historicos />, container);
    });

});

//-- ADD --
//Error cases
describe('Tests para agregar Historicos, error case', () => {
    test('No deberia agregar un Historicos si el campo <raza> esta vacio', async () => {
        const component = render(<Historicos />);
        expect(component)
    })
})

