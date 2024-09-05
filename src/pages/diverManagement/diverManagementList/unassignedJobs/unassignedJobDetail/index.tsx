import { BreadcrumbWrap, Container, Title } from "styles/dashboard";
import {
  Details,
  DetailsWrapper,
  ImageWrapper,
  InnerWrapper,
  Image,
  UserWrapper,
  UserImage,
  TextWrapper,
  Text1,
  Text2,
  TractLine,
  DetailCard,
  Head,
  Table,
  TableRow,
  TableCell,
  TopSection,
  BackButton,
  ButtonText,
  UpDateButton,
  ButtonWrapper,
} from "styles/unAssignedJob";
import fram1 from "assets/images/fram1.png";
import userImage from "assets/images/userImage.png";
import { IoIosArrowBack } from "react-icons/io";
import { Icon, Wrapper } from "styles/pages/userManagement";
import truckicon from "assets/images/truck.png";
import { IconWrap, Line, Place } from "styles/commonStyle";
import { Documents } from "components/documents";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
export const DriverUnAssignedJobDetails = () => {
  const { driverId, id } = useParams();
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
              title: (
                <Link to={`/driver-management/${driverId}/unassignedJob/${id}`}>
                  Unassigned Job List
                </Link>
              ),
            },
            {
              title: "Unassigned Job Detail",
            },
          ]}
        />
      </BreadcrumbWrap>
      <Wrapper>
        <TopSection>
          <Title>Un Assigned Job Detail</Title>
          <ButtonWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <IoIosArrowBack size={20} />
              <ButtonText> Back</ButtonText>
            </BackButton>
          </ButtonWrapper>
        </TopSection>
        <InnerWrapper>
          <DetailsWrapper>
            <ImageWrapper>
              <Image src={fram1} />
            </ImageWrapper>
            <Details>
              <UserWrapper>
                <UserImage src={userImage} />
                <TextWrapper>
                  <Text1>Jennifer Levine</Text1>
                  <Text2>Searching driver near by..</Text2>
                </TextWrapper>
              </UserWrapper>
              <TractLine>
                <Place>Bosworth</Place>
                <Line color="#F7931E" className="customeStyle" />
                <IconWrap>
                  <Icon src={truckicon} className="truck" />
                </IconWrap>
                <Place>Hinckley</Place>
              </TractLine>
              <DetailCard>
                <Head>Details</Head>
                <Table>
                  <TableRow>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Van</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact</TableCell>
                    <TableCell>9898659456</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>20 Dec. 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Stops</TableCell>
                    <TableCell>12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Items</TableCell>
                    <TableCell>12 Boxes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>12:00pm</TableCell>
                  </TableRow>
                </Table>
              </DetailCard>
            </Details>
          </DetailsWrapper>
          <Documents />
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
};
