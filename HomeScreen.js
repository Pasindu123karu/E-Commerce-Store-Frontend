import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const productURL = 'https://api.escuelajs.co/api/v1/products';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [horizontalProductData, setHorizontalProductData] = useState([]);
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

    fetch(productURL)
      .then((response) => response.json())
      .then((json) => setHorizontalProductData(json.slice(0, 4)))
      .catch((error) => alert(error));
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
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.openDrawer()}>
            <Image
              source={{
                uri: 'https://img.icons8.com/?size=30&id=S5biqohaDgd1&format=png',
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.mobixText}>TrendyCart</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{
                uri: 'https://img.icons8.com/color/40/user-male-circle.png',
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

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
          style={styles.itemContainer}>
          {horizontalProductData.map((item) => (
            <View key={item.id} style={styles.imageContainer}>
              <View style={styles.newLabel}>
                <Text style={styles.newLabelText}>New</Text>
              </View>
              <Image source={{ uri: item.images[0] }} style={styles.image} />
              <Text style={styles.imageText}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate('Products')}>
            <Text style={styles.viewMoreButtonText}>View More</Text>
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
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    borderRadius: 10,
  },
  iconButton: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 30, height: 30 },
  mobixText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
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
    width: 250,
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
    backgroundColor: '#F5F5F5', //
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5722',
    paddingHorizontal: 8,
  },
  selectedCategory: {
    backgroundColor: '#FF5722',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  categoryText: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemContainer: { flexDirection: 'row', marginBottom: 5 },
  imageContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 160,
    height: 250,
    marginHorizontal: 8,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 10,
  },
  image: {
    width: '90%',
    height: 140,
    borderRadius: 10,
  },
  imageText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
  },
  price: { fontSize: 16, fontWeight: 'bold', color: '#FF5722', marginTop: 5 },
  viewMoreButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  viewMoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  newLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF5722',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  newLabelText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  centeredView: { alignItems: 'center' },
});

export default HomeScreen;
