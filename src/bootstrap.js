import * as Font from 'expo-font'
import {DB} from './db'

export async function bootstrap () {
    try {
        await Font.loadAsync({
            'Open-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
            'Open-Regular': require('../assets/fonts/OpenSans-Regular.ttf')
        })
        await DB.init()
        console.log('YYYYYYYYYYYYYYYYYYYYYYYEP')
    } catch (e) {
        console.log(e)
    }

}