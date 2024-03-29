import React from 'react'
import { View,StyleSheet ,Dimensions} from 'react-native'

import { Colors } from '../../constants/colors'

const Card = ({children}) => {
  return (
    <View style={styles.inputContainer}>{children}</View>
  )
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop:deviceWidth < 380 ?18 : 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      },
});