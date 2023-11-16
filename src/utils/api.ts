// Importa los tipos necesarios de tu aplicación
import axios, { AxiosResponse } from 'axios';

// Define la URL base
const baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

// Define una función para obtener productos financieros
export const obtenerProductosFinancieros = (authorId: string): Promise<AxiosResponse> => {
  const url = `${baseUrl}/bp/products`;
  return axios.get(url, {
    headers: {
      authorId,
    },
  });
};

// Define una función para crear un producto financiero
export const crearProductoFinanciero = (authorId: string, requestBody: any, headers: any): Promise<AxiosResponse> => {
  const url = `${baseUrl}/bp/products`;
  return axios.post(url, requestBody, {
    headers: {
      'Content-Type': 'application/json',
      authorId,
      ...headers,
    },
  });
};


// Define una función para actualizar un producto financiero
export const actualizarProductoFinanciero = (authorId: string, requestBody: any, headers: any): Promise<AxiosResponse> => {
  const url = `${baseUrl}/bp/products`;
  return axios.put(url, requestBody, {
    headers: {
      'Content-Type': 'application/json',
      authorId,
      ...headers,
    },
  });
};

// Define una función para eliminar un producto financiero
export const eliminarProductoFinanciero = (authorId: string, productId: string): Promise<AxiosResponse> => {
  const url = `${baseUrl}/bp/products?id=${productId}`;
  return axios.delete(url, {
    headers: {
      authorId,
    },
  });
};

// Define una función para verificar la existencia de un ID de producto financiero
export const verificarExistenciaIdProducto = (productId: string): Promise<AxiosResponse<boolean>> => {
  const url = `${baseUrl}/bp/products/verification?id=${productId}`;
  return axios.get(url);
};
