import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  /* gap: 80px; */
`;

export const AmountWrapper = styled.div`
  width: 85%;
  display: flex;
  padding-bottom: 10px;
  gap: 30px;
  flex-direction: column;
  .barchart {
    height: 320px !important;
    display: flex;
    align-items: center;
  }

  .ear {
    border-radius: 16px !important;
  }
`;

export const Title = styled.div`
  width: auto;
  font-size: 28px;
  font-weight: 700;
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  @media (max-width: 1750px) {
    gap: 20px;
    justify-content: center;
  }
`;
export const Card = styled.div`
  flex: 1;
  background-color: white;
  min-width: 145px;
  max-width: 230px;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Icone = styled.img`
  width: 30%;
  max-width: 40px;
  height: auto;
  padding-bottom: 1em;
`;

export const CardTitle = styled.div`
  width: 100%;
  font-size: 15px;
  height: 2.5em;
  font-weight: 500;
  color: #333333;
  display: flex;
  flex-wrap: wrap;
`;

export const Ammount = styled.div`
  width: 100%;
  font-size: 21px;
  font-weight: 500;
  color: #333333;
`;

export const UserWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow: hidden;
`;

export const BarChartWrappeer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: white !important;
  gap: 20px;
`;

export const BarWrapper = styled.div`
  display: flex;
  width: fit-content;
  font-weight: 700;
`;

export const RightContent = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  padding-right: 50px;
  gap: 50px;
  font-weight: 700;
`;

export const BarColor = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  background-color: #f7931e;
  border-radius: 5px;
  margin-right: 10px;
`;

export const FilterWrapper = styled.p`
  width: 100px;
  padding: 6px;
  border-radius: 10px;
  background-color: #f6f6f6;
  text-align: center;
  color: #1a2b88;
  font-weight: 700;
  cursor: pointer;
`;
export const SuggetionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChartWrappeer = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  gap: 30px;
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

  /* .ant-table-thead tr td {
    font-weight: 700;
  } */

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

export const Amount = styled.div`
  align-self: right;
  padding-right: 100px;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-weight: 400;
    font-size: 16px;
    font-weight: 500;
    padding-right: 10px;
  }
`;

export const BlockButton = styled.div`
  width: 100px;
  padding: 5px 20px;
  font-weight: 500;
  border-radius: 5px;
  text-align: center;
  color: rgba(22, 192, 152, 1);
  background-color: rgba(22, 192, 152, 0.2);
  cursor: pointer;
`;

export const PendingButton = styled.div`
  width: 100px;
  padding: 5px 20px;
  font-weight: 500;
  border-radius: 5px;
  text-align: center;
  color: rgba(22, 192, 152, 1);
  background-color: rgba(155, 192, 22, 0.2);
  cursor: pointer;
`;

export const ActionWrap = styled.div`
  width: 300px;
  border: 1px solid !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

export const UnBlockButton = styled.div`
  width: 100px;
  padding: 5px 20px;
  border-radius: 5px;
  text-align: center;
  color: rgba(92, 92, 92, 1);
  background-color: rgba(175, 175, 175, 0.2);
  cursor: pointer;
`;

export const Action = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 16px;
  color: black !important;
  cursor: pointer;
`;
export const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const PieChartWrapper = styled.div`
  flex: 35%;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 30px;
  width: 100%;
  border-radius: 16px;
  @media (max-width: 1500px) {
    flex: 45%;
  }
`;

export const TableTitle = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  background-color: transparent;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  flex-wrap: wrap;
`;

export const PieTitle = styled.div`
  padding: 20px 20px;
  box-sizing: border-box;
  background-color: transparent;
  display: flex;
  width: 270px;
  font-size: 20px;
  font-weight: 700;
  flex-wrap: wrap;
`;

export const ChartHints = styled.div`
  width: 100%;
  display: flex;
  padding-top: 20px;
  justify-content: center;
  gap: 10px;
`;

export const Quater1 = styled.div`
  padding: 5px 12px;
  box-sizing: border-box;
  background-color: #ff735b;
  align-items: center;
  display: flex;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
  color: white;
`;

export const Quater2 = styled.div`
  padding: 5px 12px;
  align-items: center;
  color: white;
  background-color: #ff9f5b;
  display: flex;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
`;

export const Quater3 = styled.div`
  padding: 5px 12px;
  color: white;
  background-color: #6629eb;
  align-items: center;
  display: flex;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
`;

export const Quater4 = styled.div`
  padding: 5px 12px;
  color: white;
  background-color: #34d1b1;
  align-items: center;
  display: flex;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
`;

export const BreadcrumbWrap = styled.div`
  width: 85%;
`;
