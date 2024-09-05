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
import seprator from "assets/images/seprator.png";
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
import { Line2, Seprators, TrackDetails } from "styles/pages/hotshotManagement";
const AssignedHotShot = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Wrapper>
        <TopSection>
          <Title>Assigned Hotshots Details</Title>
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
                  <div>Date</div>
                </Label>
                <Data>12 Jan. 2024</Data>
              </TextWrapper>
              <TextWrapper>
                <Label>
                  <div>Items</div>
                </Label>
                <Data>20 Boxes</Data>
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

          <UserWrapper>
            <NameWrap>
              <NameText>User Details</NameText>
            </NameWrap>
            <UserComponent image={customerImage} name={"Kerl K. Menon"} />
            <Documents />
            <TrackWrapper>
              {/* <RatingWrap>
                <TableTitle className="doc">Job Detail</TableTitle>
                <Rating>
                  Rating (4.5):
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={4.5}
                    style={{ color: "#F7931E" }}
                  />
                </Rating>
              </RatingWrap> */}
              <TrackConainer>
                <TractLine>
                  <Place>Bosworth</Place>
                  <Line color="#F7931E" />
                  <IconWrap>
                    <img src={truck} width={50} height={50} />
                  </IconWrap>
                  <Place>Hinckley</Place>
                </TractLine>

                <Location>
                  <LocationText color="#01851e">
                    Reached at location
                  </LocationText>
                  <LineWrap>
                    <Dot color="#01851e"></Dot>
                    <StateLine color="#01851e"></StateLine>
                  </LineWrap>
                  <LocationText color="#606161" className="smallText">
                    Arrived at manchester 11:00am
                  </LocationText>
                </Location>
                <Location>
                  <LocationText color="#01851e">Collected</LocationText>
                  <LineWrap>
                    <Dot color="#01851e"></Dot>
                    <StateLine color="#01851e"></StateLine>
                  </LineWrap>
                  <LocationText color="#606161" className="smallText">
                    Collected 25 box from manchester
                  </LocationText>
                </Location>
                <Location>
                  <LocationText color="#01851e">En Route</LocationText>
                  <LineWrap>
                    <Dot color="#01851e"></Dot>
                    <StateLine color="#01851e"></StateLine>
                  </LineWrap>
                  <LocationText color="#606161" className="smallText">
                    en route to southhall
                  </LocationText>
                </Location>
              </TrackConainer>
            </TrackWrapper>
            <Seprators src={seprator} />
          </UserWrapper>
        </InnerContainer>
      </Wrapper>
    </Container>
  );
};

export default AssignedHotShot;
