import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {View, StyleSheet, Image, Button, Alert} from "react-native";

async function askForPermissions() {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    )

    if (status !== 'granted') {
        Alert.alert('Ошибка', "Вы не дали прав на использование камеры")
        return false
    }

    return true
}

export const PhotoPicker = ({onPick}) => {
    const [img, setImg] = useState(null)

    const takePhoto = async () => {
        const hasPer = await askForPermissions()

        if (!hasPer) {
            return
        }

        const img = await ImagePicker.launchCameraAsync({
            quality: 1,
            allowsEditing: true
        })

        setImg(img.uri)
        onPick(img.uri)
    }

    return (
        <View style={styles.wrapper}>
            <Button title='Сделать Фото' onPress={takePhoto} />
            {img && <Image style={styles.image} source={{uri: img}} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 450,
        marginTop: 10,
        resizeMode: 'cover'
    }
})