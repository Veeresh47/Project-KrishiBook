import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../../components/ScreenWrapper';
import { supabase } from '../lib/supabase';
import BackButton from '../../components/BackButton';
import {hp,wp} from '../../constants/helpers/common'

const settings = () => {
    const router=useRouter();
    const onLogout=async()=>{
        const{error}=await supabase.auth.signOut();
        if(error)
        {
            Alert.alert('Sign out', "Error signing out!")
        }
    }
    const handalLogout=async()=>{
        Alert.alert("confirm","Are you sure you want to LogOut?",[
           { text :'Cancel',
            onPress :()=> console.log('model cancel'),
            style :'cancel'
     },
    {
        text:"LogOut",
        onPress:()=>onLogout(),
        style:'destructive',
    } ])

    }
  return (
    <ScreenWrapper>
        <View style={styles.container}>
        <View style={styles.header}>
        <BackButton router={router}/>
      <Text style={styles.title}>settings</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handalLogout}>
        <Icon name="times" size={26}color={theme.colors.rose}/>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Icon name="pencil"/>
      </View>
    </ScreenWrapper>
  )
}

export default settings

const styles = StyleSheet.create({
    logoutButton:{
        flexDirection:'row',       
    },
    title:{
        fontSize:hp(3.2),
        fontWidth:wp(55),
        fontWeight:theme.fonts.semiBold,
        color:theme.colors.textDark,
        marginLeft:wp(10),

    },
    header:{
        flexDirection:'row',
    }

})