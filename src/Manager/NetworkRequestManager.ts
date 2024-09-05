import { Platform } from "react-native"
import { AppConstants } from "../Theme/constants"
import { AppLogger } from "../Theme/utils"
import { NetworkManager } from "./NetworkManager"


export const NetworkRequestManager = {

  SignIn(username: string, password: string, device: string) {
    let formData = {
      username: username,
      password: password,
      device: device
    }
    AppLogger("SignIn Request Body", formData)
    return NetworkManager.POST(AppConstants.endpoints.sign_in, formData)
  },
  SignUp(username: string, email: string, password: string) {
    let formData = {
      username: username,
      email: email,
      password: password
    }
    AppLogger("SignUp Request Body", formData)
    return NetworkManager.POST(AppConstants.endpoints.sign_up, formData)
  },
  ForgotPassword(email: string) {
    let formData = {
      email: email
    }
    AppLogger("Forgot Password Request Body", formData)
    return NetworkManager.POST(AppConstants.endpoints.forgot_password, formData)
  },
  ChangePassword(old_password: string, password: string) {
    let formData = {
      old_password: old_password,
      password: password,
    }
    AppLogger("ChangePassword Request Body", formData)
    return NetworkManager.POST(AppConstants.endpoints.change_password, formData)
  },
  GetCardDetails(fcmToken, accessToken) {
    let formData = {}
    if (accessToken != null) {
      formData = {}
    } else {
      formData = { fcm_token: fcmToken }
    }
    AppLogger("GetCardDetails Request", formData, accessToken)
    return NetworkManager.POST(AppConstants.endpoints.get_card_details, formData)
  },
  GetProfileDetails() {
    AppLogger("Get Profile Details Request")
    return NetworkManager.GET(AppConstants.endpoints.profile)
  },
  GetGameDetails() {
    let formData = {
    }
    AppLogger("GetGameDetails Request")
    return NetworkManager.POST(AppConstants.endpoints.get_game_details, formData)
  },
  SaveGameScore(score: number, wordList: string, selectedCharacters: string, correctAnswerStatus: boolean) {
    let formData = {
      score,
      wordList,
      correctAnswerStatus,
      selectedCharacters
    }
    AppLogger("Save Game Score Request", formData)
    return NetworkManager.POST(AppConstants.endpoints.game_score, formData)
  },
  PurchaseSubscriptionApi(productId: string, transactionReceipt: string, transactionId: string, transactionDate: string) {
    let formData = {
      productId: productId,
      transactionReceipt: transactionReceipt,
      transactionId: transactionId,
      transactionDate: transactionDate,
      platform: Platform.OS
    }
    AppLogger("Purchase Subscription Api Request", formData)
    return NetworkManager.POST(AppConstants.endpoints.purchaseSubscription, formData)
  },
  SaveFcmToken(fcm_token: string) {
    let formData = {
      fcm_token: fcm_token,
    }
    AppLogger("Save Fcm Token Request Body", formData)
    return NetworkManager.POST(AppConstants.endpoints.saveFcmToken, formData)
  },
  ResendVerificationEmail(email: string) {
    let formData = {
      email: email,
    }
    AppLogger("Resend Verification Email Request Body", formData)
    return NetworkManager.POST(AppConstants.endpoints.resendVerificationEmail, formData)
  },
  LogOut() {
    let formData = {
    }
    AppLogger("Resend Verification Email Request Body", formData)
    return NetworkManager.POST(AppConstants.endpoints.logout, formData)
  },
}