import AsyncStorage from "@react-native-community/async-storage"
import { AppConstants } from "../Theme/constants"

export const DataManager = {
    async setAccessToken(token: string) {
        return await AsyncStorage.setItem(AppConstants.dataManager.access_token, token)
    },
    async getAccessToken() {
        return await AsyncStorage.getItem(AppConstants.dataManager.access_token)
    },
    async removeAccessToken() {
        return await AsyncStorage.removeItem(AppConstants.dataManager.access_token)
    },
    async setGUID(id: string) {
        return await AsyncStorage.setItem(AppConstants.dataManager.guid, id)
    },
    async getGUID() {
        return await AsyncStorage.getItem(AppConstants.dataManager.guid)
    },
    async removeGUID() {
        return await AsyncStorage.removeItem(AppConstants.dataManager.guid)
    },
    async setIsGuestLogin(status: boolean) {
        return await AsyncStorage.setItem(AppConstants.dataManager.guest_sign_in, JSON.stringify(status))
    },
    async getIsGuestLogin() {
        return await AsyncStorage.getItem(AppConstants.dataManager.guest_sign_in)
    },
    async removeIsGuestLogin() {
        return await AsyncStorage.removeItem(AppConstants.dataManager.guest_sign_in)
    },
    async setTermsStatus(status: boolean) {
        return await AsyncStorage.setItem(AppConstants.dataManager.terms_status, JSON.stringify(status))
    },
    async getTermsStatus() {
        return await AsyncStorage.getItem(AppConstants.dataManager.terms_status)
    },
}