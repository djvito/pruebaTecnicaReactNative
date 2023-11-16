// src/screens/ProductListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { obtenerProductosFinancieros } from '../utils/api';
import { authorId } from '../utils/config';


const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<any[]>([]); //
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  useFocusEffect(
    React.useCallback(() => {
      // Llama a tu función obtenerProductosFinancieros() para actualizar la data
      obtenerProductosFinancieros(authorId).then((data) => {
        setFilteredProducts(data.data);
      });
    }, [])
  );

  useEffect(() => {
    obtenerProductosFinancieros(authorId)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log('Productos financieros obtenidos:', response.data);
      })
      .catch((error) => {
        // Maneja cualquier error aquí
        console.error('Error al obtener productos financieros:', error);
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const matchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matchedProducts);
    }
  };

  const handleProductPress = (product: any) => {
    // Navega a la pantalla "ProductDetail" y pasa el objeto del producto
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BANCO PICHINCHA</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.listItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemId}>ID: {item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.productList}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 30,
    marginBottom: 40,
  },
  productList: {
    padding: 30,
  },
  listItem: {
    borderWidth: 0.5,
    paddingVertical: 10,
    padding: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemId: {
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#FFCD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    margin: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
