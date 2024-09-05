import { UserImage, UserNameWrapper } from "styles/dashboard";
import UserIcon from "../../assets/images/no-user.jpg";
import { BASE_URL } from "api/api.constant";
import { TruncatedText } from "utils";

interface ListingUserInfoProps {
  record: {
    photo?: string;
    full_name?: string;
  };
}

const ListingUserInfo: React.FC<ListingUserInfoProps> = ({ record }) => {
  return (
    <UserNameWrapper>
      <UserImage
        src={record?.photo !== null ? `${BASE_URL}/${record?.photo}` : UserIcon}
      />
      <>{TruncatedText(record?.full_name)}</>
    </UserNameWrapper>
  );
};
export default ListingUserInfo;
