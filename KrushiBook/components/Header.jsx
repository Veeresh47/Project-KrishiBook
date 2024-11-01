import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import BackButton from './BackButton'
import { theme } from '../constants/theme'
import { hp ,wp} from '../constants/helpers/common'

const Header = ({title, showBackButon=true, mb=10}) => {
    const router=useRouter();
  return (
    <View style={[styles.container,{marginBottom : mb}]}>
        {
            showBackButon && (
                <View style={styles.backButton}>
                <BackButton router={router}/>
                </View>
            )
        }
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flex : 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        gap:18,
    },
    title:{
        fontSize:hp(2.8),
        fontWeight:theme.fonts.semiBold,
        color:theme.colors.textDark,
    },
    backButton:{
        position:'absolute',
        left:0,
    },
})