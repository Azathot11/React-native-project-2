import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert,Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ userNumberHandler }) {
  const [number, setNumber] = useState("");

  const inputHandler = (enteredNumber) => {
    setNumber(enteredNumber);
    // console.log(enteredNumber);
  };

  const resetHandler = () => {
    setNumber("");
  };

  const confirmHandler = () => {
    const newStateNumber = +number;

    if (isNaN(newStateNumber) || newStateNumber < 1 || newStateNumber > 99) {
      Alert.alert("Invalid number", "Please enter a number between 1 and 99", [
        { text: "ok", style: "destructive", onPress: () => resetHandler() },
      ]);
      return;
    }
    userNumberHandler(+number);
  };
  return (
    <>
      <View style={styles.rootContainer}>
        <Title title="Guest My Number" />

        <Card>
          <InstructionText text='Enter A Number'/>
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            value={number}
            onChangeText={inputHandler}
          />

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton pressedHandler={resetHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton pressedHandler={confirmHandler}>
                Confirm
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
    </>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    marginTop:100,
    Horizontal:16,
    alignItems:'center',
  },
 
  instructionText: {
    color: Colors.accent500,
    fontSize:24
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
