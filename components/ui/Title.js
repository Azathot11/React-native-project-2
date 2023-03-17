import React from 'react'
import { View ,Text,StyleSheet} from 'react-native'

const Title = ({title}) => {
  return (
    <View>
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    title:{
        fontFamily:'open-sans-bold',
        fontSize:24,
        // fontWeight: 'bold',
        color:'white',
        textAlign: 'center',
        borderWidth:2,
        borderColor: 'white',
        padding:12,
        maxWidth:'80%',
        width:300
    }
});