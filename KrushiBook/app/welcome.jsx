import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { hp, wp } from '../constants/helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { StatusBar } from 'react-native-web'
import { useRouter } from 'expo-router'


const welcome = () => {
  const router= useRouter();  
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark"/>
      <View style={styles.container}> 
        
        {/*welcome image*/}
        <Image source={require('../assets/images/image.png')} />

        {/*welcome text*/}
        <View style={{gap:20}}>
            <Text style={styles.title}>KrushiBook</Text>
            <Text style={styles.punchline}>Connect, Learn and Grow</Text>

        </View>
      </View>
      {/*footer*/}
      <View style={styles.footer}>
        <Button 
        title="Getting Started"
        buttonStyle={{marginHorizontal:wp(3)}}  
        onpress={()=>{router.push('/signUp')}}
        />
        <View style={styles.bottomTextContainer}>
          <Text style={[styles.loginText, {color:theme.colors.primaryDark, fontWeight:theme.fonts.semiBold}]}>Already have an account!</Text>
          <Pressable onPress={()=>{router.push('/login')}}>
            <Text style={styles.loginTex}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: wp(4),
  },
  welcomeImage: {
    width: wp(100),
    height: hp(60),
  },
  title:{
    color:theme.colors.primary,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight:theme.fonts.extraBold,
  },
  punchline:{
    color: theme.colors.gray,
    fontSize: hp(2),
    textAlign: 'center',
    marginHorizontal: wp(10),

  },
  footer:{
    gap:30,
    width: '100%',
  },
  bottomTextContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:5,
  },
  loginText:{
    color:theme.colors.gray,
    fontSize:hp(1.5),
  },
}) 