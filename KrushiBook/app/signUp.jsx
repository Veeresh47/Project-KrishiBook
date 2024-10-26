import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {wp,hp} from "../constants/helpers/common"
import ScreenWrapper from '../components/ScreenWrapper'
import { FaXmark } from "react-icons/fa6";

const signup = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <FaXmark strokeWidth={4}/>
        <Text>signup</Text>
      </View>
    </ScreenWrapper>
  )
}

export default signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})