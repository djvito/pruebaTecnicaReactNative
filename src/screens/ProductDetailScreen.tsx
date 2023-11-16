import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { format } from 'date-fns';
import { RootStackParamList } from '../../App';
import { eliminarProductoFinanciero } from '../utils/api';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

type Props = {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
};

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [modifiedProduct, setModifiedProduct] = useState(product);

  const handleEditProduct = (product: any) => {
    navigation.navigate('EditProduct', { product: modifiedProduct });
    console.log("EditProduct :", modifiedProduct);
  };

  const handleDeleteProduct = () => {
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const confirmDelete = () => {
    eliminarProductoFinanciero('1234', product.id)
      .then((response) => {
        console.log('Producto eliminado:', response.data);
        setShowDeleteConfirmation(false);

        navigation.navigate('ProductList');
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
        setShowDeleteConfirmation(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BANCO PICHINCHA</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoPrincipal}>
          <Text style={styles.dataid}>ID: {product.id}</Text>
          <Text style={styles.labelid}>Informacion extra</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.data}>Nombre</Text>
          <Text style={styles.label}>{product.name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.data}>Descripción</Text>
          <Text style={styles.label}>{product.description}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.data}>Logo:</Text>
          <Image style={styles.logo} source={{ uri: product.logo }} />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.data}>Fecha Liberación:</Text>
          <Text style={styles.label}>{format(new Date(product.date_release), 'dd/MM/yyyy')}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.data}>Fecha Revisión:</Text>
          <Text style={styles.label}>{format(new Date(product.date_revision), 'dd/MM/yyyy')}</Text>
        </View>
      </View>


      <TouchableOpacity style={styles.editButton} onPress={handleEditProduct}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProduct}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>

      <Modal visible={showDeleteConfirmation} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar el producto {product.name}?</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
            <Text style={styles.confirmButtonText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelDelete}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
    color: '#34375f'
  },
  infoContainer: {
    marginBottom: 90,
    padding: 30,
  },
  infoPrincipal: {

  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelid: {
    marginBottom: 50,
  },
  dataid: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#D3D3D3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: 'yellow',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  confirmButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});



export default ProductDetailScreen;
