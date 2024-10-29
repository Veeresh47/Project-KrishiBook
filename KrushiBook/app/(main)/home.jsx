import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import Button from '../../components/Button'
import {useAuth} from '../../contexts/AuthContext'
import { supabase } from '../lib/supabase'


const home = () => {
    const {user,setAuth}=useAuth();
    console.log('user',user);
    const router=useRouter();
    
    const onLogout = async() => {
      //setAuth(null);
      const {error}=await supabase.auth.signOut();
      if(error){
        Alert.alert('Error',error.message)
      }
    }
  return (
    <ScreenWrapper>
      <Text>home</Text>
      <Button title="Logout" onpress={onLogout}/>
    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({})