import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from 'react-native'
import { navigationRef } from "./RootNavigation";
import { LoginStack, MainStack } from "./MainStack";
import { useDispatch, useSelector } from "react-redux";
import { deleteSignInResponse } from "../Redux/Reducers/userInfoSlice";


export function Setup(): React.JSX.Element {
    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef}>
                {accessToken !== null ? <MainStack /> : accessToken == null ? <LoginStack /> : null}
            </NavigationContainer>
        </View>
    )
}