import React from 'react'
import {fireEvent, render, waitForElement} from '@testing-library/react'
import Inventario from "./components/Inventarios";


//-- ADD --
//Error cases
describe('Tests para agregar inventario, error case', () => {
    test('No deberia agregar un inventario si el campo <raza> esta vacio', async() => {
        //renderizar component
        const {getByTestId} = render(<Inventario/>)
        const fieldNode = await waitForElement(
            ()=> getByTestId('raza')
        )
        //input
        const newText = ''
        fireEvent.change(
            fieldNode,
            {target:{value: newText}}
        )
        expect(fieldNode.value).toEqual('Simmental')
    })
})
describe('Tests para agregar inventario, error case', () => {
    test('El numero de animal esperado no es un string', async() => {
        const {getByTestId} = render(<Inventario/>)
        const fieldNode = await waitForElement(
            ()=> getByTestId('numeroAnimal')
        )
        const newText = 'hola'
        fireEvent.change(
            fieldNode,
            {target:{value: newText}}
        )
        expect(fieldNode.value).toEqual('123')
    })
})

//Happy paths
describe('Tests para agregar inventario, happy path', () => {
    test('El campo raza debeia estar en el formulario', () => {
        const component = render(<Inventario/>)
        const inputNode = component.getByText("Raza")
        expect(inputNode).toBeInTheDocument();
    })
})
describe('Tests para agregar inventario, happy path', () => {
    test('El campo edadAnimal deberia tener un label', () => {
        const component = render(<Inventario/>)
        const dniInputNode = component.getByLabelText("Número del animal")
        expect(dniInputNode.getAttribute("name")).toBe("numeroAnimal");
    })
})

//-- UPDATE --
//Happy paths
describe('Tests para editar inventario, happy path', () => {
    test('Dni input should accept text', () => {
        const {getByLabelText} = render(<Inventario/>)
        const apellidosInputNode = getByLabelText("Cédula");
        expect(apellidosInputNode.value).toMatch("")
        fireEvent.change(apellidosInputNode,{target:{value:'testing'}})
        expect(apellidosInputNode.value).toMatch("testing");
    
    })
})
describe('Tests para editar inventario, happy path', () => {
    test('Dni input should accept number', () => {
        const {getByLabelText} = render(<Inventario/>)
        const apellidosInputNode = getByLabelText("Cédula");
        const uriRegEx = /[0-9]+/;
        
        fireEvent.change(
            apellidosInputNode,
            {target:{value:'5'}}
        )
        
        expect(apellidosInputNode.value).toMatch(uriRegEx);
      
    })
})
//Error cases
describe('Tests para agregar inventario, error case', () => {
    test('Dni input should accept number', () => {
        const {getByLabelText} = render(<Inventario/>)
        const apellidosInputNode = getByLabelText("Cédula");
        const uriRegEx = /[0-9]+/;
        
        fireEvent.change(
            apellidosInputNode,
            {target:{value:'hola'}}
        )
        
        expect(apellidosInputNode.value).toMatch(uriRegEx);
      
    })
})
describe('Tests para agregar inventario, error case', () => {
    test('Should be able to subbmit form', () => {
     const mockFn = jest.fn();
     const {getByRole} = render(<Inventario handleSubmit={mockFn} />);
     const buttonNode = getByRole("button");
     fireEvent.submit(buttonNode);
     fireEvent.submit(buttonNode);
     expect(mockFn).toHaveBeenCalledTimes(1);
    })
})

//-- LIST --
//-- DELETE --