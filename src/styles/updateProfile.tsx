import styled from "styled-components";

export const ChangeText = styled.div`
  color: #0052b0;
  font-size: 16px;
  padding: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

export const Textarea = styled.textarea`
  color: #0052b0;
  font-size: 18px;
  padding: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

export const TextareaWrapper = styled.textarea`
  color: #0052b0;
  font-size: 18px;
  padding: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding-left: 50px;
  padding-top: 10px;
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
  .custome {
    width: 100%;
    max-width: 370px;
    margin-top: 20px;
  }

  .custome2 {
    width: 100%;
    max-width: 250px;
    margin-top: 20px;
  }

  @media (max-width: 1500px) {
    .custome {
      width: 100%;
      max-width: 280px;
    }
    .custome2 {
      max-width: 180px;
    }
  }

  .textarea {
    border: 1px solid #494949;
    border-radius: 30px;
    display: flex;
    padding: 10px 20px;
    margin-top: 30px;
  }

  .textarea::placeholder {
    color: #999;
    font-weight: 500; /* Change '#999' to your desired color */
  }

  .ant-select {
    width: 100%;
  }

  .ant-select-single .ant-select-selector {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ConfirmationRow = styled.div`
  display: flex;
  /* width: 100%;
  justify-content: space-between; */
`;
