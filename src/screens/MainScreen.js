import React, {useEffect} from "react";
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../componets/Post";
import {AppHeaderIcon} from "../componets/AppHeaderIcon";
import {PostList} from "../componets/PostList";
import {loadPosts} from "../store/actions/post";
import {View, StyleSheet, ActivityIndicator} from "react-native";
import {THEME} from "../theme";

export const MainScreen = ({navigation}) => {
    const goToPost = post => {
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked
        })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    const allPosts = useSelector(state => state.post.allPosts)
    const loading = useSelector(state => state.post.loading)

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR}  />
            </View>
        )
    }

    return (
        <PostList data={allPosts} onOpen={goToPost} />
    )
}

MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Мой блог',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='Take photo'
                iconName='add-outline'
                onPress={() => navigation.navigate('Create')}
            />
        </HeaderButtons>
    ),
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})