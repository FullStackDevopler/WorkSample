import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name: never, params: never) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export const reset = (name, index) => {
    navigationRef.dispatch((state) => {
        console.log("State===", state)
        return CommonActions.reset({
            ...state,
            index: 0,
            routes: [state.routes[0]]
        })
    });
};

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}