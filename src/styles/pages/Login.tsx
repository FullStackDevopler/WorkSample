import exp from "constants";
import { CSSObject } from "react-pro-sidebar";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  position: relative;
`;

export const LoginContainer = styled.div`
  width: 100%;
  padding: 20px;
  /* border: 1px solid black; */
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  width: 164px;
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 15px;
  font-weight: 700;
  font-size: 30px;
  color: #494949;
`;

export const Form = styled.form`
  width: 100%;
  padding-top: 70px;
  z-index: 1;
  height: auto;
  align-items: center;
  justify-content: center;
  gap: 30px;
  display: flex;
  flex-direction: column;
  .otpInput {
    border: 1px solid #a1a1a1;
    width: 65px !important;
    height: 60px !important;
    &:hover {
      border: 1px solid #f7931e;
    }
  }
  .input-otp__field {
    max-width: 65px !important;
    border-radius: 17px !important;
  }
`;

export const InputWrapper = styled.div`
  /* width: 440px; */
  height: 53px;
  align-items: center;
  border: 1px solid #494949;
  border-radius: 35px;
  display: flex;
  padding: 0 20px;
  span {
    font-weight: bold;
  }
`;

export const Wrapper = styled.div`
  width: auto;
  .input {
    width: 477px;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  padding-left: 10px;
  width: 100%;
  font-size: 15px;
  background-color: transparent;
`;

export const Label = styled.div`
  outline: none;
  border: none;
  padding: 10px;
  font-weight: 500;
  font-size: 15px;
`;

export const Button = styled.div`
  background-color: transparent;
  color: white;
`;

export const ButtonWrapper = styled.button`
  width: 518px;
  /* width: 477px; */
  height: 63px;
  align-items: center;
  border: none;
  border-radius: 35px;
  justify-content: center;
  display: flex;
  padding: 0 20px;
  background-color: #f7931e;
  cursor: pointer;
`;
export const ForgetPassword = styled.div`
  color: #f7931e;
  width: 500px;
  text-align: end;
  font-size: 18px;
  font-weight: 500;
  margin: 5px 0;
  cursor: pointer;
`;
