import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from "../../components/Header";
import { wp, hp } from '../../constants/helpers/common'; // Import width/height scaling helper
import { theme } from '../../constants/theme';

const marketplaceItems = [
  { id: 1, name: "Wheat", price: "₹500", image: require("../../assets/images/wheat.jpeg") },
  { id: 2, name: "Rice", price: "₹600", image: require("../../assets/images/rice.jpeg") },
  { id: 3, name: "Tomato", price: "₹40", image: require("../../assets/images/tomoto.jpeg") },
  { id: 4, name: "Pesticide X", price: "₹200", image: require("../../assets/images/pesticides.jpeg") },
  { id: 5, name: "Fertilizer A", price: "₹300", image: require("../../assets/images/fertilizer.jpeg") },
  { id: 6, name: "Tractor", price: "₹150000", image: require("../../assets/images/tractor.jpeg") },
  { id: 7, name: "Sprayer", price: "₹8000", image: require("../../assets/images/sprayer.jpeg") },
  { id: 8, name: "Pump", price: "₹2500", image: require("../../assets/images/pump.jpeg") },
  { id: 9, name: "Sickle", price: "₹100", image: require("../../assets/images/sickle.jpeg") },
  { id: 10, name: "Watering Can", price: "₹250", image: require("../../assets/images/waering_can.jpeg") },
  { id: 11, name: "Corn", price: "₹300", image: require("../../assets/images/corn.jpeg") },
  { id: 12, name: "Barley", price: "₹400", image: require("../../assets/images/barley.jpeg") },
];

const market = () => {
  const handleItemPress = (itemName) => {
    Alert.alert("Item clicked", `You have selected ${itemName}`);
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.headerContainer}>
        <Header title="Marketplace for Farmers" mb={10} />
      </View>
      
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        {marketplaceItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <TouchableOpacity onPress={() => handleItemPress(item.name)}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default market;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: wp(1),
    justifyContent: 'space-between',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  itemCard: {
    width: wp(45), // Adjust the width of each item
    marginBottom: 20,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemImage: {
    width: wp(40),
    height: hp(20),
    borderRadius: theme.radius.xl,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: 5,
  },
});
