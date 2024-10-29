import { StyleSheet,Button, View, Text} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';

const index = () => {
    const router=useRouter();
    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
   <Text style={{fontSize:20,fontWeight:'bold'}}>Loading...</Text>
   <Button title="Go to Welcome" onPress={()=>router.push('/home')}/>
    <Loading/>
    </View>
    )
}

export default index