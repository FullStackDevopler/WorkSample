import { NetworkManager } from "./NetworkManager"
import { ApiConstants } from "../Theme/ApiConstants"
import { AppLogger } from "../Theme/utils";


export const NetworkRequestManager = {
    SignIn(myFormData:any) {
    
        AppLogger('myFormData in Sign IN', myFormData);
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.LOGIN, myFormData, true)
    },
    ForgotPassword(email: string,) {
       let body ={email}
        AppLogger('myFormData in Sign IN', body);
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.FORGOT_PASSWORD, body, false)
    },
    ChangePassword(email: string, oldPassword: string, password: string, token: string) {
        let body ={
          email: email, 
          old_password: oldPassword,
          new_password : password
        }
         AppLogger('ChangePassword body', body);
         return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CHANGE_PASSWORD, body, false, token)
     },
    verifyOtp(email: string, otp: string, userId: string) {
        let myFormData = new FormData();
        myFormData.append('email', email);
        myFormData.append('otp', otp);
        myFormData.append('userId', userId);
        AppLogger('myFormData in Sign IN', myFormData);
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.VERIFY_OTP, myFormData, true)
    },
    resendOtp(email: string, userId: string) {
        let myFormData = new FormData();
        myFormData.append('email', email)
        myFormData.append('userId', userId);
        console.log('myFormData in verifyOtp', myFormData);
        // AppLogger("SignIn Request Body", myFormData)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.RESEND_OTP, myFormData, true)
    },
    Logout(token: string){
        let body = {}
        AppLogger("Logout request body",body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.LOGOUT, body,false, token)
      },
      DeleteAccount(token: string, id: string){
        let body = { id }
        AppLogger("DeleteAccount request body",body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.DELETE_ACCOUNT, body,false, token)
      },
       SignUp(myFormData: any){
        AppLogger('Request Body in NetworkRequestManager', myFormData);
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.SIGNUP, myFormData, true)
    },
    GetProfile(token: string) {
        let body = {}
        AppLogger("GetProfile Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.GET_USER_PROFILE, body, false, token)
    },

    EditProfile(formData: any, token: string){
        AppLogger("EditProfile Request Body", JSON.stringify(formData))
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.EDIT_PROFILE, formData, true, token)
    },


    //only for updating profile image in edit profile screen
    EditProfileImage(profileImage: string, token: string) {
        let myFormData = new FormData();
        myFormData.append("profileimage", {
            uri: profileImage,
            type: 'image/jpeg',
            name: 'image.jpg',
        });

        AppLogger("EditProfile Image Request Body", myFormData)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.EDIT_PROFILE_IMAGE, myFormData, true, token)
    },


    ContactAdmin(token: string,messageData :any){
        let body = messageData
        AppLogger("ContactAdmin request body",body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CONTACT_ADMIN, body, false, token)
    },

   

    //jobs api
    GetCreatedJobDetails( myFormData: any, accessToken: string ){
        AppLogger("GetCreatedJobDetails Request Body", JSON.stringify(myFormData))
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CREATE_JOB, myFormData, true, accessToken)
    },
    GetMyInJobs(token: string) {
        let body = {}
        AppLogger("GetMyInJobs Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.MY_IN_JOB, body, false, token)
    },
    GetJobDetails(token: string,jobId:string) {
        let body = {jobId}
        AppLogger("GetJobDetails Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.JOB_DETAILS, body, false, token)
    },
    GetMyOutJobs(token: string) {
        let body = {}
        AppLogger("GetMyOutJobs Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.MY_OUT_JOB, body, false, token)
    },

    GetMyInPastJobs(token: string, body: object) {
        AppLogger("GetMyInPastJobs Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.MY_IN_PAST_JOB, body, false, token)
    },
    
    GetMyOutPastJobs(token: string, body: object) {
        AppLogger("GetMyOutPastJobs Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.MY_PAST_OUT_JOB, body, false, token)
    },

    GetMyInAssignedJobs(token: string) {
        let body = {}
        AppLogger("GetMyInAssignedJobs Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.MY_IN_UNASSIGNED_JOB, body, false, token)
    },

    GetMyOutUnassignedJobs(token: string) {
        let body = {}
        AppLogger("GetMyOutUnassignedJobs Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.MY_UNASSIGNED_OUT_JOB, body, false, token)
    },

    GetJobCount(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.JOB_COUNT, body, false, token)
    },

    GetVehichleList(token: string){
        let body={}
        AppLogger("GetVehichleList Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.VEHICLE_LIST, body, false, token)
      },

    CreateBill(token: string, body: any){
        AppLogger("CreateBill Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CREATE_BILL, body, false, token)
    }, 

    CompleteJob(token: string, body: any){
        AppLogger("CompleteJob Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.COMPLETE_JOB, body, false, token)
    },

    AcceptJob(token: string, body: object){
        AppLogger("AcceptJob Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.ACCEPT_JOB, body, false, token)
    },

    CancelJob(token: string, reason: string, jobId: string, name: string){
        let body={
          reasone: reason,
          jobId: jobId,
          status: true,
          CancelledBy : name
        }
        AppLogger("CancelJob Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CANCEL_JOB, body, false, token)
      },

    RatingJob(token: string){
        let body={}
        AppLogger("RatingJob Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.GIVE_RATING, body, false, token)
      },

    GetRating(token: string, driverId: string){
        let body={ driverId }
        AppLogger("GetRating Request Body", body)
        return NetworkManager.POST(ApiConstants.GET_RATING, body, false, token)
      },
      GetJobPrice(token: string, body: object){
        AppLogger("GetJobPrice Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.JOB_PRICE, body, false, token)
      },
  
      //for hotshots
      CreateHotshot(body: any, token: string){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CREATE_HOTSHOT, body, false, token)
      },

      GetHotshotList(token: string,){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.GET_HOTSHOT_LIST, {}, false, token)
      },

      GetPastHotshotList(token: string,){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.GET_PAST_HOTSHOT_LIST, {}, false, token)
      },
      
      CancelHotshot(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CANCEL_HOTSHOT, body, false, token)
      },

      FinishHotshot(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.FINISH_HOTSHOT, body, false, token)
      },

      GetHotshotDetails(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.HOTSHOT_DETAILS, body, false, token)
      },

      AcceptProposal(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.ACCEPT_PROPOSAL, body, false, token)
      },

      GetProposalsList(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.GET_PROPOSAL_LIST, body, false, token)
      },

      GetChat(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.GET_CHAT, body, false, token)
      },

      GetHotshotPrice(token: string, body: object){
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.HOTSHOT_PRICE, body, false, token)
      },
      


      //contacts
    GetContactsListing(token: string) {
        let body = {}
        AppLogger("GetContactsListing Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.CONTACT_LIST, body, false, token)
    },

    AddContact(token: string, contactInfo: any) {
        let body = contactInfo
        AppLogger("AddContact Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.ADD_CONTACT, body, false, token)
    },

    UpdateContact(token: string, contactInfo: any) {
        let body = contactInfo
        AppLogger("UpdateContact Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.UPDATE_CONTACT, body, false, token)
    },

    DeleteContact(token: string, id: string) {
        let body = { id }
        AppLogger("DeleteContact Request Body", body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.DELETE_CONTACT, body, false, token)
    },

//for notifications
    GetNotifications(token: string){
      let body = {}
      AppLogger("GetNotifications request body",body)
      return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.NOTIFICATION, body, false, token)
    },

    DeleteNotifications(token: string, notificationId: string){
        let body = {
          id: notificationId
        }
        AppLogger("DeleteNotifications request body",body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.DELETE_NOTIFICATION, body, false, token)
      },

    ReadNotifications(token: string, notificationId: string){
        let body = {
          id: notificationId
        }
        AppLogger("ReadNotifications request body",body)
        return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.READ_NOTIFICATION, body, false, token)
      },

      UpdateFcm(token: string, body: object){ 
      AppLogger("UpdateFcm request body",body)
      return NetworkManager.POST(ApiConstants.BASE_URL + ApiConstants.UPDATE_FCM, body, false, token)
    },
      

}