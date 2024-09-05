import React from 'react';
import { Image, View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../Theme/Colors';
import Home from '../Screens/Home';
import Hotshot from '../Screens/Hotshot';
import CreateJob from '../Screens/CreateJob';
import Notifications from '../Screens/Notifications';
import Accounts from '../Screens/Accounts';
import { Images } from '../Assets';

const { width } = Dimensions.get('screen');
const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
    route: any;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({ route }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {

                    backgroundColor: Colors.WHITE,
                    height: Platform.OS == 'android' ? 60 : 50,
                    width,
                    // paddingBottom:0,
                    borderTopWidth: 0,
                    // borderRadius: 35,
                    // overflow: 'hidden',
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 2,
                    shadowRadius: 4,
                    // elevation: 2,
                    // paddingBottom: 15
                    paddingTop: 10

                },
            }}>


            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center', flexDirection: 'row'
                            }}>
                            <Image
                                source={focused ? Images.IC_HOME_COLOR : Images.IC_HOME}
                                style={[{ marginRight: 6 },
                                {
                                       height:  25, width:   25, 
                                }]} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Hotshot"
                component={Hotshot}
                options={{
                    tabBarLabel: 'Hotshot',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{ alignItems: 'center', flexDirection: 'row' }}>

                            <Image
                                source={focused ? Images.IC_HOTSHOT_COLOR : Images.IC_HOTSHOT}
                                style={[{ marginRight: 6, },
                                {
                                    height: 23, width: 23
                                }]} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="CreateJob"
                component={CreateJob}
                options={{
                    tabBarLabel: 'CreateJob',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{ alignItems: 'center', flexDirection: 'row' }}>

                            <Image
                                source={Images.IC_CREATE_JOB} style={[{ marginRight: 6,resizeMode:'contain' },
                                {
                                    height: 35, width: 35

                                }]} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center', flexDirection: 'row',


                            }}>
                            <Image
                                source={focused ? Images.IC_NOTIFICATIONS_COLOR : Images.IC_NOTIFICATIONS} style={[{ marginRight: 6, },
                                {
                                    height: 23, width: 23
                                }]} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Accounts"
                component={Accounts}
                options={{
                    tabBarLabel: 'Accounts',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center', flexDirection: 'row',
                            }}>
                            <Image
                                source={focused ? Images.IC_ACCOUNTS_COLOR : Images.IC_ACCOUNTS} style={[{ marginRight: 6, },
                                {
                                    height: 23, width: 23
                                }]} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
