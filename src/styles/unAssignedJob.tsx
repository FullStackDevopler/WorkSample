import styled from "styled-components";
interface IProps {
  isActive?: boolean;
  color?: string;
}

export const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const BackButton = styled.div`
  width: 123px;
  text-align: center;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f7931e;
  border-radius: 25px;
  cursor: pointer;
  gap: 5px;
`;

export const UpDateButton = styled.div`
  text-align: center;
  width: 150px;
  background-color: #f7931e;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f7931e;
  border-radius: 25px;
  color: white;
  cursor: pointer;
`;
export const UpDateCusButton = styled.button`
  text-align: center;
  width: 150px;
  background-color: #f7931e;
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: center;
  border: 1px solid #f7931e;
  border-radius: 25px;
  color: white;
  cursor: pointer;
`;

export const ButtonText = styled.div`
  height: 23px;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 30px;
  padding: 30px 0;
`;

export const DetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
`;

export const ImageWrapper = styled.div`
  flex: 40%;
  max-width: 500px;
  padding-top: 40px;
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const Details = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  background-color: white;
  .customeStyle {
    width: 200px;
  }
`;

export const Image = styled.img`
  width: 435px;
  height: 450px;
`;

export const UserImage = styled.img`
  width: 92px;
  height: 92px;
  border-radius: 50%;
`;

export const TextWrapper = styled.div``;
export const Text1 = styled.div`
  font-weight: 500;
  font-size: 25px;
`;
export const Text2 = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

export const TractLine = styled.div`
  position: relative;
  padding-top: 20px;

  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
`;

export const DetailCard = styled.div`
  width: 70%;
  border: 2px solid #e2e0e1;
  border-radius: 10px;
`;
export const Head = styled.div`
  background-color: #f7931e;
  border-radius: 10px;
  height: 52px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: white;
  font-size: 20px;
  font-weight: 500;
`;

export const Table = styled.div`
  border-collapse: collapse;
  width: 100%;
  tr:nth-child(even) {
    background-color: #f2f2f2; /* Alternate color for even rows */
  }
`;

export const TableRow = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:nth-child(even) {
    background-color: #f2f2f2; /* Alternate color for even rows */
  }
`;

export const TableCell = styled.td`
  width: 50%;
  padding: 13px 20px;
`;
