import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors';

const InstructionText = ({text,style}) => {
  return (
    <View>
      <Text style={[styles.instructionText,style]}>{text}</Text>
    </View>
  );
}

export default InstructionText
const styles = StyleSheet.create({
    instructionText: {
        color: Colors.accent500,
        fontSize:24
      },
});