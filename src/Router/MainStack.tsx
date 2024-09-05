import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import Settings from '../Screens/Settings';
import Login from '../Screens/Login';
import Answer from '../Screens/Answer';
import DailyLimitReached from '../Screens/DailyLimitReached';
import GetPro from '../Screens/GetPro';
import Stats from '../Screens/Stats';
import Defination from '../Screens/Defination';
import ChooseLetters from '../Screens/ChooseLetters';
import ExplainationSlideOne from '../Screens/ExplainationSlideOne';
import ExplainationSlideTwo from '../Screens/ExplainationSlideTwo';
import QuizInterface from '../Screens/QuizInterface';
import Score from '../Screens/Score';
import ChangePassword from '../Screens/ChangePassword';
import MyProfile from '../Screens/MyProfile';
import ManageSubscription from '../Screens/ManageSubscription';
import GamePlay from '../Screens/GamePlay';
import ForgotPassword from '../Screens/ForgotPassword';
import Verification from '../Screens/Verification';

export function MainStack(): JSX.Element {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Answer" component={Answer} />
      <Stack.Screen name="DailyLimitReached" component={DailyLimitReached} />
      <Stack.Screen name="GetPro" component={GetPro} />
      <Stack.Screen name="Stats" component={Stats} />
      <Stack.Screen name="Defination" component={Defination} />
      <Stack.Screen name="ChooseLetters" component={ChooseLetters} />
      <Stack.Screen name="ExplainationSlideOne" component={ExplainationSlideOne} />
      <Stack.Screen name="ExplainationSlideTwo" component={ExplainationSlideTwo} />
      <Stack.Screen name="QuizInterface" component={QuizInterface} />
      <Stack.Screen name="Score" component={Score} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ManageSubscription" component={ManageSubscription} />
      <Stack.Screen name="GamePlay" component={GamePlay} />
    </Stack.Navigator>
  );
}

export function LoginStack(): JSX.Element {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}