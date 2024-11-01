import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { ScrollView } from 'react-native'
import  Header  from '../../components/Header'
import { wp,hp } from '../../constants/helpers/common'
import { theme } from '../../constants/theme'
import { Image } from 'expo-image'
import  {getUserImageSrc}  from '../../services/imageService'
import { useAuth } from '../../contexts/AuthContext'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Pressable } from 'react-native'
import Input from '../../components/Input'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import { updateUser } from '../../services/userService'
import { useRouter } from 'expo-router'
import { supabase } from '../lib/supabase'


const editProfile = () => {
    const router=useRouter();
    const {user: currentUser}=useAuth();
    const [loading,setLoading]=useState(false);
    
    
    const onPickImage=async()=>{
        
    }
const onUpdate=async()=>{
    const {data:profiles,error}= await supabase
    .from('profiles')
    .select(name)


    let userData={...user};
    let {name,phoneNumber,bio,address}=userData;
    if(!name || !phoneNumber || !bio || !address){
        Alert.alert("Profile","Please fill all fields")
        return;
    }
    setLoading(true);

    //user update
    const res=await updateUser(currentUser?.id,userData);

    setLoading(false);
   Alert.alert("Profile is updated");

     
}
    const [user,setUser]=useState({
        name:'',
        phoneNumber:'',
        bio:'',
        image:null,
        address:'',
    })
    useEffect(()=>{
         if(currentUser){
            setUser({
                name:currentUser.name ||'',
                phoneNumber:currentUser.phoneNumber || '',
                bio:currentUser.bio || '',
                image:currentUser.image || '',
                address:currentUser.address || '',
            })
         }
    },[currentUser])

  return (
    <ScreenWrapper bg="white">
        <View style={styles.container}>
       
            <ScrollView style={{flex:1}}>
            <Header title="Edit Profile" mb={2}/>


                {/*User Info*/}
                 <View style={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            uri={user?.image}
                             size={hp(24)}
                            rounded={theme.radius.xxl*1.4}
                        />
                        <Pressable style={styles.cameraIcon}>
                            <Icon name='camera'size='26' strokeWidth={2.5}/>
                        </Pressable>
                    </View>
                    <Text style={{fontSize:hp(1.5), color:theme.colors.textLight}}>
                        Please fill your profile information
                    </Text>
                    <Input 
                           icon={ <Icon name="user" size={26} strokeWidth={1.6} /> }
                             placeholder="Enter your Name"
                             value={user.name}
                           onChangeText={value=>setUser({...user,name:value})}
                    />

                     <Input 
                            icon={ <Icon name="phone" size={24} strokeWidth={1.6} /> }
                            placeholder="Enter your phone number"
                            value={user.phoneNumber}
                            onChangeText={value=>setUser({...user,phoneNumber:value})}
                      />

                     <Input 
                         icon={ <Icon name="map-marker" size={24} strokeWidth={1.6} /> }
                        placeholder="Enter your address"
                        value={user.address}
                         onChangeText={value=>setUser({...user,address:value})}
                      />
                       <Input 
                        placeholder="Enter your Bio"
                        value={user.bio}
                        multiLine={true}
                        containerStyle={styles.bio }
                         onChangeText={value=>setUser({...user,bio:value})}
                      />
                       <Button title={"Update"} loading={loading} onpress={onUpdate}/>
                 </View>
                
            </ScrollView>
            
        </View>
    </ScreenWrapper>
  )
}

export default editProfile

const styles = StyleSheet.create({
    bio:{
        flexDirection:'row',
        height:hp(15),
        alignItems:'flex-start',
        paddingVertical:15,

    },
    container:{
        flex:1,
        paddingHorizontal:wp(4),

    },
    avatar:{
        width:'100%',
        height:'100%',
        borderRadius:theme.radius.xxl*1.8,
        borderCurve:"continuous",
        borderWidth:1,
        borderColor:theme.colors.darkLight,

    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingVertical:hp(6),
        flexDirection:'column',
        gap:18,
    },
   input:{
    flexDirection:'row',
    borderWidth:0.4,  
    borderColor:theme.colors.textLight,
    borderRadius:theme.radius.xxl,
    padding:17,
    paddingHorizontal:20,
    gap:15,

   },
    avatarContainer:{
        height:hp(24),
        width:wp(24),
        alignSelf:'center',
        alignItems:'center',
    },
    cameraIcon:{
        position:'absolute',
        bottom:0,
        right:-(wp(16)),
        padding:7,
        borderRadius:50,
        backgroundColor:"white",
        shadowColor:theme.colors.textLight,
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.5,
        shadowRadius:5,
        elevation:7,
        
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