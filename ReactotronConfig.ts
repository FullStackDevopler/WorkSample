import AsyncStorage from '@react-native-community/async-storage';
import Reactotron, { asyncStorage, networking } from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';

// Reactotron
//     .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//     .configure() // controls connection & communication settings
//     // .use(asyncStorage(), networking(), reactotronRedux(), sagaPlugin())
//     .useReactNative() // add all built-in react native plugins
//     .connect() // let's connect!

const tron = Reactotron
    .configure()
    .use(reactotronRedux()) // <--- here we go!
    .use(sagaPlugin({}))
    .use(networking())
    .use(asyncStorage({}))
    .useReactNative()
    .connect()

export default tron;