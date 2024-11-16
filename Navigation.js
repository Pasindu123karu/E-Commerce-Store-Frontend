import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ProductsScreen from './ProductsScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import Cart from './Cart';
import Profile from './Profile';
import { Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Text style={styles.headerText}>Home</Text>,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: () => <Text style={styles.headerText}>About</Text>,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          headerTitle: () => <Text style={styles.headerText}>Products</Text>,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () => <Text style={styles.headerText}>Profile</Text>,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.headerText}>Product Details</Text>
          ),
          headerStyle: styles.headerStyle,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Products" component={ProductsScreen} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Navigation;
