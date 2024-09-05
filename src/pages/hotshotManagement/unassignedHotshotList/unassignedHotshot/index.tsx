import {
  UserWrapper,
  TextWrapper,
  Label,
  Data,
  VahicleWrapper,
  TrackWrapper,
  TractLine,
  Line,
  Place,
  IconWrap,
  LocationText,
  LineWrap,
  Dot,
  StateLine,
  Location,
  TrackConainer,
} from "styles/commonStyle";
import { Container, TableTitle, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { UserComponent } from "components/userDetail";
import { Documents } from "components/documents";
import {
  BackButton,
  ButtonText,
  ButtonWrapper,
  TopSection,
} from "styles/unAssignedJob";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NameWrap, NameText, InnerContainer } from "styles/jobManagement";
import { DriverComponent } from "components/driverDetails";
import customerImage from "assets/images/customerImage.png";
import { FaTruckFast } from "react-icons/fa6";
import { Rating, RatingWrap } from "styles/driverCompletedJob";
import { Rate } from "antd";
import truck from "assets/images/truck.png";
import seprator from "assets/images/seprator.png";
import { Line2, Seprators, TrackDetails } from "styles/pages/hotshotManagement";
const UnassignedHotShot = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Wrapper>
        <TopSection>
          <Title>Unassigned Hotshots Details</Title>
          <ButtonWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <IoIosArrowBack size={20} />
              <ButtonText> Back</ButtonText>
            </BackButton>
          </ButtonWrapper>
        </TopSection>
        <InnerContainer>
          <UserWrapper>
            <NameWrap>
              <NameText>Driver Detail</NameText>
            </NameWrap>
            <DriverComponent />
            <VahicleWrapper>
              <TextWrapper>
                <Label>
                  <div>Vehicle Type</div>
                </Label>
                <Data>Lotan Van</Data>
              </TextWrapper>
              <TextWrapper>
                <Label>
                  <div>Amount </div>
                </Label>
                <Data>£200</Data>
              </TextWrapper>
              <TextWrapper>
                <Label>
                  <div>Weight </div>
                </Label>
                <Data>4.5T</Data>
              </TextWrapper>
            </VahicleWrapper>
            <Seprators src={seprator} />
            <TrackDetails>
              <TractLine className="trackline">
                <Place>Bosworth</Place>
                <Line2 color="#F7931E" />
                <IconWrap>
                  <img src={truck} width={50} height={50} />
                </IconWrap>
                <Place>Hinckley</Place>
              </TractLine>
            </TrackDetails>
            <Seprators src={seprator} />
          </UserWrapper>
        </InnerContainer>
      </Wrapper>
    </Container>
  );
};

export default UnassignedHotShot;
