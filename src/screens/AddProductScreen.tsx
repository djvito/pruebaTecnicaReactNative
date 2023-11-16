import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios, { AxiosResponse } from 'axios';
import { crearProductoFinanciero } from '../utils/api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { authorId } from '../utils/config';


const AddProductScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [insertionSuccess, setInsertionSuccess] = useState(false);
  const [insertionError, setInsertionError] = useState('');

  // Suponiendo que estos son los campos requeridos según tu imagen
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productLogo, setProductLogo] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [reviewDate, setReviewDate] = useState(new Date());
  const [showReleaseDatePicker, setShowReleaseDatePicker] = useState(false);
  const [showReviewDatePicker, setShowReviewDatePicker] = useState(false);


  // Estados para los mensajes de error
  const [productIDError, setProductIDError] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [productDescriptionError, setProductDescriptionError] = useState('');
  const [productLogoError, setProductLogoError] = useState('');
  const [releaseDateError, setReleaseDateError] = useState('');
  const [reviewDateError, setReviewDateError] = useState('');

  const [productIDRequired, setProductIDRequired] = useState(false);
  const [productNameRequired, setProductNameRequired] = useState(false);
  const [productDescriptionRequired, setProductDescriptionRequired] = useState(false);
  const [productLogoRequired, setProductLogoRequired] = useState(false);


  const handleSubmit = () => {

    let isValid = true;

    // Validación de ID
    if (!productID || productID.length < 3 || productID.length > 10) {
      setProductIDError('ID no valido');
      setProductIDRequired(true);
      isValid = false;
    } else {
      setProductIDRequired(false);
    }

    // Validación de Nombre
    if (!productName || productName.length < 5 || productName.length > 100) {
      setProductNameError('Este campo es requerido');
      setProductNameRequired(true);
      isValid = false;
    } else {
      setProductNameRequired(false);
    }

    // Validación de Descripción
    if (!productDescription || productDescription.length < 10 || productDescription.length > 200) {
      setProductDescriptionError('Este campo es requerido');
      setProductDescriptionRequired(true);
      isValid = false;
    } else {
      setProductDescriptionRequired(false);
    }

    // Validación de Logo
    if (!productLogo) {
      setProductLogoError('Este campo es requerido');
      setProductLogoRequired(true);
      isValid = false;
    } else {
      setProductLogoError('');
      setProductLogoRequired(false);
    }


    // Si todos los campos son válidos, puedes continuar con el envío de datos
    if (isValid) {
      const requestBody = {
        id: productID,
        name: productName,
        description: productDescription,
        logo: productLogo,
        date_release: releaseDate.toISOString(), // Formatea la fecha como se espera en el servidor
        date_revision: reviewDate.toISOString(), // Formatea la fecha como se espera en el servidor
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const requestBodyJSON = JSON.stringify(requestBody);

      // Llama a la función para crear un producto financiero
      crearProductoFinanciero(authorId, requestBodyJSON, headers)
      .then((response: AxiosResponse) => {
        // Verifica la respuesta del servidor
        if (response.status === 200) {
          setInsertionSuccess(true);
          navigation.navigate('ProductList');
        } else {
          setInsertionError('Error al crear el producto financiero.');
        }
      })
      .catch((error) => {
        setInsertionError('Error al crear el producto financiero.');
        console.error('Error al crear el producto financiero:', error);
      });
    }
  };


  // Función para reiniciar el formulario
  const handleReset = () => {
    setProductID('');
    setProductName('');
    setProductDescription('');
    setProductLogo('');
  };

  const handleReleaseDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || releaseDate;
    setShowReleaseDatePicker(false);
    setReleaseDate(currentDate);
  };

  const handleReviewDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || reviewDate;
    setShowReviewDatePicker(false);
    setReviewDate(currentDate);
  };

  const showReleaseDatePickerModal = () => {
    setShowReleaseDatePicker(true);
  };

  const showReviewDatePickerModal = () => {
    setShowReviewDatePicker(true);
  };


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>BANCO PICHINCHA</Text>
        <Text style={styles.h1}>Formulario de Registro</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>ID</Text>
        <TextInput
          style={[
            styles.input,
            productIDRequired && !productID ? styles.inputRequired : null,
          ]}
          onChangeText={setProductID}
          value={productID}
        />
        <Text style={styles.errorText}>{productIDError}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Nombre</Text>
        <TextInput
          style={[
            styles.input,
            productNameRequired && !productName ? styles.inputRequired : null,
          ]}
          onChangeText={setProductName}
          value={productName}
        />
        <Text style={styles.errorText}>{productNameError}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Descripción</Text>
        <TextInput
          style={[styles.input,
          productDescriptionRequired && !productDescription ? styles.inputRequired : null,]}
          onChangeText={setProductDescription}
          value={productDescription}
        />
        <Text style={styles.errorText}>{productDescriptionError}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Logo</Text>
        <TextInput
          style={[styles.input,
          productLogoRequired && !productLogo ? styles.inputRequired : null,
          ]}
          onChangeText={setProductLogo}
          value={productLogo}
        />
        <Text style={styles.errorText}>{productLogoError}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Fecha Liberación</Text>
        <TouchableOpacity onPress={showReleaseDatePickerModal}>
          <Text style={styles.input}>{releaseDate.toDateString()}</Text>
        </TouchableOpacity>

        {showReleaseDatePicker && (
          <DateTimePicker
            value={releaseDate}
            mode="date"
            display="default"
            onChange={handleReleaseDateChange}
          />
        )}
        <Text style={styles.errorText}>{releaseDateError}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Fecha Revisión</Text>
        <TouchableOpacity onPress={showReviewDatePickerModal}>
          <Text style={styles.input}>{reviewDate.toDateString()}</Text>
        </TouchableOpacity>

        {showReviewDatePicker && (
          <DateTimePicker
            value={reviewDate}
            mode="date"
            display="default"
            onChange={handleReviewDateChange}
          />
        )}
        <Text style={styles.errorText}>{reviewDateError}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonEnviar} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonEliminar} onPress={handleReset}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  buttonEnviar: {
    backgroundColor: '#FFCD00',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonEliminar: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputError: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    paddingVertical: 5,
  },
  itemName: {
    fontWeight: 'bold',
  },
  viewContainer: {
    paddingHorizontal: 20,
  },
  inputRequired: {
    borderColor: 'red',
  },
  successMessage: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorMessage: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },  
});

export default AddProductScreen;
