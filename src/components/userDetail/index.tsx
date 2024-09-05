import {
  UserWrapper,
  DetailsWrapper,
  ImageWrapper,
  Details,
  Image,
  Wrapper1,
  TextWrapper,
  Label,
  Data,
  Wrapper2,
  AddressWrapper,
  AddressData,
} from "styles/commonStyle";
import userImage2 from "assets/images/userImage2.png";
import { CiMail } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import calender from "assets/images/calender.png";
import gender from "assets/images/gender.png";
import { Icon } from "styles/pages/userManagement";
export const UserComponent = ({ image, name }: any) => {
  return (
    <DetailsWrapper>
      <ImageWrapper>
        <Image src={image ? image : userImage2} />
      </ImageWrapper>
      <Details>
        <Wrapper1>
          <TextWrapper>
            <Label>
              <LuUser2 size={20} /> <div>Full Name</div>
            </Label>
            <Data>{name ? name : "Jennifer Levine"}</Data>
          </TextWrapper>
          <TextWrapper>
            <Label>
              <LuPhone size={20} /> <div>Phone Number</div>
            </Label>
            <Data>9876541235</Data>
          </TextWrapper>
          <TextWrapper>
            <Label>
              <CiMail size={20} /> <div>Email</div>
            </Label>
            <Data>Justin@gmail.com</Data>
          </TextWrapper>
        </Wrapper1>
        <Wrapper2>
          <AddressWrapper>
            <Label>
              <CiLocationOn size={20} /> <div>Address</div>
            </Label>
            <AddressData>
              914 North Bend River RoadLexington, KY 40507
            </AddressData>
          </AddressWrapper>
          {/* <TextWrapper>
            <Label>
              <Icon src={calender} className="custumImage" />
              <div>Date of Birth</div>
            </Label>
            <Data>04-10-1995</Data>
          </TextWrapper> */}
          <TextWrapper>
            <Label>
              <LuPhone size={20} /> <div>Company Number</div>
            </Label>
            <Data>9876541235</Data>
          </TextWrapper>
          {/* <TextWrapper>
            <Label>
              <Icon src={gender} className="custumImage" /> <div>Gender</div>
            </Label>
            <Data>Male</Data>
          </TextWrapper> */}
        </Wrapper2>
      </Details>
    </DetailsWrapper>
  );
};
