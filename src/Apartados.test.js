import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Apartados from "./components/Apartados";
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

it('can render and update a Apartados', () => {
    // Prueba la primer renderización y componentDidMount
    act( () => {
        ReactDOM.render(<Apartados />, container);
    });

});

//-- ADD --
//Error cases
describe('Tests para agregar Apartados, error case', () => {
    test('No deberia agregar un Apartados si el campo <Apartados> esta vacio', async () => {
        const component = render(<Apartados />);
        expect(component)
    })
})
