import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../componets/AppHeaderIcon";

export const AboutScreen = ({}) => {
    return (
        <View style={styles.center}>
            <Text>Лучшее приложение для заметок</Text>
            <Text>Версия приложения <Text style={styles.ver}>0.0.1</Text></Text>
        </View>
    )
}

AboutScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'О приложении',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='Toggle Drawer'
                iconName='ios-menu'
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ver: {
        fontFamily: 'Open-Bold'
    }
})