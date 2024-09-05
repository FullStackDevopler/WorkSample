import styled from "styled-components";

export const InnerContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: white;
  box-sizing: border-box;
  padding: 20px;

  .customeTable {
    width: 100%;
    padding: 10px;
    .ant-table-cell {
      font-weight: 400 !important;
      font-size: 15px !important;
      padding: 8px 10px !important;
      border: none !important;
    }
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 30px 20px 30px;
  box-sizing: border-box;
`;

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 20px;
  gap: 40px;
`;

export const Image = styled.img`
  width: 450px;
  height: 350px;
`;

export const ComonWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const Label = styled.div`
  width: 100%;
  font-weight: 700;
  padding-bottom: 30px;
  color: black;
`;

export const ImageWrapper = styled.div`
  width: 40%;
  padding-top: 50px;
  min-width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RadioButtons = styled.div`
  font-weight: 600;

  .radio {
    display: flex;
    gap: 30px;
  }
  .radio .ant-radio-checked .ant-radio-inner {
    background-color: green;
    border-color: green;
  }

  .ant-radio-inner:hover {
    border-color: green !important;
  }

  .radio-text {
    font-size: 17px !important;
  }
`;

export const SelectWrap = styled.div`
  width: 520px;
  display: flex;
  justify-content: space-between;
  .select {
    width: 220px;
    padding: 0 5px;
    height: 45px;
    border: 1px solid #a1a1a1;
  }
  .ant-select {
    width: 100%;
  }
  .ant-select-selector {
    width: 100%;
    height: 100%;
    border: none !important;
    outline: none !important;
  }

  .ant-select-active {
    border: none !important;
    box-shadow: none !important;
  }
  .ant-select-outlined {
    border: none !important;
    box-shadow: none !important;
  }

  .custome-select > * {
    box-shadow: none !important;
    span {
      color: black !important;
      font-weight: 600 !important;
    }
  }
`;
export const PaymentWrapper = styled.div`
  background-color: #eefff1;
  margin-top: 20px;
  color: #48c664;
  width: 375px;
  height: 108px;
  border-radius: 10px;
  border: 1px solid #48c664;
  /* box-sizing: border-box; */
  padding: 5px;
  gap: 10px;
`;

export const Late = styled.div`
  color: #48c664;
  font-weight: 500;
`;

export const AmountWrap = styled.div`
  width: 100%;
  padding-right: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;
`;

export const Amount = styled.div`
  font-weight: 700;
  color: black;
`;
export const Text = styled.div`
  color: #848382;
  font-size: 14px;
`;

export const Download = styled.div`
  color: #848382;
  display: flex;
  align-items: center;
`;

export const DownloadText = styled.div`
  color: #26a1f4;
  font-size: 14px;
`;

export const InvoiceWrapper = styled.div`
  color: #26a1f4;
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 14px;
  gap: 50px;
  padding-right: 30px;
  padding-top: 15px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const TotalAmount = styled.div`
  color: black;
  display: flex;
  justify-content: flex-end;
  font-size: 24px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  span {
    font-weight: 700;
    padding-left: 10px;
  }
`;

export const Button = styled.div`
  color: white;
  width: 200px;
  text-align: center;
  justify-items: center;
  height: 50px;
  background-color: #01851e;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
`;
