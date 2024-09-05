import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Welcome from "../Screens/Welcome"

import ForgetPassword from "../Screens/ForgetPassword"
import OtpVerification from "../Screens/OtpVerification"
import { TabNavigator } from "./TabNavigator"
import EditProfile from "../Screens/EditProfile"
import SavedContact from "../Screens/SavedContact"
import AddNewContact from "../Screens/AddNewContact"
import ChooseContact from "../Screens/ChooseContact"
import ContactAdmin from "../Screens/ContactAdmin"
import WebViewScreens from "../Screens/WebViewScreens"
import JobDetails from "../Screens/JobDetails"
import LoginDriver from "../Screens/LoginDriver"
import SignupDriver from "../Screens/SignupDriver"
import AddHotshot from "../Screens/AddHotshot"
import AddSignature from "../Screens/AddSignature" 
import JobRequestDetails from "../Screens/JobRequestDetails"
import MyPastJobs from "../Screens/MyPastJobs"
import MyInJobs from "../Screens/MyInJobs"
import MyOutJobs from "../Screens/MyOutJobs"
import UnAssignedJobDetails from "../Screens/UnAssignedJobDetails"
import ChangePassword from "../Screens/ChangePassword"
import PdfScreen from "../Screens/PdfScreen"
import SelectContact from "../Screens/SelectContact"
import DummyLoginScreen from "../Screens/DummyLoginScreen"
import NotificationDetails from "../Screens/NotificationDetails"
import ChatScreen from "../Screens/ChatScreen"
import ProposalScreen from "../Screens/ProposalScreen"
import PastJobDetails from "../Screens/PastJobDetails"

export function LoginStack(): React.JSX.Element {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="LoginDriver" component={LoginDriver} />
            <Stack.Screen name="DummyLoginScreen" component={DummyLoginScreen} />
            <Stack.Screen name="SignupDriver" component={SignupDriver} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="PdfScreen" component={PdfScreen} />
            <Stack.Screen name="WebViewScreens" component={WebViewScreens} />
        </Stack.Navigator>
    )
}

export function MainStack(): React.JSX.Element {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName="TabNavigator"
            screenOptions={{
                headerShown: false,
                // gestureEnabled: false,
            }}> 
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="SavedContact" component={SavedContact} />
            <Stack.Screen name="AddNewContact" component={AddNewContact} />
            <Stack.Screen name="ChooseContact" component={ChooseContact} />
            <Stack.Screen name="ContactAdmin" component={ContactAdmin} />
            <Stack.Screen name="WebViewScreens" component={WebViewScreens} />
            <Stack.Screen name="JobDetails" component={JobDetails} />
            <Stack.Screen name="AddHotshot" component={AddHotshot} />
            <Stack.Screen name="AddSignature" component={AddSignature} />
            <Stack.Screen name="MyInJobs" component={MyInJobs} />
            <Stack.Screen name="MyOutJobs" component={MyOutJobs} />
            <Stack.Screen name="MyPastJobs" component={MyPastJobs} />
            <Stack.Screen name="UnAssignedJobDetails" component={UnAssignedJobDetails} />
            <Stack.Screen name="JobRequestDetails" component={JobRequestDetails} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="PdfScreen" component={PdfScreen} />
            <Stack.Screen name="SelectContact" component={SelectContact} />
            <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ProposalScreen" component={ProposalScreen} />
            <Stack.Screen name="PastJobDetails" component={PastJobDetails} />
            
        

        </Stack.Navigator>
    )
}
