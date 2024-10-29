import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from './lib/supabase'
import { AuthProvider } from '../contexts/AuthContext'
import { useRouter } from 'expo-router'


const _layout = () => {
  return (
    <AuthProvider>
    <MainLayout/>
    </AuthProvider>
  )
}


const MainLayout = () => {
  const {setAuth} = useAuth ();
  const router= useRouter();

  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event,session)=>{
      console.log('session user',session?.user.email)
      if(session){
        setAuth(session.user);
        router.replace('/home')
      }
      else{
       setAuth(null);
        router.replace('/welcome')
      }  
  })
 },[])
 
  return (
   <Stack
   screenOptions={{
    headerShown:false,    
    }}
   />
  )
}

export default _layout