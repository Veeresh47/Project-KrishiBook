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
import { ScrollView } from 'react-native'

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

        <ScrollView style={{flex:1}}>
        <View style={{gap:15}}>
            <View style={styles.avatarContainer}>
                <Avatar 
                    uri={user?.image}
                     size={hp(24)}
                     rounded={theme.radius.xxl*3.2}
                />
                    <Pressable style={styles.editIcon} onPress={()=>{router.push('/editProfile')}}>
                    <Icon name='pencil' strokeWidth={2.5}  size={20} color={theme.colors.dark} />
                     </Pressable>
            </View>

            {/*User Info*/}
            <View style={{alignItems:'center', gap:4}}>
                <Text style={styles.userName}>{user && user?.name}</Text>
                { user && user.address &&
                <Text style={styles.infoText}>{user && user?.address}</Text> }
            </View>

            {/*User Info - email phone bio*/}
            <View style={{gap:20}}>
            <View style={styles.info}>
                 <Icon name="envelope-o" size={24} color={theme.colors.textLight}/>
                <Text style={styles.infoTech}>{user && user.email}</Text>
            </View>
            
            {
                user && user.phoneNumber &&  <View style={styles.info}>
                <Icon name="phone" size={24} color={theme.colors.textLight}/>
               
               <Text style={styles.infoTech}>{user && user.phoneNumber}</Text>
           </View>       
            }
            
            {
                user && user.bio && 
                 <View style={styles.info}>
                    {/*<Icon name="info" size={24} color={theme.colors.textLight}/>*/}
               
                     <Text style={styles.infoTech}>{user && user.bio}
                     </Text>                                                                                          
                 </View>
            }
        </View>
    
        </View>
        
        </ScrollView>
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
        marginBottom:20,
        marginHorizontal:wp(1), 
        justifyContent:'space-between',
    },
    avatarContainer:{
        height:hp(24),
        width:wp(24),
        alignSelf:'center',
        alignItems:'center',

    },
    editIcon:{
        position:'absolute',
        bottom:0,
        right:-(wp(10)),
        padding:7,
        borderRadius:theme.radius.sm,
        backgroundColor:"white",
        shadowColor:theme.colors.textLight,
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.5,
        shadowRadius:5,
        elevation:7,
        
    },
    infoTech:{
        fontSize:hp(2.5),
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
        marginRight:wp(1),
    },
    info:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    userName:{
        fontSize:hp(3.5),
        fontWeight:'semiBold',
        color:theme.colors.text,
    },

})