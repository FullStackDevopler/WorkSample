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
import { Container, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { UserComponent } from "components/userDetail";
import { Documents } from "components/documents";
import { FaTruckFast } from "react-icons/fa6";
import { Confirmation, Reason } from "styles/cancelledJob";
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
const TodayJobdetail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Wrapper>
        <TopSection>
          <Title>Today's Job Details</Title>
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
              <NameText>Driver details</NameText>
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
            <Documents />
          </UserWrapper>

          <UserWrapper>
            <NameWrap>
              <NameText>User details</NameText>
            </NameWrap>
            <UserComponent />
            <Documents />
          </UserWrapper>
        </InnerContainer>
      </Wrapper>
    </Container>
  );
};

export default TodayJobdetail;
