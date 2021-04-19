import React from "react";
import {createAppContainer} from "react-navigation";
import {Platform} from 'react-native'
import {createStackNavigator} from "react-navigation-stack";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {THEME} from "../theme";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {BookmarkedScreen} from "../screens/BookmarkedScreen";
import {Ionicons} from "@expo/vector-icons";
import {AboutScreen} from "../screens/AboutScreen";
import {CreateScreen} from "../screens/CreateScreen";

const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS !== 'android' ? THEME.MAIN_COLOR : '#fff'
    }
}

const PostNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Post: PostScreen
    },
    navigatorOptions)

const BookedNavigator = createStackNavigator({
    Booked: BookmarkedScreen,
    Post: PostScreen
}, navigatorOptions)

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor}/>,
            tabBarLabel: 'Все'
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarIcon: info => <Ionicons name='ios-star' size={25}  color={info.tintColor}/>,
            tabBarLabel: 'Избранное'
        }
    }
}

const BottomNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(bottomTabsConfig, {
            activeTintColor: '#fff',
            shifting: true,
            barStyle: {
                backgroundColor: THEME.MAIN_COLOR
            }
        })
        : createBottomTabNavigator(bottomTabsConfig, {
            tabBarOptions: {
                activeTintColor: THEME.MAIN_COLOR
            }
})

const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOptions)

const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, navigatorOptions)

const MainNavigator = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: 'Главная',
            // drawerIcon: <Ionicons name='ios-star'/>
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'О приложении'
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: 'Создать пост'
        }
    }
}, {
    contentOptions: {
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {
            fontFamily: 'Open-Bold',
        }
    }
})

export const AppNavigator = createAppContainer(MainNavigator)
