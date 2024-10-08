import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import { Colors } from "../constants/colors";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({
  userNumber,
  gameOverHandler,
  setNumberOfGuess,
  numberOfGuess,
}) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      gameOverHandler(currentGuess);
      minBoundary = 1;
      maxBoundary = 100;
    }
  }, [currentGuess, userNumber, gameOverHandler]);

  useEffect(() => {
    setNumberOfGuess(() => {
      return [initialGuess];
    });
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      return Alert.alert("Don't lie!", "You know this is wrong...", [
        { text: "Sorry!", style: "Cancel" },
      ]);
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setNumberOfGuess((value) => [newRandomNumber, ...value]);
    setCurrentGuess(newRandomNumber);
  };

  const guesslistRound = numberOfGuess?.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText text="Lower or Higher" />
        <Text style={styles.instructionText}></Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              pressedHandler={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              pressedHandler={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons
                name="add"
                size={24}
                color="white"
                keyExtractor={(item) => item}
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 600) {

      content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              pressedHandler={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              pressedHandler={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons
                name="add"
                size={24}
                color="white"
                keyExtractor={(item) => item}
              />
            </PrimaryButton>
          </View>
        </View>
      </>
      )

  }
  return (
    <View style={styles.screen}>
      <Title title="Opponent's Guess" />
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={numberOfGuess}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guesslistRound - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerWide:{
    flexDirection:'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
