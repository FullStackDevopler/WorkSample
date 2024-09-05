import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  GENDER_OPTIONS,
  TABLE_ACTION,
  TRUNCATE_LENGTH,
} from "constants/common";

export const getToast = (type: any, message: any) => {
  switch (type) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    default:
      console.log("handle for this");
      return <></>;
  }
};

export const getDateFromObject = (date: any) => {
  const dateObject = dayjs(date);
  const newDate = dateObject.format("DD-MM-YYYY");

  if (
    newDate === "" ||
    newDate === "NaN" ||
    newDate === undefined ||
    newDate === "Invalid Date"
  ) {
    return "-";
  } else {
    return newDate;
  }
};

export const getGenderById = (value: any) => {
  return GENDER_OPTIONS.filter((obj, i, arr) => obj.value === value);
};

export const getAgeByDOB = (dob: any) => {
  const dobParts = dob.split("/");
  const dobYear = parseInt(dobParts[0]);
  const dobMonth = parseInt(dobParts[1]) - 1;
  const dobDay = parseInt(dobParts[2]);

  const dobDate = new Date(dobYear, dobMonth, dobDay);

  const currentDate = new Date();
  let age: any = currentDate.getFullYear() - dobDate.getFullYear();
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    age--;
  }
  if (age === null || isNaN(age) || age === undefined || age === "") {
    return "-";
  } else {
    return age;
  }
};

export const TruncatedText = (text: any): string => {
  if (text.length <= TRUNCATE_LENGTH) {
    return text;
  } else {
    return text.substring(0, TRUNCATE_LENGTH) + "...";
  }
};

export const getIconType = (value: any, obj: any) => {
  if (value === null) {
    return obj?.icon;
  } else if (value === true && obj?.actionKey === TABLE_ACTION.ACCEPT) {
    return obj?.disabledIcon;
  } else if (value === false && obj?.actionKey === TABLE_ACTION.REJECT) {
    return obj?.disabledIcon;
  } else if (value === false && obj?.actionKey === TABLE_ACTION.ACCEPT) {
    return obj?.icon;
  } else if (value === true && obj?.actionKey === TABLE_ACTION.REJECT) {
    return obj?.icon;
  }
};

export const getClickByType = (value: any, obj: any) => {
  if (value === null) {
    return true;
  } else if (value === true && obj?.actionKey === TABLE_ACTION.ACCEPT) {
    return false;
  } else if (value === false && obj?.actionKey === TABLE_ACTION.REJECT) {
    return false;
  } else if (value === false && obj?.actionKey === TABLE_ACTION.ACCEPT) {
    return true;
  } else if (value === true && obj?.actionKey === TABLE_ACTION.REJECT) {
    return true;
  }
};
