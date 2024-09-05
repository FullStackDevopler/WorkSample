import { Dropdown, MenuProps } from "antd";
import {
  AdminName,
  Container,
  PageName,
  User,
  Wrapper,
} from "styles/navbarStyle";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { WithConfirmationHoc } from "hoc";

const Navbar = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = window.location.pathname.split("/");
  const userName = useSelector((state: any) => state?.authSlice?.name);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            props.setModalContent({
              open: true,
              title: "Are you sure you want to logout?",
              description: "",
              cancelButtonLabel: "No",
              buttonLabel: "Yes",
              onConfirmClick: () => {
                dispatch(logoutUser());
                localStorage.clear();
                navigate("/login?success=true");
              },
            });
          }}
        >
          Logout
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Container className={props?.classname}>
      <Wrapper className={props?.classname ? "customeWrap" : ""}>
        <PageName>
          {path[1]
            ? path[1].replace(/-/g, " ").replace(/_/g, " & ")
            : "Dashboard"}
        </PageName>
        <Dropdown menu={{ items }} className="customeDrop">
          <User>
            <AdminName>{`Hello, ${userName}`}</AdminName>
          </User>
        </Dropdown>
      </Wrapper>
    </Container>
  );
};

export default WithConfirmationHoc(Navbar);
