import exp from "constants";
import styled from "styled-components";

interface IProps {
  isActive?: boolean;
  color?: string;
}
export const UserWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: white;
  border-radius: 16px;
  .img-start {
    align-items: start !important;
    padding-bottom: 30px;
  }
  .customeStyle {
    justify-content: start;
    padding-left: 50px;
    gap: 100px;
  }
`;

export const DetailsWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  align-items: center;
  .styleDate {
    border: none;
    width: 100%;

    &:hover {
      border: none;
      outline: none !important;
    }
  }
`;

export const TabTitle = styled.div`
  font-weight: 700 !important;
`;

export const ImageWrapper = styled.div`
  padding: 20px 0px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Details = styled.div`
  flex: 1;
  display: flex;
  gap: 40px;
  flex-direction: column;
  padding: 30px 20px;
  box-sizing: border-box;
  padding-left: 50px;
`;

export const Label = styled.div`
  width: fit-content;
  display: flex;
  color: #a1a1a1;
  gap: 10px;
`;

export const Data = styled.div`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  min-width: 150px;
  max-width: 220px;
  flex-wrap: wrap;
  @media (max-width: 1500px) {
    max-width: 300px;
  }
`;

export const AddressData = styled.div`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  width: 320px;
  flex-wrap: wrap;
  @media (max-width: 1500px) {
    max-width: 300px;
  }
`;

export const Wrapper1 = styled.div`
  width: 95%;
  align-items: center;
  gap: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const Wrapper2 = styled.div`
  width: 95%;
  align-items: center;
  gap: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const VahicleWrapper = styled.div`
  width: 100%;
  align-items: center;
  gap: 70px;
  padding-left: 40px;
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
  @media (max-width: 1500px) {
    gap: 50px;
  }
`;

export const DocumentsWrapper = styled.div`
  width: 95%;
  align-items: center;
  gap: 30px;
  padding-top: 30px;
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .doc {
    padding: 10px 20px;
  }
`;

export const DocumnetsContainer = styled.div`
  width: 100%;
  align-items: center;
  gap: 30px;
  display: flex;
  padding: 0 20px;
  flex-wrap: wrap;
`;

export const DocsWrap = styled.div`
  width: 100%;
  max-width: 280px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px dashed #cacaca;
  border-radius: 6px;
  padding: 0 20px;
  .pdf {
    width: 40px !important;
    height: 40px !important;
  }
  @media (max-width: 1500px) {
    max-width: 240px;
  }
`;

export const PdfWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PdfDetail = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const Type = styled.div``;
export const Size = styled.div``;
export const TrackWrapper = styled.div`
  width: 95%;
  /* gap: 10px; */
  padding-top: 30px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .doc {
    padding: 10px 20px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  min-width: 150px;
  flex-wrap: wrap;
  .custumImage {
    width: 20px;
    height: 20px;
  }
  @media (max-width: 1500px) {
    min-width: 150px;
  }
`;

export const AddressWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  min-width: 250px;
  flex-wrap: wrap;
  .custumImage {
    width: 20px;
    height: 20px;
  }
`;

export const Place = styled.div`
  font-weight: 500;
  font-size: 16px;
  padding: 10px 10px;
`;
export const TractLine = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Line = styled.div<IProps>`
  width: 100%;
  flex: 100%;
  max-width: 100%;
  min-width: 150px;
  border: 1px dashed;

  border-color: ${(props) => props.color};
`;
export const IconWrap = styled.div`
  position: absolute;
  .truck {
    width: 50px;
    height: 50px;
  }
  .truck2 {
    width: 50px;
    height: 30px;
  }
`;
export const TrackConainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 10px;
  align-items: center;
  justify-content: space-between;
`;
export const Destination = styled.div``;
export const Location = styled.div`
  padding: 10px 0;
  width: 100%;
  max-width: 200px;
  min-width: 100px;
  .smallText {
    font-size: 12px;
  }
`;
export const LocationText = styled.div<IProps>`
  color: ${(props) => props.color};
  font-weight: 500;
`;

export const LineWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Dot = styled.div<IProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const StateLine = styled.div<IProps>`
  width: 100%;
  max-width: 150px;
  height: 3px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${(props) => props.color};
  position: absolute;
  left: 15px;
`;
export const Image = styled.img`
  width: 180px;
  height: 185px;
  border-radius: 15px;
`;

export const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .ant-tabs-ink-bar .ant-tabs-ink-bar-animated {
    display: none !important;
  }

  .ant-tabs-nav {
    width: fit-content !important;
  }

  .tablist {
    background-color: white !important;
    gap: 0 !important;
    border: 1px solid yellow !important;
  }

  .ant-tabs-nav-wrap {
    border-radius: 30px !important;
  }

  .ant-tabs-nav-list {
    background-color: white !important;
    border-radius: 30px !important;
  }

  .ant-tabs-tab {
    opacity: 1 !important;
    border: none !important;
    background-color: white !important;
    border-radius: 30px;
    height: 53px;
    min-width: 150px;
  }

  .ant-tabs-tab-btn {
    width: 100% !important;
    text-align: center !important;
    font-weight: 500 !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active {
    background-color: #f7931e !important;
    border-radius: 30px !important;
    .ant-tabs-tab-btn {
      color: white !important;
    }
  }
`;

export const ButtonWrapper = styled.div`
  border-radius: 30px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabButton = styled.div<IProps>`
  border-radius: 30px;
  height: 53px;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "white" : "black")};
  background-color: ${(props) => (props.isActive ? "#f7931e" : "transparent")};
`;

export const Stops = styled.div`
  width: 100%;
  text-align: center;
`;
