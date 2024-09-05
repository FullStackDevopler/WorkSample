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
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import {
  Check,
  CompeteWrap,
  ExtraText,
  ExtraWrap,
  Info,
  Text,
} from "styles/completedJob";
import { useEffect } from "react";
import truck from "assets/images/truck.png";
import { DriverComponent } from "components/driverDetails";
import { Breadcrumb } from "antd";
const CompletedJob = () => {
  const { userId } = useParams();
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
              title: <Link to={"/user-management"}>User Management</Link>,
            },
            {
              title: (
                <Link to={`/user-management/${userId}`}>User Job Detail</Link>
              ),
            },
            {
              title: "Completed Job Details",
            },
          ]}
        />
      </BreadcrumbWrap>
      <Wrapper>
        <TopSection>
          <Title>Completed Job Details</Title>
          <ButtonWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <IoIosArrowBack size={20} />
              <ButtonText> Back</ButtonText>
            </BackButton>
          </ButtonWrapper>
        </TopSection>
        <UserWrapper>
          <ExtraWrap>
            <ExtraText>Driver added £50 Extra</ExtraText>
          </ExtraWrap>
          {/* <UserComponent /> */}
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
              <Data>£200+£50 = £250</Data>
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

                  {/* <FaTruckFast size={45} color="#F7931E" /> */}
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

            <TrackConainer>
              <TractLine>
                <Place>Bosworth</Place>
                <Line color="#606161" />
                <IconWrap>
                  <img src={truck} width={50} height={50} />

                  {/* <FaTruckFast size={45} color="#F7931E" /> */}
                </IconWrap>
                <Place>Southhall</Place>
              </TractLine>

              <Location>
                <LocationText color="#01851e">Reached at location</LocationText>
                <LineWrap>
                  <Dot color="#01851e"></Dot>
                  <StateLine color="#01851e"></StateLine>
                </LineWrap>
                <LocationText color="#01851e" className="smallText">
                  Arrived at manchester 11:00am
                </LocationText>
              </Location>
              <Location>
                <LocationText color="#01851e">Collected</LocationText>
                <LineWrap>
                  <Dot color="#01851e"></Dot>
                  <StateLine color="#01851e"></StateLine>
                </LineWrap>
                <LocationText color="#01851e" className="smallText">
                  Collected 25 box from manchester
                </LocationText>
              </Location>
              <Location>
                <LocationText color="#01851e">En Route</LocationText>
                <LineWrap>
                  <Dot color="#01851e"></Dot>
                  <StateLine color="#01851e"></StateLine>
                </LineWrap>
                <LocationText color="#01851e" className="smallText">
                  en route to southhall
                </LocationText>
              </Location>
            </TrackConainer>
          </TrackWrapper>
          <CompeteWrap>
            <FaCheckCircle size={50} />
            <Text>Completed Job</Text>
          </CompeteWrap>
        </UserWrapper>
      </Wrapper>
    </Container>
  );
};

export default CompletedJob;
