import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const signup = () => {
  return (
    <ScreenWrapper>
      <Text style={styles.h}>signup</Text>
    </ScreenWrapper>
  )
}

export default signup

const styles = StyleSheet.create({
    h:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    }
})