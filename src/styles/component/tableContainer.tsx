import styled from "styled-components";

export const TableWrapper = styled.div`
  flex: 70%;
  box-sizing: border-box;
  padding: 20px 50px;
  background-color: white;
  padding-bottom: 20px;
  border-radius: 16px;
  flex-direction: column;
  .tableStyle {
    height: fit-content;
  }
  @media (max-width: 1500px) {
    flex: 50%;
  }
  .customeFilter {
    justify-content: end;
    gap: 10px;
  }

  th {
    border: none !important;
    padding-left: 10px !important;
    background-color: white !important;
  }

  .ant-table-thead .ant-table-cell {
    color: #949494 !important;
  }

  .ant-table {
    width: 100%;
    min-width: 650px;
    border-radius: 16px;
  }

  .ant-table-thead::before {
    background-color: white !important;
  }

  .ant-table-thead .ant-table-cell {
    font-weight: 600 !important;
  }

  .ant-table-cell {
    font-weight: 400 !important;
    font-size: 14px !important;
    padding: 7px 5px !important;
    border: none !important;
    min-width: 100px;
  }
`;

export const FilterWrapper = styled.div`
  width: 100%;
  padding: 8px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
