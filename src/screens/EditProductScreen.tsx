// src/screens/EditProductScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import { actualizarProductoFinanciero } from '../utils/api';


type EditProductScreenRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

type Props = {
  route: EditProductScreenRouteProp;
};

interface ProductFormState {
  id: string;
  name: string;
  description: string;
  logo: string;
  releaseDate: string;
  reviewDate: string;
}

const EditProductScreen: React.FC<Props> = ({ route }) => {
  const { product } = route.params;

  const [showReleaseDatePicker, setShowReleaseDatePicker] = useState(false);
  const [showReviewDatePicker, setShowReviewDatePicker] = useState(false);

  const [formState, setFormState] = useState<ProductFormState>({
    id: product.id,
    name: product.name,
    description: product.description,
    logo: product.logo,
    releaseDate: product.date_release,
    reviewDate: product.date_revision,
  });

  const handleSaveChanges = () => {
    // Validate and save product changes
    const { id, name, description, logo, releaseDate, reviewDate } = formState;

    // Prepare the request body as a JSON string
    const requestBody = {
      id: formState.id,
      name: formState.name,
      description: formState.description,
      logo: formState.logo,
      date_release: formState.releaseDate.toString(),
      date_revision: formState.reviewDate.toString(),
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const requestBodyJSON = JSON.stringify(requestBody);

    actualizarProductoFinanciero('1234', requestBodyJSON, headers)
      .then((response) => {
        // Check the server response
        if (response.status === 200) {
          Alert.alert('Success', 'Financial product updated successfully.');

        } else {
          Alert.alert('Error', 'Failed to update financial product.');
        }
      })
      .catch((error) => {
        console.error('Error updating financial product:', error);
        Alert.alert('Error', 'Failed to update financial product.');
      });
  };

  const handleReleaseDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowReleaseDatePicker(false);
    setFormState({ ...formState, releaseDate: currentDate.toISOString() });
  };

  const handleReviewDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowReviewDatePicker(false);
    setFormState({ ...formState, reviewDate: currentDate.toISOString() });
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
        <Text style={styles.h1}>Formulario de Edición</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormState({ ...formState, id: text })}
          value={formState.id}
        />
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Nombre</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormState({ ...formState, name: text })}
          value={formState.name}
        />
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Descripción</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormState({ ...formState, description: text })}
          value={formState.description}
        />
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Logo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormState({ ...formState, logo: text })}
          value={formState.logo}
        />
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Fecha Liberación</Text>
        <TouchableOpacity onPress={showReleaseDatePickerModal}>
          <Text style={styles.input}>{formState.releaseDate}</Text>
        </TouchableOpacity>

        {showReleaseDatePicker && (
          <DateTimePicker
            value={new Date(formState.releaseDate)}
            mode="date"
            display="default"
            onChange={handleReleaseDateChange}
          />
        )}
      </View>

      <View style={styles.viewContainer}>
        <Text style={styles.itemName}>Fecha Revisión</Text>
        <TouchableOpacity onPress={showReviewDatePickerModal}>
          <Text style={styles.input}>{formState.reviewDate}</Text>
        </TouchableOpacity>

        {showReviewDatePicker && (
          <DateTimePicker
            value={new Date(formState.reviewDate)}
            mode="date"
            display="default"
            onChange={handleReviewDateChange}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonEnviar} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
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
    borderColor: '#ccc',
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    marginBottom: 40,
    marginTop: 20,
  },
  buttonEnviar: {
    backgroundColor: 'blue',
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default EditProductScreen;
