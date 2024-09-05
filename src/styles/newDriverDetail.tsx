import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 30px;
  padding-top: 50px;
  padding-bottom: 20px;
  gap: 30px;
`;

export const RejectButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #f34235;
  width: 230px;
  border-radius: 33px;
  height: 50px;
  color: white;
  justify-content: center;
  cursor: pointer;
  font-size: 22px;
  font-weight: 500;
`;

export const AcceptButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #01851e;
  width: 230px;
  border-radius: 33px;
  height: 50px;
  color: white;
  justify-content: center;
  cursor: pointer;
  font-size: 22px;
  font-weight: 500;
`;
