import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../constants/helpers/common'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as ImagePicker from 'expo-image-picker';
import {Image} from "expo-image";
import { getSupabaseFileUrl } from '../../services/imageService'
import {Video} from 'expo-av';
import { createOrUpdatePost } from '../../services/postService'

const newPost = () => {

  const {user} = useAuth();
  const router=useRouter();
  const [loading,setLoading]=useState(false);
  const [file,setFile]= useState(file);
  const discRef=useRef("");
  

  const onPick=async(isVideo)=>{

    let mediaConfig 

    if(isVideo){
      mediaConfig = {
      mediaTypes:ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality :0.9,
    }
  }
  else{
    mediaConfig = {
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[4,5],
      quality :0.7,
    }
  }


    let result = await ImagePicker.launchImageLibraryAsync({mediaConfig});


    if(!result.canceled)
    {
      setFile(result.assets[0]);
    }
  
  }

  const isLocalFile =file=>{
    if(!file) return null;
    if(typeof file =="object") return true;

    return false;

  }

  const getFileType= file =>{
    if(!file) return null;
    if(isLocalFile(file)){
      return file.type;
    }

    if(file.include('postImages')){
      return 'image';
    }
    return 'vedio';
  }

  const getFileUri= file =>{
    if(!file) return null;
    if(isLocalFile(file)) {
      return file.uri;
    }

    return getSupabaseFileUrl(file)?.uri;
  }
  
  
  const onSubmit=async()=>{

    if(!discRef.current && !file){
      Alert.alert("Post","please fill any filed")
    }
    

    let data={
      file,
      body:discRef?.current,
      userId:user?.id
    }
    //post
    setLoading(true);

    let res = await createOrUpdatePost(data);

    setLoading(false);

    if(res.success){
      setFile(null);
      discRef.current="";
      router.back();
    }
    else{
      Alert.alert("Post,",res.msg);

    }
    console.log("res ",res);
     

  }

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
      
      <ScrollView contentContainerStyle={{gap:30}}>
      
      <Header title="Create post"/>
        {/*avatar*/}
              <View style={styles.header}>
                  <Avatar
                      uri={user?.image}
                      size={hp(6.5)}
                      rounded={theme.radius.xl}
                  />
                  <View style={{gap:2}}>
                    <Text style={styles.userName}>{user && user?.name}</Text>
                    <Text style={styles.publicText}>{user && user?.address}</Text>
                  </View>
              </View>
              <View>
              <Input 
                  placeholder="whats on your mind?"
                  multiline
                  containerStyle={styles.bio }
                  onChangeText={value=>discRef.current=value}
                  />
                  </View>
                  {
                    file && (
                      <View style={styles.file}>
                          {
                            getFileType(file) == "video" ?(
                              <Video
                              style={{flex:1}}
                              source={{uri: getFileUri(file)}}
                              useNativeControls
                              resizeMode='cover'
                              isLooping
                              />
                            ):(
                              <Image source={{uri: getFileUri(file)}} 
                              resizeMode='cover'
                              style={{flex:1}}/>
                            )
                          }
                          <Pressable style={styles.closeIcon} onPress={()=>setFile(null)}>
                            <Icon name="times-circle" color="white" size={22}/>
                          </Pressable>
                      </View>
                    )
                  }
                <View style={styles.media}>
              <Text style={styles.addImageText}>Add to your post</Text>
              <View style={styles.mediaIcons}>
                <View>
                <TouchableOpacity onPress={()=>onPick(false)}>
                <Icon name="image" size={hp(3.8)} strokeWidth={1} color={theme.colors.textDark}/>
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity onPress={()=>onPick(true)}>
                <Icon name="video-camera" size={hp(3.8)} strokeWidth={1} color={theme.colors.textDark}/>
                </TouchableOpacity>
                </View>
              </View>
              </View>
              <Button title={"Post"} loading={loading} onpress={onSubmit}
              hasShadow={false}
              buttonStyle={{height:hp(6.2)}}
              />
      </ScrollView>
    
      </View>
      
    </ScreenWrapper>
    
  )
}

export default newPost

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:wp(4),
},
file : {
  height:hp(30),
  width:"100%",
  borderRadius : theme.radius.xl,
  overflow : "hidden",
  borderCurve: "continuous",

},
header:{
    flexDirection:"row",
    alignItems:"center",
    gap:12,
},
bio:{
  flexDirection:'row',
  height:hp(15),
  alignItems:'flex-start',
  paddingVertical:15,
},
mediaIcons:{
  flexDirection:"row",
  gap:20,
  alignItems:"center",
},
addImageText:{
  fontSize:hp(1.9),
  fontWeight:theme.fonts.semiBold,
  color:theme.colors.text,
  marginRight:wp(30),
},
closeIcon:{
  position:"absolute",
  top:10,
  right:10,
  padding:7,
  backgroundColor:"rgba(240,0,0,0.3)",
  borderRadius:50,

},
media:{
  flexDirection:"row",
  justifycontent:"space-between",
  alignItems:"center",
  borderWidth:1.5,
  padding :12,
  paddingHorizontal:18,
  borderRadius:theme.radius.xl,
  borderCurve:"continuous",
  borderColor:theme.colors.gray,
},

})