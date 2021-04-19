import React, {useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Image, ScrollView, Alert} from "react-native";
import {Button} from "react-native";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../componets/AppHeaderIcon";
import {useDispatch, useSelector} from "react-redux";
import {removePost, toggleBooked} from "../store/actions/post";

export const PostScreen = ({navigation}) => {
    const postId = navigation.getParam('postId')
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))

    const dispatch = useDispatch()

    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))

    useEffect(() => {
        navigation.setParams({ booked })
    }, [booked])

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post))
    }, [dispatch, post])

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [dispatch])

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить пост?",
            [
                {
                    text: "Отменить",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress() {
                        navigation.navigate('Main')
                        dispatch(removePost(postId))
                    },
                    style: 'destructive'
                }
            ],
            {
                cancelable: false
            }
        );
    }

    if (!post) {
        return null
    }

    return (
        <ScrollView>
            <Image source={{uri: post.img}} style={styles.image}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler}/>
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({navigation}) => {
    const date = navigation.getParam('date')
    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = booked ? 'ios-star' : 'ios-star-outline'
    return {
        headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title='Take photo'
                    iconName={iconName}
                    onPress={toggleHandler}
                />
            </HeaderButtons>
        ),
    }
    // headerStyle: {
    //     backgroundColor: 'red'
    // },
    // headerTintColor: '#fff'
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 450
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'Open-Regular'
    }
})