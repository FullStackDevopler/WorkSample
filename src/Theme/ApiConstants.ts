export const ApiConstants = {
   

    // BASE_URL: 'https://kindracourierapi.developmentrecords.com/api/v1/driver/',
    // DOC_BASE_URL: 'https://kindracourierapi.developmentrecords.com',
    // MEDIA_BASE_URL: 'https://kindracourierapi.developmentrecords.com',

    // BASE_URL: 'http://192.168.1.12:8083/api/v1/driver/', //local
    // DOC_BASE_URL: 'http://192.168.1.12:8083',
    // MEDIA_BASE_URL: 'http://192.168.1.12:8083',
    // LOCAL_IP: 'http://192.168.1.12:8083/',

    
    BASE_URL: 'http://35.177.231.60:8083/api/v1/driver/', //new live
    DOC_BASE_URL: 'http://35.177.231.60:8083',
    MEDIA_BASE_URL: 'http://35.177.231.60:8083/',
    


    //webviews
    // WEBVIEW_BASE_URL: 'http://18.169.193.141/mobile/', //dummy url
    WEBVIEW_BASE_URL: 'http://35.177.231.60/mobile/',   //new url but it has dummy text inside
    ABOUT_US: 'about-us/view',
    TERMS_AND_CONDITIONS: 'terms_conditions/view',
    PRIVACY_POLICY: 'privacy-policy/view',

    SERVICE_AGREEMENT: 'service-agreement/view',
    ADDITIONAL_CLAUSES: 'additional-clause/view',
    PRIVACY_DATA_PROTECTION: 'privacy-data-protection/view',


    //auth
    LOGIN: 'login',
    FORGOT_PASSWORD: 'forgot-password',
    SIGNUP: 'register',
    VERIFY_OTP: 'verify/otp',
    RESEND_OTP: 'resend/otp',
    UPDATE_FCM: 'update/fcm',


    // joblisting 
    CREATE_JOB: 'create-job',
    MY_IN_JOB: 'in-job/myjob',
    JOB_DETAILS: 'job/details',
    MY_IN_PAST_JOB: 'in-job/past',
    MY_IN_UNASSIGNED_JOB: 'in-job/jobrequest',
    MY_OUT_JOB: 'out-job/myjob',
    MY_PAST_OUT_JOB: 'out-job/past',
    MY_UNASSIGNED_OUT_JOB: 'out-job/unassigned',
    JOB_COUNT: 'job/count',
    
    VEHICLE_LIST: 'Vehicle/list',
    CREATE_BILL: 'create/bill',
    CANCEL_JOB: 'cancel/job', 
    GIVE_RATING: '',
    GET_RATING: 'http://35.177.231.60:8083/api/v1/get/rating',
    // GET_RATING: 'http://18.169.193.141:8083/api/v1/get/rating',
    ACCEPT_JOB: 'accept/job',
    COMPLETE_JOB: 'complete/job',
    JOB_PRICE: 'get/job/price',


    //hotshots
    CREATE_HOTSHOT: 'create/hotshot',
    GET_HOTSHOT_LIST: 'view/hotshot',
    GET_PAST_HOTSHOT_LIST: 'view/past/hotshot',
    CANCEL_HOTSHOT: 'cancel/hotshot',
    FINISH_HOTSHOT: 'finish/hotshot',
    HOTSHOT_DETAILS: 'hotshot/details',
    ACCEPT_PROPOSAL: 'hotshot/request/accept',
    GET_PROPOSAL_LIST: 'hotshot/request/list',
    GET_CHAT: 'hotshot/chat',
    PROPOSAL_COUNT: 'hotshot/request/count',
    HOTSHOT_PRICE: 'get/hotshot/price',

    //contact listing
    CONTACT_LIST: 'contact/list',
    ADD_CONTACT: 'add/contact',
    UPDATE_CONTACT: 'contact/update',
    DELETE_CONTACT: 'contact/delete',
    CONTACT_ADMIN: 'contact-to/admin',

   //accounts
    GET_USER_PROFILE: 'profile',
    EDIT_PROFILE: 'edit/profile',
    EDIT_PROFILE_IMAGE: 'update/photo',
    CHANGE_PASSWORD: 'update-password',
    LOGOUT: 'logout',
    DELETE_ACCOUNT: 'delete/account',

    //notifications
    NOTIFICATION: 'activity/list',
    DELETE_NOTIFICATION : 'activity/delete',
    READ_NOTIFICATION: 'activity/read'

}