import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
   <Stack
   screenoptions={{
    headerShown:false    
    }}
   />
  )
}

export default _layout