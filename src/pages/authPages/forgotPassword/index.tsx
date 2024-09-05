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
import { useState } from "react";
import { BackText, SubmitButtonWrapper } from "styles/forgotPasswordStyle";
import { BackGroundLogo, BackImage } from "styles/verificationStyle";
import backImage from "assets/images/Logo2.png";
import { useNavigate } from "react-router-dom";
const ForgotPasword = () => {
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  return (
    <Container>
      <BackGroundLogo>
        <BackImage src={backImage} />
      </BackGroundLogo>
      <LoginContainer>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <Title>Forgot Password</Title>
        <Form>
          <Wrapper>
            <Label>Email</Label>
            <InputWrapper className="input">
              <CiMail color="#A1A1A1" size={30} />
              <Input type="email" placeholder="Email" />
            </InputWrapper>
          </Wrapper>
          <SubmitButtonWrapper>
            <Button onClick={() => navigate("/reset-password")}>Submit</Button>
          </SubmitButtonWrapper>
          <BackText onClick={() => navigate("/login")}>
            Back To <span>Login</span>
          </BackText>
        </Form>
      </LoginContainer>
      <AuthSidebar />
    </Container>
  );
};

export default ForgotPasword;
