import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../constants/helpers/common'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../contexts/AuthContext'
import RichTextEditor from '../../components/RichTextEditor'
import { useRouter } from 'expo-router'

const newPost = () => {

  const {user} = useAuth();
  const router=useRouter();
  const editorRef=useRef(null);
  const bodyRef=useRef();
  const [loading,setLoading]=useState(false);
  const [file,setFile]=useState(file);


  return (
    <ScreenWrapper bg="white">
        <View style={styles.container}>
        <Header title="Create post"  />
          <ScrollView contentContainerStyle={{gap:20}}>
          
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

            <View style={styles.textEditor}>
                <RichTextEditor editorRef={editorRef} onChange={body=>bodyRef.current=body}/>
            </View>
          </ScrollView>
        </View>
    </ScreenWrapper>
  )
}

export default newPost

const styles = StyleSheet.create({
  imageIcon :{
    //backgroundColor:theme.colors.gray,
    borderRadius : theme.radius.md,
    //padding:6,
  },
  file : {
    height:hp(30),
    width:"100%",
    borderRadius : theme.radius.xl,
    overflow : "hidden",
    borderCurve: "continuous",

  },
  video:{
    position :"absolute",
    top:10,
    right : 10,
    //shadowColor: theme.colors.textLight,
   // shadowOffset:{width :0, height :3},
   // shadowRadius:8,
    //shadowOpacity:0.6,

  },
  container:{
    flex:1,
    //backgroundColor:"red",
    marginBottom:30,
    gap:15,
    paddingHorizontal:wp(4),

  },
  title:{
    //marginBottom:10,
    fontSize:hp(2.5),
    textAlign:"center",
    fontWeight:theme.fonts.semiBold,
    color:theme.colors.text,
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    gap:12,

  },
  addImageText:{
    fontSize:hp(1.9),
    fontWeight:theme.fonts.semiBold,
    color:theme.colors.text,
  },
  userName:{
    fontSize:hp(2.2),
    fontWeight:theme.fonts.semiBold,
    color:theme.colors.text,
  },
  avatar:{
    height:hp(6.5),
    width:hp(6.5),
    borderRadius:theme.radius.xl,
    borderCurve:"continuous",
    borderWidth:1,
    borderColor:"rgb(0,0,0,0.1)",

  },
  publicText:{
    fontSize:hp(1.7),
    flexDirection:"row",
    fontWeight:theme.fonts.medium,
    color:theme.colors.textLight,
  },
  textEditor:{
    //marginTop:10,
  },
  media:{
    flexDirection:"row",
    justifycontent:"center",
    alignItems:"center",
    borderWidth:1.5,
    padding :12,
    paddingHorizontal:18,
    borderRadius:theme.radius.xl,
    borderCurve:"continuous",
    borderColor:theme.colors.gray,
  },

})