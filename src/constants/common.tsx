import { TableAction, ActionMenuItem } from "interfaces/iCommon";
import editIcone from "assets/images/edit.png";
import viewIcone from "assets/images/view.png";

export const TABLE_ACTION: TableAction = {
  ADD: "add",
  EDIT: "edit",
  VIEW: "view",
  ACCEPT: "cross",
  REJECT: "check",
};

export const PAGINATION_SIZE = 10;

export const filterInitialValue = {
  date_from: "",
  date_to: "",
  search: "",
};

export const DATE_FILTERS = [
  { key: "date_from", placeholder: "Start date" },
  { key: "date_to", placeholder: "End date" },
];

export const ACTION_MENU: ActionMenuItem[] = [
  { icon: viewIcone, actionKey: TABLE_ACTION.VIEW },
  { icon: editIcone, actionKey: TABLE_ACTION.EDIT },
];

export const GENDER_OPTIONS = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export const TOAST_MESSAGE = {
  NO_INTERNET: "Please check your internet connection",
  WRONG_FILE: "Please choose a valid image format (jpg,jpeg,png,svg)",
  STATUS_CHANGED: "Status updated successfully.",
  UPDATED: "Updated successfully",
  LOGOUT: "Logout successfully",
  OTP_SENT: "OTP sent successfully",
  NO_OTP: "Please enter the OTP",
  LOGIN: "Login successfully",
  SIZE_ERROR: "Image size should not exceed 2MB",
  EMPTY_TEXT: "Please enter some text",
  UN_AUTHORISED: "unauthorised user",
};

export const TRUNCATE_LENGTH = 15;

export const CSM_SLUG_TYPE = {
  ABOUT_US: "about_us",
  TERMS_AND_CONDITIONS: "terms_and_condition",
  PRIVACY_POLICY: "privacy_policy",
};
