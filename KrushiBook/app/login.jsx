import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Pressable } from 'react-native'
import { FaXmark } from "react-icons/fa6";


const login = () => {
  return (
    <ScreenWrapper>
      <Pressable>
      <FaXmark strokeWidth={4} width={100}/>
      </Pressable>
     
      <Pressable>
        <Text >login</Text>
      </Pressable>
    </ScreenWrapper>
  )
} 

export default login

const styles = StyleSheet.create({})