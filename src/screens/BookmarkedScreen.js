import React from "react";
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Post} from "../componets/Post";
import {AppHeaderIcon} from "../componets/AppHeaderIcon";
import {PostList} from "../componets/PostList";
import {useSelector} from "react-redux";

export const BookmarkedScreen = ({navigation}) => {
    const goToPost = post => {
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked
        })
    }

    const bookedPosts = useSelector(state => state.post.bookedPosts)

    return (
        <PostList data={bookedPosts} onOpen={goToPost}/>
    )
}

BookmarkedScreen.navigationOptions = ({navigation}) =>
    ({
        headerTitle: 'Избранное',
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
