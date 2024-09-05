import styled from "styled-components";

export const Wrapper = styled.div`
  width: 85%;
  display: flex;
  gap: 30px;
  flex-direction: column;
  .barchart {
    height: 400px !important;
  }

  .ear {
    border-radius: 16px !important;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: 15px;
  padding: 0 20px;
`;

export const TableWrapper = styled.div`
  flex: 100%;
  background-color: white;
  border-radius: 16px;
  flex-direction: column;
  .tableStyle {
    height: fit-content;
  }

  th {
    border: none !important;
    background-color: white !important;
  }

  .ant-table-thead .ant-table-cell {
    color: #949494 !important;
  }
  .ant-table {
    width: 100%;
    min-width: 700px;
    border-radius: 16px;
  }

  .ant-table-thead::before {
    background-color: white !important;
  }

  .ant-table-cell {
    font-weight: 400 !important;
    font-size: 17px !important;
    padding: 8px 10px !important;
    border: none !important;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const FilterIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const RightSec = styled.div`
  display: flex;
  gap: 30px;
`;

export const Filter = styled.div`
  gap: 10px;
  width: 158px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px 0;
  background-color: #f6f6f6;
  align-self: flex-end;
  border-radius: 10px;
  cursor: pointer;
`;

export const TableTitle = styled.div`
  font-size: 16px;
  color: black;
  font-weight: 700;
`;
export const Tab = styled.div`
  font-weight: 700 !important;
`;
export const Text = styled.div`
  text-align: center;
  color: #f7931e;
  font-size: 14px;
  font-weight: 700;
  padding-right: 5px;
`;

export const DateWrapper = styled.div`
  padding: 10px 20px;
  border-radius: 30px;
  background-color: #f4f4f4;
  .styleDate {
    border: none;
    width: 100%;
    background-color: transparent;
    outline: none !important;
    &:hover {
      border: none;
      outline: none !important;
    }
  }
`;

export const DateContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 100%;
  padding: 20px 0;
  justify-content: space-between;
`;

export const SearchButton = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #f7931e;
  box-sizing: border-box;
  color: white;
`;

export const ModalContent = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 50px;
  gap: 10px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
