import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import Button from '../../components/Button'
import {useAuth} from '../../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { theme } from '../../constants/theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { hp, wp } from '../../constants/helpers/common'
import Avatar from '../../components/Avatar'



const home = () => {
  
    const {user,setAuth}=useAuth();
    console.log('user',user);
    //console.log('user',user?.name);
    const router =useRouter();
    
    const onLogout = async() => {
      //setAuth(null);
      const {error}=await supabase.auth.signOut();
      if(error){
        Alert.alert('Error',error.message)
      }
    }
    
  return (
    <ScreenWrapper>
     <View style={styles.container}>
      {/*Header*/}
     <View style={styles.header}>
     <Text style={styles.title}>KrishiBook</Text>
        <View style={styles.icons}>
       
            <Pressable onPress={()=>router.push('/notifications')}>
            <Icon name="heart-o" size={hp(3.2)} strokeWidth={2.4   } color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={()=>router.push('/newPost')}>
            <Icon name="plus-square-o" size={hp(3.8)} strokeWidth={1} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={()=>router.push("/profile")}>
            <Avatar
               uri={user?.image}
               size={hp(4.3)}
               rounded={theme.radius.sm}
                style={{borderWidth:2}}
            />
            </Pressable>            
          </View>
        </View>
    </View>
    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizantal:wp(4),
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10,
    marginHorizontal:wp(4),
  },
  title:{
    color:theme.colors.text,
    fontSize:hp(3.3),
    fontWeight:theme.fonts.bold,
    marginRight:wp(20 ),
  },
  avatarImage:{
    height:hp(4.3),
    width:hp(4.3),
    borderRadius:theme.radius.sm,
    borderCurve:c='coninueous',
    borderColor:theme.colors.gray,
    borderWidth:3,
  },
  icons:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:18,

  },
  lifeStyle:{
    paddingTop:20,
    paddingHorizontal:wp(4),
  },
  noPosts:{
    fontSize:hp(2),
    TextAlign:'center',
    color:theme.colors.text,
  },
  pill:{
    position:'absolute',
    right:-10,
    top:-4,
    height:hp(2.2),
    width:hp(2.2),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    backgroundColor:theme.colors.roseLight,

  },
  pillText:{
    color:'white',
    fontSize:hp(1.2),
    fontWeight:theme.fonts.bold,
  },

})