import { useState, useEffect } from "react";
import AuthSidebar from "components/authSidebar";
import {
  Container,
  InputWrapper,
  Form,
  Input,
  Label,
  LoginContainer,
  Logo,
  LogoWrapper,
  Title,
  Wrapper,
  Button,
  ButtonWrapper,
  ForgetPassword,
} from "styles/pages/Login";
import logo from "assets/images/Logo.png";
import { CiMail } from "react-icons/ci";
import { TfiKey } from "react-icons/tfi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BackGroundLogo, BackImage } from "styles/verificationStyle";
import backImage from "assets/images/Logo2.png";
import { useNavigate } from "react-router-dom";
import { postApi } from "api/api.client";
import { APIS } from "api/api.constant";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { getToast } from "utils";
import FieldError from "components/fieldError";
import { loginSchema } from "constants/schema";
import { toggleLoader } from "../../../redux/slices/loaderSlice";
import { TOAST_MESSAGE } from "constants/common";
interface initialValues {
  email: string;
  password: string;
}

// email: "kindraadmin@yopmail.com",
// password: "12345678",

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const query = new URLSearchParams(window.location.search);
  const myParam = query.get("success");

  useEffect(() => {
    localStorage.clear();
    if (myParam === "true") {
      getToast("success", TOAST_MESSAGE.LOGOUT);
      navigate("/login");
    }
    if (myParam === "un-auth") {
      getToast("success", TOAST_MESSAGE.UN_AUTHORISED);
      navigate("/login");
    }
  }, []);

  const LOGIN_FORM_FIELDS: {
    name: keyof initialValues;
    label: string;
    icon: JSX.Element;
    type: string;
    hasType?: boolean;
    inputClass: string;
    placeholder: string;
  }[] = [
    {
      name: "email",
      label: "Email",
      icon: <CiMail color="#A1A1A1" size={30} />,
      type: "text",
      inputClass: "input",
      placeholder: "Email",
    },
    {
      name: "password",
      label: "Password",
      icon: <TfiKey color="#A1A1A1" size={30} />,
      type: type,
      hasType: true,
      inputClass: "input",
      placeholder: "Password",
    },
  ];

  const getIconByType = (iconType: any, onIconChange: any) => {
    switch (iconType) {
      case "password":
        return (
          <IoEyeOffOutline
            color="#A1A1A1"
            size={30}
            cursor="pointer"
            onClick={(e: any) => onIconChange(e, "text")}
          />
        );
      case "text":
        return (
          <IoEyeOutline
            color="#A1A1A1"
            size={30}
            cursor="pointer"
            onClick={(e: any) => onIconChange(e, "password")}
          />
        );
      default:
        console.log("Handle the action for ==>", iconType);
        return <></>;
    }
  };

  const onIconChange = (event: any, iconType: any) => {
    setType(iconType);
  };

  const onSubmit = (payload: any) => {
    dispatch(toggleLoader({ loader: true }));
    postApi(APIS.LOGIN, {
      email: payload.email,
      password: payload.password,
    })
      .then((result: any) => {
        getToast("success", TOAST_MESSAGE.OTP_SENT);
        const userData = {
          email: result?.data?.email,
          userId: result?.data?.userId,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/verification");
      })
      .catch((err: any) => {})
      .finally(() => {
        dispatch(toggleLoader({ loader: false }));
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: loginSchema,
    enableReinitialize: true,
  });

  const { handleSubmit, errors, values, setFieldValue, touched, setTouched } =
    formik;

  return (
    <Container>
      <BackGroundLogo>
        <BackImage src={backImage} />
      </BackGroundLogo>
      <LoginContainer>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <Title>Sign in your account</Title>
        <Form onSubmit={handleSubmit}>
          {LOGIN_FORM_FIELDS.map((fieldObj, i, arr) => {
            return (
              <Wrapper key={`${fieldObj?.label}-${i}`}>
                <Label>{fieldObj?.label}</Label>
                <InputWrapper className={fieldObj?.inputClass}>
                  {fieldObj?.icon}
                  <Input
                    onBlur={() =>
                      setTouched({ ...touched, [fieldObj?.name]: true })
                    }
                    value={values?.[fieldObj?.name]}
                    name={fieldObj?.name}
                    type={fieldObj?.type}
                    placeholder={fieldObj?.placeholder}
                    onChange={(event) => {
                      setFieldValue(fieldObj?.name, event.target.value);
                    }}
                  />
                  {fieldObj?.hasType && getIconByType(type, onIconChange)}
                </InputWrapper>
                <FieldError
                  width="500px"
                  fieldName={fieldObj?.name}
                  errors={errors}
                  touched={touched}
                />
              </Wrapper>
            );
          })}
          <ForgetPassword onClick={() => navigate("/forgotPassword")}>
            Forgot Password
          </ForgetPassword>
          <ButtonWrapper type="submit">
            <Button>Login</Button>
          </ButtonWrapper>
        </Form>
      </LoginContainer>
      <AuthSidebar />
    </Container>
  );
};

export default Login;
