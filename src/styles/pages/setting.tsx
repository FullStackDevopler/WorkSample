import styled from "styled-components";

export const Editor = styled.div`
  background-color: white;
  box-sizing: border-box;
  /* min-height: 550px; */
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  border-radius: 16px;
  max-width: 1250px;
  width: 100%;
  .customeStyle {
    height: 100%;
    max-height: 60vh;
    border-radius: 5px !important;
    border: 1px solid #e1e1e1;
    span {
      font-size: 18px;
    }
    .ql-snow.ql-toolbar button svg {
      height: 24px !important;
    }
  }

  .ql-toolbar.ql-snow {
    display: flex;
    gap: 50px;
    padding-left: 30px;
    border: none !important;
  }

  .ql-container.ql-snow {
    border: none !important;
    padding: 20px !important;
    min-height: 400px;
    max-height: 400px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .ql-container.ql-snow::-webkit-scrollbar {
    display: none;
  }

  .ql-toolbar.ql-snow .ql-formats {
    display: flex;
    gap: 10px;
  }
`;

export const SubmitButton = styled.div`
  width: 200px;
  background-color: #f7931e;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  align-items: center;
  height: 40px;
  color: white;
  font-weight: 500;
  border-radius: 25px;
  cursor: pointer;
`;
