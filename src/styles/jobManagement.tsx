import styled from "styled-components";

export const NameWrap = styled.div`
  padding-left: 40px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const NameText = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  padding-bottom: 30px;
`;

export const DownloadButton = styled.div`
  gap: 10px;
  width: 168px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  background-color: #26a1f4;
  border-radius: 15px;
  cursor: pointer;
`;

export const DeleteButton = styled.div`
  gap: 10px;
  width: 138px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  background-color: #f34235;
  border-radius: 15px;
  cursor: pointer;
`;

export const DownloadText = styled.div`
  color: white;
`;
