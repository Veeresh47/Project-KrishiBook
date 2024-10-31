import { Pressable, StyleSheet, Text, TouchableOpacityComponent, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'expo-router'
import Header from '../../components/Header'
import { hp,wp } from '../../constants/helpers/common'
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../constants/theme';
import { TouchableOpacity } from 'react-native'
import SettingButton from '../../components/SettingButton'
import Avatar from '../../components/Avatar'


const profile = () => {
    const {user,setAuth}=useAuth();
    const router=useRouter();
  return (
    <ScreenWrapper bg="white">
        <UserHeader user={user} router={router}/>
    </ScreenWrapper>
  )
}

const UserHeader=({user,router})=>{
    return(
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:wp(4)}}>
            <View style={styles.headerContainer}>
            <Header title={"Profile"} mb={10}/>
            <TouchableOpacity style={styles.settingButton} >
            <SettingButton />
            </TouchableOpacity>
        </View>
        <View style={{gap:15}}>
            <View style={styles.avatarContainer}>
                <Avatar 
                     uri={user?.image}
                     size={hp(22)}
                     rounded={theme.radius.xxl*1.4}
                />
                    <Pressable style={styles.editIcon}>
                    <Icon name='pencil' strokeWidth={3}  size={35} color={theme.colors.dark} />
                     </Pressable>
            </View>
        </View>

        </View>

    )
}

export default profile

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    headerShape:{
        flex:1,
        width:wp(100),
        height:hp(20),
    },
    headerContainer:{
        flexDirection:'row',
       // flex:1,
        marginBottom:20,
        marginHorizontal:wp(4), 
    },
    avatarContainer:{
        height:hp(22),
        width:wp(14),
        alignSelf:'center',
        alignItems:'center',
    },
    editIcon:{
        position:'absolute',
        bottom:0,
        left:99,
        padding:7,
        borderRadius:45,
        backgroundColor:"#f9f3f2",
        shadowColor:theme.colors.textLight,
        shadowOffset:{width:0,height:4},
        shadowRadius:5,
        elevation:5,
        width:48,
    },
    infoTech:{
        fontSize:hp(1.6),
        fontWeight:'500',
        color:theme.colors.textLight,

    },
    noPosts:{
        fontSize:hp(2),
        textAlign:'center',
        color:theme.colors.text,
    },
    lifeStyle:{
        paddingHorizontal:wp(4),
        paddingBottom:30,
    },
    settingButton:{
        padding:5,
        position:'absolute',
        right: 0,
        borderRadius:theme.radius.sm,
        backgroundColor:'white',

    },


})