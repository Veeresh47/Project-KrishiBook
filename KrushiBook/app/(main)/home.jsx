import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useRouter } from 'expo-router'
import Button from '../../components/Button'
import {useAuth} from '../../contexts/AuthContext'
import { supabase, supabaseAnonKey } from '../lib/supabase'
import { theme } from '../../constants/theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { hp, wp } from '../../constants/helpers/common'
import Avatar from '../../components/Avatar'
import { fetchPosts } from '../../services/postService'
import PostCard from '../../components/PostCard'
import Loading from '../../components/Loading'
import {getUserData} from "../../services/userService"
import { TouchableOpacity } from 'react-native'

var limit =0; 

const home = () => {
  
    const {user,setAuth}=useAuth();
    //console.log('user',user);
    //console.log('user',user?.email);
    const router =useRouter();
    const [hasMore, setHasMore]=useState(true);

    const [posts,setPosts]=useState([]);
    const handlePostEvent= async(payload)=>{

      if(payload.eventType == "INSERT" &&  payload?.new?.id){
        let newPost={...payload.new};
        let res= await getUserData(newPost.userId);
        newPost.user=res.success? res.data:{};
        setPosts(prevPosts=>[newPost,...prevPosts])
      }

    }
    useEffect(()=>{
      let postChannel =supabase
      .channel("posts")
      .on("postgres_changes", {event :'*',schema:"public", table:"posts"}, handlePostEvent)
      .subscribe();
       

      //getPosts();

      return () =>{
        supabase.removeChannel(postChannel);
      }
    },[])

    const getPosts=async ()=>{
      //call the api here
      if(!hasMore) return null;
      limit = limit + 4;
      let res= await fetchPosts(limit);
       if(posts.length==res.data.length) setHasMore(false);
      setPosts(res.data);
       

    }
    
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
      <View style={{marginRight:5}}>
     <Icon name="leaf" size={hp(3.8)} strokeWidth={1} color={theme.colors.primary}/>
     </View>
     <Text style={styles.title}>KrishiBook</Text>
        <View style={styles.icons}>
       
            
            <Pressable onPress={()=>router.push('/newPost')}>
            <Icon name="plus-square-o" size={hp(3.8)} strokeWidth={1} color={theme.colors.textDark}/>
            </Pressable>
            <Pressable onPress={()=>router.push('/notifications')}>
            <Icon name="bell-o" size={hp(3.3)} strokeWidth={3.2} color={theme.colors.textDark}/>
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

        {/* posts */}
        <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lifeStyle}
        keyExtractor={item=>item.id.toString()}
        renderItem={({ item })=> <PostCard
        item={item}
        currentUser={user}
        router={router}
        />
        
  }
  onEndReached={()=>{
    getPosts();
  }}
  onEndReachedThreshold={0}
  ListFooterComponent={hasMore?(
    <View style={{marginVertical:posts?.length==0? 200:30}}>
      <Loading/>
    </View>
  ):(
    <View style={{marginVertical:20}}>
    <Text style={styles.noPosts}>NO More posts</Text>
    </View>
  )}
  />
      

    </View>
    <View style={styles.footer}>
    <TouchableOpacity onPress={()=>router.push('/machines')}>
      <Icon name="cogs" size={24}/>
      <Text style={{fontSize:hp(1.6),alignItems:'center'} }>Machines</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/govt')}>
      <Icon name="institution" size={25}/>
      <Text style={{fontSize:hp(1.6),alignItems:'center'}}>Govt</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.replace("home")}>
      <Icon name="home" size={32}/>
      <Text style={{fontSize:hp(1.6),alignItems:'center'}}> Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/doctor')}>
      <Icon name="user-md" size={28}/>
      <Text style={{fontSize:hp(1.6),alignItems:'center'}}>Dr.Agri</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/market')}>
      <Icon name="shopping-cart" size={28}/>
      <Text style={{fontSize:hp(1.6),alignItems:'center'}}>market</Text>
      </TouchableOpacity>
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
    color:theme.colors.textDark,
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
    gap:10,

  },
  lifeStyle:{
    paddingTop:20,
    paddingHorizontal:wp(4),
  },
  noPosts:{
    fontSize:hp(2),
    //TextAlign:'center',
    alignItems:'center',
    justifyContent:'center',
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
  footer:{

    flexDirection:'row',
    marginTop:4,
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:7,
    marginHorizontal:wp(4),
    borderRadius:40,
  
    
    //marginVertical:wp(9),
  }

})