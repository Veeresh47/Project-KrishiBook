import { Alert, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import Header from "../../components/Header";
import ScreenWrapper from '../../components/ScreenWrapper';
import { hp, wp } from '../../constants/helpers/common';
import { theme } from '../../constants/theme';

const agricultureWebsites = [
  // National and Indian Government Websites
  { name: "National Agriculture Market (eNAM)", url: "https://www.enam.gov.in" },
  { name: "Indian Council of Agricultural Research (ICAR)", url: "https://icar.org.in" },
  { name: "Ministry of Agriculture & Farmers Welfare", url: "https://agricoop.nic.in" },
  { name: "Indian Agricultural Statistics Research Institute (IASRI)", url: "https://www.iasri.res.in" },
  { name: "National Horticulture Board", url: "https://nhb.gov.in" },
  { name: "Agricultural and Processed Food Products Export Development Authority (APEDA)", url: "https://apeda.gov.in" },
  { name: "National Bank for Agriculture and Rural Development (NABARD)", url: "https://www.nabard.org" },

  // Karnataka Government Websites
  { name: "Department of Agriculture, Karnataka", url: "https://www.agri.kar.nic.in" },
  { name: "Karnataka State Agricultural Marketing Board", url: "https://ksamb.in" },
  { name: "Karnataka State Horticulture Department", url: "https://www.horticulture.kar.nic.in" },
  { name: "Karnataka Cooperative Milk Producers Federation", url: "https://www.kmfnandini.coop" }
];

const openWebsite = (url) => {
  Linking.openURL(url).catch(() => {
    Alert.alert("Unable to open URL");
  });
};

const Machines = () => {
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header title="Govt. Services" mb={10} />
        </View>

        {/* Websites List */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {agricultureWebsites.map((site, index) => (
            <TouchableOpacity key={index} style={styles.siteLink} onPress={() => openWebsite(site.url)}>
              <Text style={styles.siteText}>{site.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Machines;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: wp(1),
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
  },
  galleryContainer: {
    marginBottom: 20,
    gap: 10,
  },
  galleryImage: {
    width: wp(20),
    height: hp(12),
    borderRadius: theme.radius.xl,
    marginRight: 10,
    backgroundColor: '#ddd',
    marginBottom:18,
  },
  siteLink: {
    paddingVertical: 15,
    paddingHorizontal: wp(4),
    marginBottom: 10,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    borderWidth: 0.5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  siteText: {
    color: theme.colors.primary,
    fontSize: hp(2.2),
    fontWeight: 'bold',
  },
});
