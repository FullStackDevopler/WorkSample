import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../Sagas";

const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware : ()=> [sagaMiddleware],  
});

sagaMiddleware.run(rootSaga)

const persistedStore = persistStore(store);

export { store, persistedStore };