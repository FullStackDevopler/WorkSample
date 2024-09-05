import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  height: auto;
  /* gap: 80px; */
  padding-bottom: 80px;
`;

export const Wrapper = styled.div`
  width: 85%;
  display: flex;
  padding-top: 40px;
  flex-direction: column;
`;

export const Title = styled.div`
  width: auto;
  font-size: 28px;
  font-weight: 700;
`;

export const Title2 = styled.div`
  width: auto;
  font-size: 22px;
  font-weight: 700;
  padding-top: 20px;
`;

export const Content = styled.div`
  width: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 22px;
`;
export const ImageWrapper = styled.div`
  width: 50%;
  padding-top: 50px;
  min-width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 400px;
  height: 450px;
`;

export const InputWrapper = styled.div`
  width: 80%;
`;

export const FormTitle = styled.div`
  width: 100%;
  font-weight: 500;
  padding-top: 40px;
  font-size: 24px;
`;

export const Label = styled.div`
  width: 100%;
  font-weight: 500;
  padding: 10px 0;
  font-size: 15px;
`;

export const SubmitButton = styled.button`
  border: none;
  width: 520px;
  height: 63px;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #f7931e;
  padding: 0 20px;
  border-radius: 35px;
  margin-top: 15px;
  cursor: pointer;
`;
