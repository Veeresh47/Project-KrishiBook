import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Header from "../../components/Header";
import ScreenWrapper from '../../components/ScreenWrapper';
import { hp, wp } from '../../constants/helpers/common';
import { theme } from '../../constants/theme';
import { Image } from 'expo-image';
import Button from '../../components/Button';

const Machines = () => {
  const handleBuyOrRent = (machineName) => {
    Alert.alert(
      "Choose an option",
      `Would you like to Buy or Rent the ${machineName}?`,
      [
        {
          text: "Buy", 
          onPress: () => Alert.alert(`${machineName} selected for Buy.`)
        },
        {
          text: "Rent", 
          onPress: () => Alert.alert(`${machineName} selected for Rent.`)
        },
        {
          text: "Cancel", 
          style: "cancel"
        }
      ]
    );
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header title="Machines" mb={10} />
        </View>
        <ScrollView>
          <View style={styles.imageCard}>
            <Image 
              source={require('/Users/ghost/Desktop/Project-KrishiBook/KrushiBook/assets/images/spray1.jpeg')} 
              style={styles.image}
            />
            <Button 
              title="Buy or Rent" 
              onpress={() => handleBuyOrRent("Sprayer 1")}
              buttonStyle={styles.button}
            />
          </View>
          <View style={styles.imageCard}>
            <Image 
              source={require('/Users/ghost/Desktop/Project-KrishiBook/KrushiBook/assets/images/machine5.jpeg')} 
              style={styles.image}
            />
            <Button 
              title="Buy or Rent" 
              onpress={() => handleBuyOrRent("Machine 5")}
              buttonStyle={styles.button}
            />
          </View>
          <View style={styles.imageCard}>
            <Image 
              source={require('/Users/ghost/Desktop/Project-KrishiBook/KrushiBook/assets/images/machine2.jpeg')} 
              style={styles.image}
            />
            <Button 
              title="Buy or Rent" 
              onpress={() => handleBuyOrRent("Machine 2")}
              buttonStyle={styles.button}
            />
          </View>
          <View style={styles.imageCard}>
            <Image 
              source={require('/Users/ghost/Desktop/Project-KrishiBook/KrushiBook/assets/images/machine1.jpeg')} 
              style={styles.image}
            />
            <Button 
              title="Buy or Rent" 
              onpress={() => handleBuyOrRent("Machine 1")}
              buttonStyle={styles.button}
            />
          </View>
          <View style={styles.imageCard}>
            <Image 
              source={require('/Users/ghost/Desktop/Project-KrishiBook/KrushiBook/assets/images/spray2.jpeg')} 
              style={styles.image}
            />
            <Button 
              title="Buy or Rent" 
              onpress={() => handleBuyOrRent("Sprayer 2")}
              buttonStyle={styles.button}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Machines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: wp(1), 
    justifyContent: 'space-between',
  },
  imageCard: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: theme.radius.xl,  // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4, // Add elevation for Android shadow
    overflow: 'hidden',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: hp(30),
    resizeMode: 'cover',
  },
  button: {
    width: wp(60),
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: theme.colors.primary,  // Customize button color
  },
});
