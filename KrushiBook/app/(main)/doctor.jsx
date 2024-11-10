import { Alert, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import ScreenWrapper from '../../components/ScreenWrapper';
import { wp } from '../../constants/helpers/common';
import { theme } from '../../constants/theme';
import axios from 'axios';

const cropProblems = [
  { name: "Pest Infestation", id: 1 },
  { name: "Nutrient Deficiency", id: 2 },
  { name: "Watering Issues", id: 3 },
  { name: "Diseases", id: 4 },
];

const doctor = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const weatherApiKey = 'YOUR_OPENWEATHER_API_KEY';
  const city = 'YOUR_CITY'; // Replace with the city where the crops are grown

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Unable to fetch weather data.');
    }
  };

  const handleProblemPress = (problemName) => {
    Alert.alert(`Selected Problem: ${problemName}`, "You can get expert advice on this issue.");
  };

  return (
    <ScreenWrapper>
      <View style={styles.headerContainer}>
        <Header title={"Dr. Agro - Crop Doctor"} mb={10} />
      </View>
      <View style={styles.container}>
        <Text style={styles.description}>
          Welcome to Dr. Agro, your personal crop doctor. Select a crop issue below to get advice on how to treat or prevent it.
        </Text>
        {/* Weather Forecast */}
        <View style={styles.weatherContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <>
              <Text style={styles.weatherTitle}>Current Weather</Text>
              <Text style={styles.weatherText}>Temperature: {weather?.main?.temp}°C</Text>
              <Text style={styles.weatherText}>Condition: {weather?.weather[0]?.description}</Text>
              <Text style={styles.weatherText}>Humidity: {weather?.main?.humidity}%</Text>
            </>
          )}
        </View>
        <View style={styles.problemsContainer}>
          {cropProblems.map((problem) => (
            <TouchableOpacity
              key={problem.id}
              style={styles.problemItem}
              onPress={() => handleProblemPress(problem.name)}
            >
              <Text style={styles.problemText}>{problem.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        
      </View>
    </ScreenWrapper>
  );
};

export default doctor;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: wp(1),
    justifyContent: 'space-between',
  },
  container: {
    gap: 10,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: "continuous",
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#0001",
    shadowColor: "#000",
    flex: 1,
    paddingHorizontal: wp(4),
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  problemsContainer: {
    gap: 15,
  },
  problemItem: {
    paddingVertical: 12,
    paddingHorizontal: wp(4),
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    borderWidth: 0.5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  problemText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  weatherContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.xl,
    borderWidth: 0.5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 5,
  },
});
