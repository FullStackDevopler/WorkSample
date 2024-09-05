import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required*"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must be on atleast 8 characters, one uppercase letter, one lowercase, one no. and one special character*"
    )
    .required("Required*"),
});

export const otpSchema = Yup.object().shape({
  //   otp: Yup.string().required("Required"),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must be on atleast 8 characters, one uppercase letter, one lowercase, one no. and one special character*"
    )
    .required("Required*"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must be on atleast 8 characters, one uppercase letter, one lowercase, one no. and one special character*"
    )
    .required("New password is required*"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match*")
    .required("Confirm password is required*"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must be on atleast 8 characters, one uppercase letter, one lowercase, one no. and one special character*"
    )
    .required("password is required*"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match*")
    .required("Confirm password is required*"),
});
