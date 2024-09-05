import styled from "styled-components";

export const ModalTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 21px;
`;

export const ButtonWrapper = styled.div`
  padding: 10px 20px;
  border-radius: 30px;
`;

export const Accept = styled.div`
  padding: 10px 20px;
  width: 120px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 30px;
  color: white;
  background-color: #f7931e;
  cursor: pointer;
`;

export const Reject = styled.div`
  padding: 10px 20px;
  width: 120px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 30px;
  color: white;
  height: 40px;
  background-color: #4c4945;
  cursor: pointer;
`;
