import { useEffect, useState } from "react";
import AuthSidebar from "components/authSidebar";
import {
  Container,
  Form,
  LoginContainer,
  Logo,
  LogoWrapper,
  Title,
  Wrapper,
  Button,
  ButtonWrapper,
} from "styles/pages/Login";
import logo from "assets/images/Logo.png";
import backImage from "assets/images/Logo2.png";
import {
  BackGroundLogo,
  BackImage,
  ResendText,
  SuggetionText,
  Timer,
} from "styles/verificationStyle";
import { InputOTP } from "antd-input-otp";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { otpSchema } from "constants/schema";
import { APIS } from "api/api.constant";
import { postApi } from "api/api.client";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { getToast } from "utils";
import { toggleLoader } from "../../../redux/slices/loaderSlice";
import { TOAST_MESSAGE } from "constants/common";

const TIME_COUNT = 30;
interface initialValues {
  otp: object;
}

interface UserData {
  email: string;
  userId: string;
}
const initialValues = {
  otp: [],
};

const Verification = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(TIME_COUNT);
  const [startCounter, setStartCounter] = useState(false);
  const dispatch = useDispatch();

  const onSubmit: any = (payload: any, { resetForm }: any) => {
    if (payload?.otp?.length < 6 || payload?.otp?.includes("")) {
      getToast("error", TOAST_MESSAGE.NO_OTP);
      resetForm();
    } else {
      dispatch(toggleLoader({ loader: true }));
      let apiPayload = {};
      let userDataString = localStorage.getItem("userData");
      if (userDataString) {
        let userData: UserData = JSON.parse(userDataString);
        apiPayload = {
          email: userData.email,
          userId: userData.userId,
          otp: payload.otp.join(""),
        };
      }
      postApi(APIS.VERIFY_OTP, {
        ...apiPayload,
      })
        .then((result: any) => {
          const { username, email, isAdmin, role, userId } = result?.data?.user;
          dispatch(
            setUser({
              token: result?.data?.accessToken,
              name: username || "Admin",
              email: email,
              isAdmin: isAdmin,
              role: role,
              userId: userId,
            })
          );
          getToast("success", TOAST_MESSAGE.LOGIN);
          navigate("/dashboard");
          resetForm();
        })
        .catch((err: any) => {})
        .finally(() => {
          dispatch(toggleLoader({ loader: false }));
        });
    }
  };

  const onResendClick = () => {
    dispatch(toggleLoader({ loader: true }));
    let userDataString = localStorage.getItem("userData");
    if (userDataString) {
      let userData: UserData = JSON.parse(userDataString);
      postApi(APIS.RESEND_OTP, {
        ...userData,
      })
        .then((result: any) => {
          getToast("success", TOAST_MESSAGE.OTP_SENT);
          setStartCounter(!startCounter);
          setCounter(TIME_COUNT);
        })
        .catch((err: any) => {})
        .finally(() => {
          dispatch(toggleLoader({ loader: false }));
        });
    }
  };

  const getTimeUI = (time: any) => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return (
      <>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </>
    );
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: otpSchema,
    enableReinitialize: true,
  });
  const { handleSubmit, errors, values, setFieldValue, touched, setTouched } =
    formik;

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else {
      setFieldValue("otp", []);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [counter, startCounter]);

  return (
    <Container>
      <BackGroundLogo>
        <BackImage src={backImage} />
      </BackGroundLogo>
      <LoginContainer>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <Title style={{ paddingTop: "40px" }}>Verification</Title>
        <SuggetionText>
          Please enter the verification code that we have send to your
          registered email id
        </SuggetionText>
        <Form onSubmit={handleSubmit}>
          <Wrapper>
            <InputOTP
              disabled={counter === 0 ? true : false}
              value={values?.otp}
              name="otp"
              inputType="numeric"
              length={6}
              inputClassName={"otpInput"}
              onChange={(data) => {
                setFieldValue("otp", data);
              }}
            />
          </Wrapper>
          <Timer style={{ padding: "15px 0px" }}>{getTimeUI(counter)}</Timer>
          <ButtonWrapper type="submit">
            <Button>Verify</Button>
          </ButtonWrapper>
          <ResendText>
            Didn’t received code?{" "}
            <span
              onClick={counter === 0 ? onResendClick : undefined}
              style={{
                textDecoration: "underline",
                cursor: counter === 0 ? "pointer" : "text",
              }}
            >
              Re-send
            </span>
          </ResendText>
        </Form>
      </LoginContainer>
      <AuthSidebar />
    </Container>
  );
};

export default Verification;
