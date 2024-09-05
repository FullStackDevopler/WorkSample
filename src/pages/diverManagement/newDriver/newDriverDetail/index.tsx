import {
  UserWrapper,
  TextWrapper,
  Label,
  Data,
  VahicleWrapper,
  DocsWrap,
  PdfDetail,
  PdfWrapper,
  Size,
  Type,
} from "styles/commonStyle";
import { Container, Title } from "styles/dashboard";
import { Icon, Wrapper } from "styles/pages/userManagement";
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
import pdficon from "assets/images/pdf.png";
import viewIcon from "assets/images/view.png";
import {
  AcceptButton,
  RejectButton,
  ButtonsWrapper,
} from "styles/newDriverDetail";
import { DriverComponent } from "components/driverDetails";
const NewDriverDetail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Wrapper>
        <TopSection>
          <Title>New Driver Details</Title>
          <ButtonWrapper>
            <BackButton onClick={() => navigate(-1)}>
              <IoIosArrowBack size={20} />
              <ButtonText> Back</ButtonText>
            </BackButton>
          </ButtonWrapper>
        </TopSection>
        <UserWrapper>
          {/* <UserComponent /> */}
          <DriverComponent />
          <VahicleWrapper className="customeStyle">
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
              <Data>Uploaded Documents</Data>
              <DocsWrap>
                <PdfWrapper>
                  <Icon src={pdficon} className="pdf" />
                  <PdfDetail>
                    <Type>Pdf</Type>
                    <Size>2.5kb/ 1.3Kb Format : pdf</Size>
                  </PdfDetail>
                </PdfWrapper>
                <Icon src={viewIcon} />
              </DocsWrap>
            </TextWrapper>
          </VahicleWrapper>

          <ButtonsWrapper>
            <AcceptButton>Accept</AcceptButton>
            <RejectButton>Reject</RejectButton>
          </ButtonsWrapper>
        </UserWrapper>
      </Wrapper>
    </Container>
  );
};

export default NewDriverDetail;
