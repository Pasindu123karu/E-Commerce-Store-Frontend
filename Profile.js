import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SimplifiedProfilePage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Image
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userDetails}>San Francisco, CA</Text>
        <Text style={styles.userDetails}>+1 (123) 456-7890</Text>
      </View>

      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Your Orders</Text>
        <View style={styles.orderItem}>
          <Text style={styles.orderText}>Order #12345</Text>
          <Text style={styles.orderStatus}>Status: Shipped</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.orderText}>Order #12346</Text>
          <Text style={styles.orderStatus}>Status: Processing</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.orderText}>Order #12347</Text>
          <Text style={styles.orderStatus}>Status: Delivered</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  userInfoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetails: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  ordersSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 15,
  },
  orderItem: {
    backgroundColor: '#FAFAFA',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SimplifiedProfilePage;
