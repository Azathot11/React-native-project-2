
import { useState ,useEffect,useCallback} from 'react';
import { StyleSheet,ImageBackground,SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
// import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import GameOverScreen from './screens/GameOverScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen'
import { Colors } from './constants/colors';


SplashScreen.preventAutoHideAsync();

export default function App() {
  

  const [userNumber,setUserNumber] = useState(null);

  const [gameOver,setGameOver] = useState(false);

  const [numberOfGuess,setNumberOfGuess] = useState([]);

 const [fontIsloaded] = useFonts({
     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
     "open-sans-bold": require('./assets/fonts/OpenSans-Bold.ttf')
  })


  // if(!fontIsloaded) {
  //  return  <SplashCreen/>
  // }
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontIsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontIsloaded]);

  if (!fontIsloaded) {
    return null;
  }
  const userNumberHandler = (enteredNumber)=>{
    setUserNumber(enteredNumber);
    setGameOver(false)
  }

  const gameOverHandler=()=>{
    setGameOver(true)
  }

  
  const restartGameHandler=()=>{
    setUserNumber(null)
    setGameOver(false)
    setNumberOfGuess([])
  }
  let screen =  <StartGameScreen userNumberHandler={userNumberHandler} />

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} gameOverHandler={gameOverHandler} setNumberOfGuess={setNumberOfGuess} numberOfGuess={numberOfGuess}/>
  }

  if(gameOver && userNumber){
    screen = <GameOverScreen numberOfGuess={numberOfGuess} userNumber={userNumber} reStart={restartGameHandler}/>
  }


  
  return (
    <>
    <StatusBar style='light'/>
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}
    onLayout={onLayoutRootView}>
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
         <SafeAreaView  style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex: 1,
  },
  backgroundImage:{
    opacity: 0.3,
  }
});
