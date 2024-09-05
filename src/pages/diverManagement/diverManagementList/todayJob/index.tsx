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
import { BreadcrumbWrap, Container, TableTitle, Title } from "styles/dashboard";
import { Icon, Wrapper } from "styles/pages/userManagement";
import truckicon from "assets/images/truck.png";
import truck2icon from "assets/images/truck2.png";
import { UserComponent } from "components/userDetail";
import { Documents } from "components/documents";
import { FaTruckFast } from "react-icons/fa6";
import {
  BackButton,
  ButtonText,
  ButtonWrapper,
  TopSection,
  UpDateButton,
} from "styles/unAssignedJob";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import truck2 from "assets/images/truck2.png";
import truck from "assets/images/truck.png";
import { Breadcrumb } from "antd";
const DriverTodayJobs = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <BreadcrumbWrap>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to={"/"}>Home</Link>,
            },
            {
              title: (
                <Link to={"/driver-management/List"}>
                  Driver Management List
                </Link>
              ),
            },
            {
              title: (
                <Link to={`/driver-management/${driverId}`}>
                  Driver Details
                </Link>
              ),
            },
            {
              title: "Today's Job Details",
            },
          ]}
        />
      </BreadcrumbWrap>
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
        <UserWrapper>
          <UserComponent />
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

          <TrackWrapper>
            <TableTitle className="doc">Location Detail</TableTitle>
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
                <LocationText color="#01851e">Reached at location</LocationText>
                <LineWrap>
                  <Dot color="#01851e"></Dot>
                  <StateLine color="#01851e"></StateLine>
                </LineWrap>
                <LocationText color="#606161" className="smallText">
                  Arrived at manchester 11:00am
                </LocationText>
              </Location>
              <Location>
                <LocationText color="#F7931E">Collected</LocationText>
                <LineWrap>
                  <Dot color="#F7931E"></Dot>
                  <StateLine color="#F7931E"></StateLine>
                </LineWrap>
                <LocationText color="#606161" className="smallText">
                  Collected 25 box from manchester
                </LocationText>
              </Location>
              <Location>
                <LocationText color="#F7931E">En Route</LocationText>
                <LineWrap>
                  <Dot color="#F7931E"></Dot>
                  <StateLine color="#F7931E"></StateLine>
                </LineWrap>
                <LocationText color="#606161" className="smallText">
                  en route to southhall
                </LocationText>
              </Location>
            </TrackConainer>

            <TrackConainer>
              <TractLine>
                <Place>Bosworth</Place>
                <Line color="#606161" />
                <IconWrap>
                  <img src={truck2} width={50} height={30} />
                  {/* <FaTruckFast size={45} color="#606161" /> */}
                </IconWrap>
                <Place>Southhall</Place>
              </TractLine>

              <Location>
                <LocationText color="#606161">Reached at location</LocationText>
                <LineWrap>
                  <Dot color="#606161"></Dot>
                  <StateLine color="#606161"></StateLine>
                </LineWrap>
                <LocationText color="#606161" className="smallText">
                  Arrived at manchester 11:00am
                </LocationText>
              </Location>
              <Location>
                <LocationText color="#606161">Collected</LocationText>
                <LineWrap>
                  <Dot color="#606161"></Dot>
                  <StateLine color="#606161"></StateLine>
                </LineWrap>
                <LocationText color="#606161" className="smallText">
                  Collected 25 box from manchester
                </LocationText>
              </Location>
              <Location>
                <LocationText color="#606161">En Route</LocationText>
                <LineWrap>
                  <Dot color="#606161"></Dot>
                  <StateLine color="#606161"></StateLine>
                </LineWrap>
                <LocationText color="#606161" className="smallText">
                  en route to southhall
                </LocationText>
              </Location>
            </TrackConainer>
          </TrackWrapper>
        </UserWrapper>
      </Wrapper>
    </Container>
  );
};

export default DriverTodayJobs;
