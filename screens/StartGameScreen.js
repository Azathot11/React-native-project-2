import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
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
    console.log(+number);
  };
  return (
    <View style={styles.inputContainer}>
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
          <PrimaryButton pressedHandler={confirmHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#3b021f",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
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
