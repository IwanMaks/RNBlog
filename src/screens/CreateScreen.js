import React, {useState, useRef} from "react";
import {View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../componets/AppHeaderIcon";
import {useDispatch} from "react-redux";
import {THEME} from "../theme";
import {addPost} from "../store/actions/post";
import {PhotoPicker} from "../componets/PhotoPicker";

export const CreateScreen = ({navigation}) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const [imgRef, setImgRef] = useState('')

    const createPostHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text,
            img: imgRef,
            booked: false
        }
        dispatch(addPost(post))
        navigation.navigate('Main')
    }

    const photoPickHandler = uri => {
        setImgRef(uri)
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Создать новый пост</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder='Введите текст поста'
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={photoPickHandler} />
                    <Button
                        title='Создать пост'
                        color={THEME.MAIN_COLOR}
                        onPress={createPostHandler}
                        disabled={!text || !imgRef}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

CreateScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Создать пост',
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
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Open-Regular',
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
})