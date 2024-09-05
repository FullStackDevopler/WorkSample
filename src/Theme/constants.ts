import Verification from "../Screens/Verification";

export const AppConstants = {
  baseUrl: "BASE_URL",
  appName: "DoggyWord",
  screens: {
    signUp: "SignUp",
    home: "Home",
    login: "Login",
    getPro: "GetPro",
    settings: "Settings",
    myProfile: "MyProfile",
    changePassword: "ChangePassword",
    manageSubscription: "ManageSubscription",
    defination: "Defination",
    chooseLetters: "ChooseLetters",
    explainationSlideOne: "ExplainationSlideOne",
    explainationSlideTwo: "ExplainationSlideTwo",
    quizInterface: "QuizInterface",
    score: "Score",
    answer: "Answer",
    stats: "Stats",
    gameplay: "GamePlay",
    forgotPassword: "ForgotPassword",
    dailyLimitReached: "DailyLimitReached",
    verification: "Verification"
  },
  dataManager: {
    access_token: "access_token",
    guid: "guid",
    guest_sign_in: "guest_sign_in",
    terms_status: "terms_status",
  },
  endpoints: {
    forgot_password: "/api/forgot-password",
    sign_up: "/api/sign-up",
    sign_in: "/api/sign-in",
    change_password: "/api/mobile/change-password",
    get_card_details: "/api/mobile/get-card-detail",
    get_game_details: "/api/mobile/get-game-detail",
    game_score: "/api/mobile/game-score",
    profile: "/api/mobile/profile",
    purchaseSubscription: "/api/payment/save-payment",
    saveFcmToken: "/api/mobile/fcm-token",
    resendVerificationEmail: "/api/resend-email",
    logout: "/api/mobile/logout"
  },
  networkConfig: {
    // basUrl: "http://3.141.129.55:4000",
    basUrl: "https://doggywordsapi.studydoctor.org",
    timeout: 60000
  },
  redux: {
    SETUP_TOKEN: "SETUP_TOKEN",

    LOGOUT_GUEST_USER: "LOGOUT_GUEST_USER",
    LOGOUT_USER_START: "LOGOUT_USER_START",
    LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS",
    LOGOUT_USER_ERROR: "LOGOUT_USER_ERROR",
    LOGOUT_USER_DIRECTLY: "LOGOUT_USER_DIRECTLY",

    SIGNIN_REQUEST_START: "SIGNIN_REQUEST_START",
    SIGNIN_REQUEST_SUCCESS: "SIGNIN_REQUEST_SUCCESS",
    SIGNIN_REQUEST_ERROR: "SIGNIN_REQUEST_ERROR",

    GUEST_SIGNIN: "GUEST_SIGNIN",

    FORGOT_PASSWORD_REQUEST_START: "FORGOT_PASSWORD_REQUEST_START",
    FORGOT_PASSWORD_REQUEST_SUCCESS: "FORGOT_PASSWORD_REQUEST_SUCCESS",
    FORGOT_PASSWORD_REQUEST_ERROR: "FORGOT_PASSWORD_REQUEST_ERROR",

    SIGNUP_REQUEST_START: "SIGNUP_REQUEST_START",
    SIGNUP_REQUEST_SUCCESS: "SIGNUP_REQUEST_SUCCESS",
    SIGNUP_REQUEST_ERROR: "SIGNUP_REQUEST_ERROR",

    CHANGE_PASSWORD_REQUEST_START: "CHANGE_PASSWORD_REQUEST_START",
    CHANGE_PASSWORD_REQUEST_SUCCESS: "CHANGE_PASSWORD_REQUEST_SUCCESS",
    CHANGE_PASSWORD_REQUEST_ERROR: "CHANGE_PASSWORD_REQUEST_ERROR",

    GET_CARD_DETAILS_START: "GET_CARD_DETAILS_START",
    GET_CARD_DETAILS_SUCCESS: "GET_CARD_DETAILS_SUCCESS",
    GET_CARD_DETAILS_ERROR: "GET_CARD_DETAILS_ERROR",

    SET_SELECTED_LETTERS: "SET_SELECTED_LETTERS",

    SAVE_TO_WORDS_LIST: "SAVE_TO_WORD_LIST",

    GET_GAME_DETAILS_START: "GET_GAME_DETAILS_START",
    GET_GAME_DETAILS_SUCCESS: "GET_GAME_DETAILS_SUCCESS",
    GET_GAME_DETAILS_ERROR: "GET_GAME_DETAILS_ERROR",

    SAVE_GAME_SCORE_START: "SAVE_GAME_SCORE_START",
    SAVE_GAME_SCORE_SUCCESS: "SAVE_GAME_SCORE_SUCCESS",
    SAVE_GAME_SCORE_ERROR: "SAVE_GAME_SCORE_ERROR",

    SET_QUIZ_ANSWER_STATUS: "SET_QUIZ_ANSWER_STATUS",

    RESET_GAME_DATA: "RESET_GAME_DATA",

    GET_PROFILE_START: "GET_PROFILE_START",
    GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
    GET_PROFILE_ERROR: "GET_PROFILE_ERROR",

    PURCHASE_SUBSCRIPTION_API_START: "PURCHASE_SUBSCRIPTION_API_START",
    PURCHASE_SUBSCRIPTION_API_SUCCESS: "PURCHASE_SUBSCRIPTION_API_SUCCESS",
    PURCHASE_SUBSCRIPTION_API_ERROR: "PURCHASE_SUBSCRIPTION_API_ERROR",

    SAVE_FCM_TOKEN_START: "SAVE_FCM_TOKEN_START",
    SAVE_FCM_TOKEN_SUCCESS: "SAVE_FCM_TOKEN_SUCCESS",
    SAVE_FCM_TOKEN_ERROR: "SAVE_FCM_TOKEN_ERROR",

    RESEND_VERIFICATION_EMAIL_START: "RESEND_VERIFICATION_EMAIL_START",
    RESEND_VERIFICATION_EMAIL_SUCCESS: "RESEND_VERIFICATION_EMAIL_SUCCESS",
    RESEND_VERIFICATION_EMAIL_ERROR: "RESEND_VERIFICATION_EMAIL_ERROR",

    SET_TRACKING_STATUS: "SET_TRACKING_STATUS",

    SET_NETWORK_STATE: "SET_NETWORK_STATE"
  }
}