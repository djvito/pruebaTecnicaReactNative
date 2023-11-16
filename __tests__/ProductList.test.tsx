import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductListScreen from '../src/screens/ProductListScreen';

describe('ProductListScreen', () => {
  it('debe renderizar correctamente', () => {
    const { getByText, getByPlaceholderText } = render(<ProductListScreen />);

    const headerText = getByText('BANCO PICHINCHA');
    expect(headerText).toBeTruthy();

    const searchBar = getByPlaceholderText('Buscar...');
    expect(searchBar).toBeTruthy();
  });

  it('debe realizar una búsqueda correctamente', () => {
    const { getByPlaceholderText, getByText } = render(<ProductListScreen />);


    const searchBar = getByPlaceholderText('Buscar...');
    fireEvent.changeText(searchBar, 'vito');


    expect(searchBar.props.value).toBe('vito');


    const filteredProductText = getByText('ID: vito');
    expect(filteredProductText).toBeTruthy();
  });
});
