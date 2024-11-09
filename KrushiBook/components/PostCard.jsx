import { Alert, Share, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../constants/theme'
import { hp,wp } from '../constants/helpers/common'
import Avatar from './Avatar'
import moment from 'moment'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'expo-image'
import { getSupabaseFileUrl } from '../services/imageService'
import { Video } from 'expo-av'
import { createPostLike, removePostLike } from '../services/postService'

const PostCard = ({
    item,
    currentUser,
    router,
    hasShadow=true,

}) => {
    const shadowStyle={
        shadowOfset:{
            width:0,
            height :2
        },
        shadowOpacity:0.06,
        shadowRadius:6,
        elevation:1
    }
    const[ likes ,setLikes]= useState([]);

    useEffect(()=>{
        setLikes(item?.postLikes)
    },[]);

    const openPostDetails=()=>{

    }
    const onShare=async()=>{
        let content = {messege : item?.body}
        Share.share(content);
    }
    const onLike=async()=>{
        if(liked){
            //check liked or not 
            let updatedLikes=likes.filter(like=>like.userId!=currentUser?.id)
            setLikes([...updatedLikes])
            let res = await removePostLike(item?.id,currentUser?.id);
    
            if(!res.success)
            {
                Alert.alert( 'post','something went wrong')
            } 
        }
        else{
        let data={
            userId:currentUser?.id,
            postId:item?.id,
        }
        setLikes([...likes,data])
        let res = await createPostLike(data);

        if(!res.success)
        {
            Alert.alert( 'post','something went wrong')
        }}
    }

    const liked= likes.filter(like=>like.userId==currentUser?.id) [0] ? true : false;
    
    const created_At = moment(item?.created_at).format("MMM D");
  return (
    <View style={[styles.container,hasShadow && shadowStyle]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
            <Avatar
            size={hp(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
            />
            <View style={{gpa:2}}>
                <Text style={styles.userName}>{item?.user?.name}</Text>
                <Text style={styles.postTime}>{created_At}</Text>
            </View> 
        </View>
        <View>
         <TouchableOpacity  onPress={openPostDetails}>
            <Icon name="ellipsis-h" size={hp(3.4)} strokeWidth={3} color={theme.colors.text}/>
        </TouchableOpacity>
        </View>
      </View>
      {/*post media and content*/}
      <View style={styles.content}>
        <View style={styles.postBody}>
             <Text>{item?.body}</Text>
             {
                item?.file&& item?.file?.includes('postImages') && (
                    <Image
                    source={getSupabaseFileUrl(item?.file)}
                    transition={100}
                    style={styles.postMedia}
                    contentFit='cover'
                    />
                )
             }

             {/*post vedio*/}

             {
                item?.file && item?.file?.includes('postVideos') && (
                    <Video
                    style={[styles.postMedia,{height:hp(30)}]}
                    source={getSupabaseFileUrl(item?.file)}
                    useNativeControls
                    resizeMode=' cover'
                    isLooping 
                    />
                )
             }
        </View>
        {/* like share comment*/}
        <View style={styles.footer}>
            <View style={styles.footerButton}>
                <TouchableOpacity onPress={onLike}>
                    <Icon  name="heart-o" size={24} color={liked?theme.colors.rose:theme.colors.textLight}/>
                </TouchableOpacity>
                <Text style={styles.count}>
                    {
                        likes?.length 
                    }
                </Text>
            </View>
            <View style={styles.footerButton}>
                <TouchableOpacity>
                    <Icon  name="comments-o" size={24}  color={theme.colors.textLight}/>
                </TouchableOpacity>
                <Text style={styles.count}>
                    {
                        0
                    }
                </Text>
            </View>
            <View style={styles.footerButton}>
                <TouchableOpacity onPress={onShare}>
                    <Icon  name="share-square-o" size={24}  color={theme.colors.textLight}/>
                </TouchableOpacity>
            </View>

        </View>
      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    count:{
        color:theme.colors.text,
        fontSize:hp(1.8)
    },
    actions:{
        flexDirection:"row",
        alignItems:"center",
        gap:18
    },
    footerButton:{
        flexDirection:"row",
        marginLeft:5,
        alignItems:"center",
        gap:4,
    },
    footer:{
        alignItems:"center",
        gap:18,
        flexDirection:"row"
    },
    postBody:{
        marginLeft:5,
    },
    container:{
        gap:10,
        marginBottom:15,
        borderRadius:theme.radius.xxl*1.1,
        borderCurve:"continuous",
        padding:10,
        paddingVertical:12,
        backgroundColor:"white",
        borderWidth:0.5,
        borderColor:"#0001",
        shadowColor:"#000",
        flex:1,
    },
    header:{
       flexDirecion:"row",
        justifyContent:"space-between",
    },
    userInfo:{
        flexDirection:"row",
        alignItems:"center",
        gap:8,

    },
    userName:{
        fontSize:hp(1.7),
        color:theme.colors.textDark,
        fontWeight:theme.fonts.medium,
    },
    postTime:{
        fontSize:hp(1.4),
        color:theme.colors.textLight,
        fontWeight:theme.fonts.medium,
    },
    content:{
        gap:10,
        //marginBottom:10,
    },
    postMedia:{
        height:hp(40),
        width:"100%",
        borderRadius:theme.radius.xl,
        borderCurve:"continuous",
        marginTop:5,

    }

})