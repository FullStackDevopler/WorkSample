import { Images } from "../Assets";
import { ApiConstants } from "./ApiConstants";
import { StringConstants } from "./StringConstants";

export const AppConstants = {

    screens: {
        WELCOME_SCREEN: 'Welcome',
        SIGN_UP_DRIVER_SCREEN: 'SignupDriver',
        LOGIN_DRIVER_SCREEN: 'LoginDriver',
        FORGET_PASSWORD_SCREEN: 'ForgetPassword',
        OTP_VERIFICATION: 'OtpVerification',
        HOME_SCREEN: 'Home',
        HOTSHOT_SCREEN: 'Hotshot',
        CREATE_JOB_SCREEN: 'CreateJob',
        NOTIFICATIONS_SCREEN: 'Notifications',
        ACCOUNTS_SCREEN: 'Accounts',
        TAB_NAVIGATOR: 'TabNavigator',
        EDIT_PROFILE: 'EditProfile',
        SAVED_CONTACT: 'SavedContact',
        ADD_NEW_CONTACT: 'AddNewContact',
        CHOOSE_CONTACT: 'ChooseContact',
        WEB_VIEW_SCREENS: 'WebViewScreens',
        JOB_DETAILS: 'JobDetails',
        ADD_HOTSHOT: 'AddHotshot',
        ADD_SIGNATURE: 'AddSignature',
        MY_IN_JOBS: "MyInJobs",
        MY_OUT_JOBS: "MyOutJobs",
        MY_PAST_JOBS: "MyPastJobs",
        JOB_REQUEST_DETAILS: "JobRequestDetails",
        UNASSIGNED_JOB_DETAILS: "UnAssignedJobDetails",
        PDF_SCREEN: 'PdfScreen',
        SELECT_CONTACT: 'SelectContact',
        NOTIFICATION_DETAILS: 'NotificationDetails',
        CHAT_SCREEN: 'ChatScreen',
        PROPOSAL_SCREEN: 'ProposalScreen',
        PAST_JOB_DETAILS: 'PastJobDetails',

    },

    redux: {
        //auth
        SIGNIN_REQUEST_START: "SIGNIN_REQUEST_START",
        SIGNUP_REQUEST_START: "SIGNUP_REQUEST_START",
        FORGOT_PASSWORD_REQUEST_START: "FORGOT_PASSWORD_REQUEST_START",
        VERIFY_OTP_REQUEST_START: "VERIFY_OTP_REQUEST_START",
        RESEND_OTP_REQUEST_START: 'RESEND_OTP_REQUEST_START',
        UPDATE_FCM_REQUEST_START: 'UPDATE_FCM_REQUEST_START',

        //profile
        GET_PROFILE_REQUEST_START: 'GET_PROFILE_REQUEST_START',
        EDIT_PROFILE_REQUEST_START: "EDIT_PROFILE_REQUEST_START",
        EDIT_PROFILE_IMAGE_REQUEST_START: 'EDIT_PROFILE_IMAGE_REQUEST_START',
        CHANGE_PASSWORD_REQUEST_START: 'CHANGE_PASSWORD_REQUEST_START',
        LOGOUT_REQUEST_START: 'LOGOUT_REQUEST_START',
        DELETE_ACCOUNT_REQUEST_START: 'DELETE_ACCOUNT_REQUEST_START',

        //notification
        NOTIFICATION_LIST_REQUEST_START: 'NOTIFICATION_LIST_REQUEST_START',
        DELETE_NOTIFICATION_REQUEST_START: 'DELETE_NOTIFICATION_REQUEST_START',
        READ_NOTIFICATION_REQUEST_START: 'READ_NOTIFICATION_REQUEST_START',
        
        // jobs 
        JOB_CREATED_REQUEST_START: 'JOB_CREATED_REQUEST_START',
        MY_IN_JOB_REQUEST_START: 'MY_IN_JOB_REQUEST_START',
        MY_IN_PAST_JOB_REQUEST_START: 'MY_IN_PAST_JOB_REQUEST_START',
        MY_IN_UNASSIGNED_JOB_REQUEST_START: 'MY_IN_UNASSIGNED_JOB_REQUEST_START',
        MY_OUT_JOB_REQUEST_START: 'MY_OUT_JOB_REQUEST_START',
        MY_OUT_PAST_JOB_REQUEST_START: 'MY_OUT_PAST_JOB_REQUEST_START',
        MY_OUT_UNASSIGNED_JOB_REQUEST_START: 'MY_OUT_UNASSIGNED_JOB_REQUEST_START',
        JOB_DETAILS_START: 'JOB_DETAILS_START',
        VEHICLE_LIST_REQUEST_START: 'VEHICLE_LIST_REQUEST_START',
        CREATE_BILL_REQUEST_START: 'CREATE_BILL_REQUEST_START',
        ACCEPT_JOB_REQUEST_START: 'ACCEPT_JOB_REQUEST_START',
        CANCEL_JOB_REQUEST_START: 'CANCEL_JOB_REQUEST_START',
        RATING_REQUEST_START: 'RATING_REQUEST_START',
        GET_RATING_REQUEST_START: 'GET_RATING_REQUEST_START',
        COMPLETE_JOB_REQUEST_START: 'COMPLETE_JOB_REQUEST_START',
        JOB_COUNT_REQUEST_START: 'JOB_COUNT_REQUEST_START',
        JOB_PRICE_REQUEST_START: 'JOB_PRICE_REQUEST_START',

        //notifications
        JOB_DETAILS_NOTIFICATION_START: 'JOB_DETAILS_NOTIFICATION_START',
        JOB_DETAILS_FOR_NOTIFICATION_START: 'JOB_DETAILS_FOR_NOTIFICATION_START',
        

        // contacts 
        ADD_CONTACT_REQUEST_START: "ADD_CONTACT_REQUEST_START",
        UPDATE_CONTACT_REQUEST_START: "UPDATE_CONTACT_REQUEST_START",
        DELETE_CONTACT_REQUEST_START: "DELETE_CONTACT_REQUEST_START",
        LIST_ALL_CONTACT_REQUEST_START: "LIST_ALL_CONTACT_REQUEST_START",

        //contactADMIN
        CONTACT_ADMIN_REQUEST_START: "CONTACT_ADMIN_REQUEST_START",

        //hotshot
        CREATE_HOTSHOT_REQUEST_START: 'CREATE_HOTSHOT_REQUEST_START',
        GET_HOTSHOT_LIST_REQUEST_START: 'GET_HOTSHOT_LIST_REQUEST_START',
        GET_PAST_HOTSHOT_LIST_REQUEST_START: 'GET_PAST_HOTSHOT_LIST_REQUEST_START',
        CANCEL_HOTSHOT_REQUEST_START: 'CANCEL_HOTSHOT_REQUEST_START',
        FINISH_HOTSHOT_REQUEST_START: 'FINISH_HOTSHOT_REQUEST_START',
        HOTSHOT_DETAILS_REQUEST_START: 'HOTSHOT_DETAILS_REQUEST_START',
        GET_CHAT_REQUEST_START: 'GET_CHAT_REQUEST_START',
        HOTSHOT_DETAILS_NOTIFICATION_REQUEST_START: 'HOTSHOT_DETAILS_NOTIFICATION_REQUEST_START',
        ACCEPT_PROPOSAL_REQUEST_START: 'ACCEPT_PROPOSAL_REQUEST_START',
        GET_PROPOSAL_LIST_REQUEST_START: 'GET_PROPOSAL_LIST_REQUEST_START',
        GET_PROPOSAL_COUNT_REQUEST_START: 'GET_PROPOSAL_COUNT_REQUEST_START',
        GET_HOTSHOT_PRICE_REQUEST_START: 'GET_HOTSHOT_PRICE_REQUEST_START',
    },

    PROFILE_DATA: [
       
        {
            title: StringConstants.EDIT_PROFILE,
            icon: Images.IC_EDIT,
            screenName: 'EditProfile'
        },
       
        {
            title: StringConstants.SAVED_CONTACTS,
            icon: Images.IC_CONTACTS,
            screenName: 'SavedContact'
        },
        {
            title: StringConstants.CHANGE_PASSWORD,
            icon: Images.IC_CHANGE_PASSWORD,
            screenName: 'ChangePassword'
        },
        {
            title: StringConstants.ABOUT_US,
            icon: Images.IC_ABOUT_US,
            screenName: 'WebViewScreens',
            url: ApiConstants.WEBVIEW_BASE_URL + ApiConstants.ABOUT_US
        },
        {
            title: StringConstants.TERMS_AND_CONDITIONS,
            icon: Images.IC_TERMS,
            screenName: 'WebViewScreens',
            url: ApiConstants.WEBVIEW_BASE_URL + ApiConstants.TERMS_AND_CONDITIONS

        },
        {
            title: StringConstants.PRIVACY_POLICY,
            icon: Images.IC_PRIVACY,
            screenName: 'WebViewScreens',
            url: ApiConstants.WEBVIEW_BASE_URL + ApiConstants.PRIVACY_POLICY

        },
        {
            title: StringConstants.CONTACT_ADMIN,
            icon: Images.IC_CONTACT_ADMIN,
            screenName: 'ContactAdmin'
        },
        {
            title: StringConstants.DELETE_ACCOUNT,
            icon: Images.IC_DELETE_ACCOUNT,
        },
        {
            title: StringConstants.LOGOUT,
            icon: Images.IC_LOGOUT,
        },
    ]

}