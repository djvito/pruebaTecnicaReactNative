import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddProductScreen from '../src/screens/AddProductScreen';
import { crearProductoFinanciero } from '../src/utils/api';

jest.mock('../src/utils/api', () => ({
  crearProductoFinanciero: jest.fn(),
}));

describe('AddProductScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddProductScreen />);

    const headerText = getByText('Formulario de Registro');
    const idInput = getByPlaceholderText('ID');
    const nameInput = getByPlaceholderText('Nombre');
    const descriptionInput = getByPlaceholderText('Descripción');
    const logoInput = getByPlaceholderText('Logo');

    expect(headerText).toBeTruthy();
    expect(idInput).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(logoInput).toBeTruthy();

  });

  it('allows user input and form submission', async () => {
    const { getByPlaceholderText, getByText } = render(<AddProductScreen />);

    const idInput = getByPlaceholderText('ID');
    const nameInput = getByPlaceholderText('Nombre');
    const descriptionInput = getByPlaceholderText('Descripción');
    const logoInput = getByPlaceholderText('Logo');

    fireEvent.changeText(idInput, '1234');
    fireEvent.changeText(nameInput, 'victor');
    fireEvent.changeText(descriptionInput, 'pruebas unitarias');
    fireEvent.changeText(logoInput, 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg');

    const submitButton = getByText('Enviar');
    fireEvent.press(submitButton);

    expect(crearProductoFinanciero).toHaveBeenCalledWith(
      expect.any(String), 
      expect.any(String), 
      expect.objectContaining({
        id: '123',
        name: 'Product Name',
        description: 'Product Description',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      })
    );
  });
});
