import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../config/colors/colors'

export default function MessageOverLay({meesage}) {
  return (
    <View style={styles.contaner}>
      <Text style={styles.txt}>{meesage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    contaner:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.color100
    },
    txt:{
        color:"#ffffffab",
        fontFamily:"openSans"
    }
})