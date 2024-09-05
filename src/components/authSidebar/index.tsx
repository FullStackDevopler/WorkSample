import {
  Container,
  ImageWrapper,
  Ellipse,
  UserImageWrapper,
  UserImage,
  EllipsWrapper,
} from "styles/authLayoutStyle";
import ellipse from "assets/images/Ellipse 1.png";
import userimg from "assets/images/work 1.png";
const AuthSidebar = () => {
  return (
    <Container>
      <ImageWrapper>
        <UserImageWrapper>
          <UserImage src={userimg} />
        </UserImageWrapper>
        <EllipsWrapper>
          <Ellipse src={ellipse} />
        </EllipsWrapper>
      </ImageWrapper>
    </Container>
  );
};

export default AuthSidebar;
