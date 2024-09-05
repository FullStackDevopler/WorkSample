import createSagaMiddleware from 'redux-saga';
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from '../sagas';
import rootReducer from '../Reducers';
// import Reactotron from 'reactotron-react-native'
import Reactotron from './../../../ReactotronConfig';

const sagaMonitor = Reactotron.createSagaMonitor()

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const middlewares = [sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    enhancers: [Reactotron.createEnhancer()]
})
sagaMiddleware.run(rootSaga);

export default store