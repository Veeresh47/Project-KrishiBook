import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import Button from '../../components/Button'

const onLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}
const home = () => {
    const router=useRouter();
  return (
    <ScreenWrapper>
      <Text>home</Text>
      <Button title="Logout" onPress={onLogout}/>
    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({})