import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';

const productURL = 'https://api.escuelajs.co/api/v1/products';

const ProductsScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch(productURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(category.toLowerCase()) &&
          item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://thumbs.dreamstime.com/b/wood-grain-white-texture-seamless-wooden-pattern-abstract-line-background-tree-fiber-vector-illustration-wood-grain-white-texture-320523534.jpg',
      }}
      style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Products..."
            value={searchText}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollContainer}>
          <View style={styles.categoryContainer}>
            {['T-Shirt', 'Cap', 'Shorts', 'Table', 'Laptop'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryItem,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => filterByCategory(category)}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.selectedCategoryText,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === null && styles.selectedCategory,
              ]}
              onPress={() => filterByCategory(null)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === null && styles.selectedCategoryText,
                ]}>
                All
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <SafeAreaView style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#6200ee" />
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={({ id }) => id.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() =>
                    navigation.navigate('ProductDetails', { product: item })
                  }>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text style={styles.imageText}>{item.title}</Text>
                  <Text style={styles.price}>Price: ${item.price}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.6)' },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  searchInput: {
    height: 40,
    width: 200,
    borderColor: '#ddd',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#FF5722',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: { color: 'white', fontWeight: 'bold' },
  horizontalScrollContainer: { flexDirection: 'row', marginBottom: 16 },
  categoryContainer: { flexDirection: 'row', marginBottom: 10 },
  categoryItem: {
    height: 40,
    width: 120,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  selectedCategory: {
    backgroundColor: '#FF5722',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  categoryText: { fontSize: 16, fontWeight: '600', color: '#333' },
  imageContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    width: 160,
    height: 250,
    marginHorizontal: 8,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  image: { marginVertical: 10, width: '90%', height: 140, borderRadius: 10 },
  imageText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
  },
  price: { fontSize: 16, fontWeight: 'bold', color: '#FF5722', marginTop: 5 },
});

export default ProductsScreen;
