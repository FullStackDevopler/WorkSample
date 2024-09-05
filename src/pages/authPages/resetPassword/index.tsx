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
} from "styles/pages/Login";
import logo from "assets/images/Logo.png";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { SubmitButtonWrapper } from "styles/forgotPasswordStyle";
import { BackGroundLogo, BackImage } from "styles/verificationStyle";
import backImage from "assets/images/Logo2.png";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { TfiKey } from "react-icons/tfi";
import { useFormik } from "formik";
import { resetPasswordSchema } from "constants/schema";
import FieldError from "components/fieldError";
import { useSearchParams } from "react-router-dom";
import { postApi } from "api/api.client";
import { APIS } from "api/api.constant";
import { getToast } from "utils";
import { TOAST_MESSAGE } from "constants/common";
import Loader from "components/loader";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [iconType, setIconType] = useState<{ [key: string]: string }>({
    password: "password",
    confirmPassword: "password",
  });

  const RESET_FORM_FIELDS = [
    {
      label: "Email",
      type: "email",
      inputClass: "input",
      placeholder: "Email",
      name: "email",
      isDisable: true,
      icon: <CiMail color="#A1A1A1" size={30} />,
    },
    {
      label: "Password",
      type: iconType.password,
      inputClass: "input",
      placeholder: "Password",
      icon: <TfiKey color="#A1A1A1" size={30} />,
      typeKey: "password",
      hasType: true,
      name: "password",
    },
    {
      label: "Confirm Password",
      type: iconType.confirmPassword,
      inputClass: "input",
      placeholder: "Confirm Password",
      icon: <TfiKey color="#A1A1A1" size={30} />,
      typeKey: "confirmPassword",
      name: "confirmPassword",
      hasType: true,
    },
  ];

  const getIconByType = (iconType: string, iconKey: string) => {
    switch (iconType) {
      case "password":
        return (
          <IoEyeOffOutline
            color="#A1A1A1"
            size={30}
            cursor="pointer"
            onClick={() => onIconChange("text", iconKey)}
          />
        );
      case "text":
        return (
          <IoEyeOutline
            color="#A1A1A1"
            size={30}
            cursor="pointer"
            onClick={() => onIconChange("password", iconKey)}
          />
        );
      default:
        console.log("Handle the action for ==>", iconType);
        return null;
    }
  };

  const onIconChange = (type: string, iconKey: string) => {
    setIconType({ ...iconType, [iconKey]: type });
  };

  const onSubmit = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    postApi(APIS.LOGIN, {
      // email: payload.email,
      // password: payload.password,
    })
      .then((result: any) => {
        getToast("success", TOAST_MESSAGE.UPDATED);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
    console.log(values, token);
  };

  const formik = useFormik({
    initialValues: { email: email || "", password: "", confirmPassword: "" },
    onSubmit: onSubmit,
    validationSchema: resetPasswordSchema,
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    errors,
    values,
    setFieldValue,
    touched,
    setTouched,
  }: any = formik;

  return (
    <>
      {loading && <Loader />}
      <Container>
        <BackGroundLogo>
          <BackImage src={backImage} />
        </BackGroundLogo>
        <LoginContainer>
          <LogoWrapper>
            <Logo src={logo} />
          </LogoWrapper>
          <Title>Reset Password</Title>
          <Form onSubmit={handleSubmit}>
            {RESET_FORM_FIELDS.map((fieldObj, i) => (
              <Wrapper key={fieldObj.name}>
                <Label>{fieldObj.label}</Label>
                <InputWrapper className={fieldObj.inputClass}>
                  {fieldObj.icon}
                  <Input
                    onBlur={() =>
                      setTouched({ ...touched, [fieldObj.name]: true })
                    }
                    value={values?.[fieldObj.name] ?? ""}
                    name={fieldObj.name}
                    type={fieldObj.type}
                    placeholder={fieldObj.placeholder}
                    disabled={fieldObj.isDisable}
                    onChange={(event) => {
                      setFieldValue(fieldObj?.name, event.target.value);
                    }}
                  />
                  {fieldObj.hasType &&
                    getIconByType(fieldObj.type, fieldObj.typeKey)}
                </InputWrapper>
                <FieldError
                  width="500px"
                  fieldName={fieldObj.name}
                  errors={errors}
                  touched={touched}
                />
              </Wrapper>
            ))}
            <SubmitButtonWrapper type="submit">
              <Button>Submit</Button>
            </SubmitButtonWrapper>
          </Form>
        </LoginContainer>
        <AuthSidebar />
      </Container>
    </>
  );
};

export default ResetPassword;
