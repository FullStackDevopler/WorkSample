import Login from "pages/authPages/login";
import { IRoutes } from "interfaces/iRoutes";
import ForgotPasword from "pages/authPages/forgotPassword";
import Verification from "pages/authPages/verification";
import Dashboard from "pages/dashboard";
import UserManagement from "pages/userManagement";
import { AboutUs } from "pages/setting/aboutUs";
import { TermsAndConditions } from "pages/setting/TermAndCondition";
import { PrivacyPolicy } from "pages/setting/privacyPolicy";
import { ChangePassword } from "pages/setting/changePassword";
import { DriverManagementList } from "pages/diverManagement/diverManagementList";
import { TodayJobs } from "pages/jobsManagement/TodayJobList";
import { UpcomingJobs } from "pages/jobsManagement/upcomingJobsList";
import { PastJobs } from "pages/jobsManagement/pastJobs";
import { UnassignedJobs } from "pages/jobsManagement/unassignedJobs";
import UserJobDetails from "pages/userManagement/userJobDetails";
import UserTodayJobs from "pages/userManagement/userTodayJob";
import { UnAssignedJob } from "pages/userManagement/unassignedJob";
import UpcomingJobDetail from "pages/userManagement/upcomingJobdetails";
import CancelJob from "pages/userManagement/cancelJobDetail";
import CompletedJob from "pages/userManagement/completedJob";
import { UpdateUser } from "pages/userManagement/updateUser";
import DriverJobDetails from "pages/diverManagement/diverManagementList/driverDetail";
import DriverTodayJobs from "pages/diverManagement/diverManagementList/todayJob";
import DriverUpcomingJobDetail from "pages/diverManagement/diverManagementList/upcomingJob";
import DriverCompletedJob from "pages/diverManagement/diverManagementList/completedJob";
import DriverCancelJob from "pages/diverManagement/diverManagementList/cancelledJob";
import { UpdateDriver } from "pages/diverManagement/diverManagementList/updateDriver";
import { default as NewDriverList } from "pages/diverManagement/newDriver/newDriverList";
import NewDriverDetail from "pages/diverManagement/newDriver/newDriverDetail";
import TodayJobdetail from "pages/jobsManagement/TodayJobList/todayJobDetail";
import UpcomingJobdetail from "pages/jobsManagement/upcomingJobsList/upcomingJobDetail";
import CompleteJobdetail from "pages/jobsManagement/pastJobs/completeJobDetails";
import CancelJobDetail from "pages/jobsManagement/pastJobs/cancelledJobDetail";
import AssignedHotShot from "pages/hotshotManagement/assignedHotshotList/assignedHotshot";
import UnassignedHotShot from "pages/hotshotManagement/unassignedHotshotList/unassignedHotshot";
import { AssignedHotshotList } from "pages/hotshotManagement/assignedHotshotList";
import { UnassignedHotshotList } from "pages/hotshotManagement/unassignedHotshotList";
import FinanceManagement from "pages/financeManagement";
import { AboutUsView } from "pages/view/aboutUs";
import { TermsAndConditionsView } from "pages/view/TermsAndConditions";
import { PrivacyPolicyView } from "pages/view/PrivacyPolicy";
import OutUpcomingJobDetail from "pages/diverManagement/diverManagementList/outJob/upcomingJobDetails";
import OutCompletedJob from "pages/diverManagement/diverManagementList/outJob/completedJobDetails";
import OutCancelJob from "pages/diverManagement/diverManagementList/outJob/cancelJobDetails";
import OutTodayJobs from "pages/diverManagement/diverManagementList/outJob/todayJobDetails";
import { DriverUnAssignedJobDetails } from "pages/diverManagement/diverManagementList/unassignedJobs/unassignedJobDetail";
import { DriverUnassignedJobsList } from "pages/diverManagement/diverManagementList/unassignedJobs";
import ResetPassword from "pages/authPages/resetPassword";

export const LoginRoute = {
  path: "/login",
  component: Login,
  restricted: false,
  exact: true,
};

export const ForgotPasswordRoute = {
  path: "/forgotPassword",
  component: ForgotPasword,
  restricted: false,
  exact: true,
};

export const ResetPasswordRoute = {
  path: "reset-password",
  component: ResetPassword,
  restricted: false,
  exact: true,
};

export const VerificationRoute = {
  path: "/verification",
  component: Verification,
  restricted: false,
  exact: true,
};

export const DashboardRoute = {
  path: "/dashboard",
  component: Dashboard,
  restricted: true,
  exact: true,
};

export const UserManagementRoute = {
  path: "/user-management",
  component: UserManagement,
  restricted: true,
  exact: true,
};

export const UserManagementJobRoute = {
  path: "/user-management/:id",
  component: UserJobDetails,
  restricted: true,
  exact: false,
};

export const UserTodayJobRoute = {
  path: "/user-management/:userId/todayJob/:id",
  component: UserTodayJobs,
  restricted: true,
  exact: false,
};

export const UserUnassignedJobRoute = {
  path: "/user-management/:userId/unassignedJob/:id",
  component: UnAssignedJob,
  restricted: true,
  exact: false,
};

export const UserUpcomingdJobRoute = {
  path: "/user-management/:userId/upcoming/:id",
  component: UpcomingJobDetail,
  restricted: true,
  exact: false,
};

export const UserUpdateJobRoute = {
  path: "/user-management/update/:id",
  component: UpdateUser,
  restricted: true,
  exact: false,
};

export const CancelledJobRoute = {
  path: "/user-management/:userId/cancelled/:id",
  component: CancelJob,
  restricted: true,
  exact: false,
};

export const CompletedJobRoute = {
  path: "/user-management/:userId/completed/:id",
  component: CompletedJob,
  restricted: true,
  exact: false,
};

export const DiverManagementListRoute = {
  path: "/driver-management/List",
  component: DriverManagementList,
  restricted: true,
  exact: true,
};

export const DiverJObRoute = {
  path: "/driver-management/:id",
  component: DriverJobDetails,
  restricted: true,
  exact: true,
};

export const DriverUpdateJobRoute = {
  path: "/driver-management/update/:id",
  component: UpdateDriver,
  restricted: true,
  exact: false,
};

export const DiverTodayJObRoute = {
  path: "/driver-management/:driverId/todayJob/:id",
  component: DriverTodayJobs,
  restricted: true,
  exact: true,
};

export const OutTodayJObRoute = {
  path: "/driver-management/:driverId/todayJob/out/:id",
  component: OutTodayJobs,
  restricted: true,
  exact: true,
};

export const DiverupcomingJObRoute = {
  path: "/driver-management/:driverId/upcoming/:id",
  component: DriverUpcomingJobDetail,
  restricted: true,
  exact: true,
};

export const OutupcomingJObRoute = {
  path: "/driver-management/:driverId/upcoming/out/:id",
  component: OutUpcomingJobDetail,
  restricted: true,
  exact: true,
};

export const DiverCompletedJobRoute = {
  path: "/driver-management/:driverId/completed/:id",
  component: DriverCompletedJob,
  restricted: true,
  exact: true,
};

export const OutCompletedJobRoute = {
  path: "/driver-management/:driverId/completed/out/:id",
  component: OutCompletedJob,
  restricted: true,
  exact: true,
};

export const CancelJobRoute = {
  path: "/driver-management/list/:driverId/cancelled/:id",
  component: DriverCancelJob,
  restricted: true,
  exact: true,
};

export const OutJobRoute = {
  path: "/driver-management/:driverId/cancelled/out/:id",
  component: OutCancelJob,
  restricted: true,
  exact: false,
};

export const driveUnassignedJobRoute = {
  path: "/driver-management/:driverId/unassignedJob/:id",
  component: DriverUnassignedJobsList,
  restricted: true,
  exact: true,
};

export const driveUnassignedJobDetailsRoute = {
  path: "/driver-management/:driverId/unassignedJob/:id/:jobId",
  component: DriverUnAssignedJobDetails,
  restricted: true,
  exact: true,
};

export const NewDriverRoute = {
  path: "/new-driver",
  component: NewDriverList,
  restricted: true,
  exact: true,
};

export const NewDriverDetailsRoute = {
  path: "/new-driver/:id",
  component: NewDriverDetail,
  restricted: true,
  exact: true,
};

export const AssignedHotshotRoute = {
  path: "/hotshot-management/assigned",
  component: AssignedHotshotList,
  restricted: true,
  exact: true,
};

export const AssignedHotshotdetailsRoute = {
  path: "/hotshot-management/assigned/:id",
  component: AssignedHotShot,
  restricted: true,
  exact: true,
};

export const UnassignedHotshotRoute = {
  path: "/hotshot-management/unassigned",
  component: UnassignedHotshotList,
  restricted: true,
  exact: true,
};

export const UnassignedHotshotDetailsRoute = {
  path: "/hotshot-management/unassigned/:id",
  component: UnassignedHotShot,
  restricted: true,
  exact: true,
};

export const TodayJobRoute = {
  path: "/job-management/today",
  component: TodayJobs,
  restricted: true,
  exact: true,
};

export const TodayJobDetailRoute = {
  path: "/job-management/today/:id",
  component: TodayJobdetail,
  restricted: true,
  exact: true,
};
export const UpcomingJobRoute = {
  path: "/job-management/upcoming",
  component: UpcomingJobs,
  restricted: true,
  exact: true,
};

export const UpcomingJobDetailsRoute = {
  path: "/job-management/upcoming/:id",
  component: UpcomingJobdetail,
  restricted: true,
  exact: true,
};

export const CompletedJobDetailsRoute = {
  path: "/job-management/job-past/completed/:id",
  component: CompleteJobdetail,
  restricted: true,
  exact: true,
};

export const CancelledJobDetailsRoute = {
  path: "/job-management/job-past/cancelled/:id",
  component: CancelJobDetail,
  restricted: true,
  exact: true,
};

export const PastJobRoute = {
  path: "/job-management/job-past",
  component: PastJobs,
  restricted: true,
  exact: true,
};

export const UnassignedJobRoute = {
  path: "/job-management/unassigned",
  component: UnassignedJobs,
  restricted: true,
  exact: true,
};

export const UnassignedJobDetailsRoute = {
  path: "/job-management/unassigned/:id",
  component: UnAssignedJob,
  restricted: true,
  exact: true,
};

export const FinanceManagementRoute = {
  path: "/finance-management",
  component: FinanceManagement,
  restricted: true,
  exact: true,
};

export const AboutUsRoute = {
  path: "/settings/about-us",
  component: AboutUs,
  restricted: true,
  exact: true,
};

export const AboutUsViewRoute = {
  path: "/about-us/view",
  component: AboutUsView,
  restricted: false,
  exact: true,
};

export const TermsConditionViewRoute = {
  path: "/terms_conditions",
  component: TermsAndConditionsView,
  restricted: false,
  exact: true,
};

export const PrivacyPolicyViewRoute = {
  path: "/privacy-policy",
  component: PrivacyPolicyView,
  restricted: false,
  exact: true,
};

export const TermsConditionRoute = {
  path: "/settings/terms_conditions",
  component: TermsAndConditions,
  restricted: true,
  exact: true,
};

export const PrivacyPolicyRoute = {
  path: "/settings/privacy-policy",
  component: PrivacyPolicy,
  restricted: true,
  exact: true,
};
export const ChangePasswordRoute = {
  path: "/settings/change-password",
  component: ChangePassword,
  restricted: true,
  exact: true,
};

const ROUTES: IRoutes[] = [
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  TodayJobRoute,
  VerificationRoute,
  DashboardRoute,
  UserManagementRoute,
  FinanceManagementRoute,
  AboutUsRoute,
  TermsConditionRoute,
  PrivacyPolicyRoute,
  ChangePasswordRoute,
  AssignedHotshotRoute,
  DiverManagementListRoute,
  NewDriverRoute,
  PastJobRoute,
  UnassignedJobRoute,
  UpcomingJobRoute,
  UserManagementJobRoute,
  UserTodayJobRoute,
  UserUnassignedJobRoute,
  UserUpcomingdJobRoute,
  CancelledJobRoute,
  CompletedJobRoute,
  UserUpdateJobRoute,
  DiverJObRoute,
  DiverTodayJObRoute,
  DiverupcomingJObRoute,
  DiverCompletedJobRoute,
  CancelJobRoute,
  DriverUpdateJobRoute,
  NewDriverDetailsRoute,
  TodayJobDetailRoute,
  UpcomingJobDetailsRoute,
  CompletedJobDetailsRoute,
  CancelledJobDetailsRoute,
  UnassignedJobDetailsRoute,
  UnassignedHotshotRoute,
  AssignedHotshotdetailsRoute,
  UnassignedHotshotDetailsRoute,
  AboutUsViewRoute,
  TermsConditionViewRoute,
  PrivacyPolicyViewRoute,
  driveUnassignedJobRoute,
  OutTodayJObRoute,
  OutupcomingJObRoute,
  OutCompletedJobRoute,
  OutJobRoute,
  driveUnassignedJobDetailsRoute,
];
export default ROUTES;
