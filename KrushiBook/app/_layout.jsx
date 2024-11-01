import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from './lib/supabase'
import { AuthProvider } from '../contexts/AuthContext'
import { useRouter } from 'expo-router'
import { getUserData } from '../services/userService'


const _layout = () => {
  return (
    <AuthProvider>
    <MainLayout/>
    </AuthProvider>
  )
}


const MainLayout = () => {
  const {setAuth,setUserData} = useAuth ();
  const router= useRouter();

  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event,session)=>{
      
      if(session){
        setAuth(session?.user);
       
        updateUserData(session?.user,session?.user?.email);
        router.replace('/home')
      }
      else{
      setAuth(null);
      router.replace('/welcome')
      }  
  })
 },[]);

 const updateUserData= async(user,email) => {
  
   let res = await getUserData(user?.id);
   console.log("sesion user data : ",res)
   if(res.success) setUserData({...res.data,email});
   
   
 }
 
  return (
   <Stack
   screenOptions={{
    headerShown:false,    
    }}
   />
  )
}

export default _layout