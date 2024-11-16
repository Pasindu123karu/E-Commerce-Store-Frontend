import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const AboutScreen = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://thumbs.dreamstime.com/b/wood-grain-white-texture-seamless-wooden-pattern-abstract-line-background-tree-fiber-vector-illustration-wood-grain-white-texture-320523534.jpg',
      }}
      style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>About Us</Text>

        <Image
          source={{
            uri: 'https://www.brandbucket.com/sites/default/files/logo_uploads/549171/large_trendycart_0.png',
          }}
          style={styles.logo}
        />

        <Text style={styles.subtitle}>Our Mission</Text>
        <Text style={styles.text}>
          At TrendyCart, we strive to provide an exceptional shopping experience, connecting you with the highest-quality products. Our mission is to simplify the way you explore, compare, and purchase the latest technology and gadgets, all from the convenience of your mobile device.
        </Text>

        <Text style={styles.subtitle}>What We Offer</Text>
        <Text style={styles.text}>
          Our app is designed to bring you an exclusive range of electronic products from trusted brands worldwide. With a seamless interface, secure payments, and fast delivery options, we aim to make each shopping experience easy and enjoyable.
        </Text>

        <Text style={styles.subtitle}>Why Choose Us?</Text>
        <Text style={styles.text}>
          Our team is dedicated to quality and customer satisfaction. We carefully select each product, ensuring it meets our high standards. We also offer 24/7 customer support, and our user-friendly platform is designed to make your shopping journey smooth and hassle-free.
        </Text>

        <Text style={styles.subtitle}>Contact Us</Text>
        <Text style={styles.text}>
          Have questions or need assistance? Feel free to reach out to our support team at support@trendycart.com or call us at (123) 456-7890.
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    padding: 20,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF5722',

  },
  logo: {
    width: 300,
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',

  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF5722',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
   
  },
});

export default AboutScreen;
