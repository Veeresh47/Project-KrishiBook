import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {theme} from "../constants/theme"


const RichTextEditor = ({
    editorRef,
    onChange,
}) => {
  return (

   <View style={{minHeight:285}}>  
    
    <Text>Editor</Text>
    </View>
    
  )
}

export default RichTextEditor

const styles = StyleSheet.create({
  richBar:{
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor:theme.colors.gray,

  },
  lifeStyle:{

  },

})