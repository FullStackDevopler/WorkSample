import {
  Container,
  Icon,
  Logo,
  LogoWrapper,
  ManuWrapper,
} from "styles/sidebarStyle";
import logo from "assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuUser2 } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import MenuItem from "antd/es/menu/MenuItem";
import driverIcon from "assets/images/driver.png";
import financeIcon from "assets/images/finance.png";
import job from "assets/images/job.png";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  path?: string,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <RxDashboard size={24} />, "/dashboard"),
  getItem("User Management", "2", <LuUser2 size={24} />, "/user-management"),
  getItem(
    "Driver Management",
    "3",
    <Icon src={driverIcon} />,
    "/navigation-two",
    [
      getItem(
        "Driver Management List",
        "4",
        undefined,
        "/driver-management/List"
      ),
      getItem("New Driver", "5", undefined, "/new-driver"),
    ]
  ),
  getItem("Hotshot Management", "6", <CiStar size={24} />, "", [
    getItem(
      "Assigned Hotshot",
      "18",
      undefined,
      "/hotshot-management/assigned"
    ),
    getItem(
      "Unassigned Hotshot",
      "19",
      undefined,
      "/hotshot-management/unassigned"
    ),
  ]),
  getItem("Jobs Management", "7", <Icon src={job} />, "", [
    getItem("Today's Job", "14", undefined, "/job-management/today"),
    getItem("Upcoming Job", "15", undefined, "/job-management/upcoming"),
    getItem("Past Job", "16", undefined, "/job-management/job-past"),
    getItem("Unassigned Job", "17", undefined, "/job-management/unassigned"),
  ]),
  getItem(
    "Finance Management",
    "8",
    <Icon src={financeIcon} />,
    "/finance-management"
  ),
  getItem("Settings", "9", <CiSettings size={24} />, "/aaaaa", [
    getItem("About Us", "10", undefined, "/settings/about-us"),
    getItem(
      "Terms & Conditions",
      "11",
      undefined,
      "/settings/terms_conditions"
    ),
    getItem("Privacy Policy", "12", undefined, "/settings/privacy-policy"),
    getItem("Change Password", "13", undefined, "/settings/change-password"),
  ]),
];

const rootSubmenuKeys = ["1", "2", "3", "4", "5", "6", "7"];
const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState<any>([""]);
  const navigate = useNavigate();
  const path = window.location.pathname.split("/");
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // for default Open Key
  const OpenKey = (path: any) => {
    switch (path[1]) {
      case "driver-management":
        return ["3"];
      case "new-driver":
        return ["3"];
      case "hotshot-management":
        return ["6"];
      case "job-management":
        return ["7"];
      case "settings":
        return ["9"];
      default:
        return ["1"];
    }
  };

  // for default selected Key
  const SelectedOpenKey = (path: any) => {
    switch (path[1]) {
      case "user-management":
        return ["2"];
      case "driver-management":
        return ["4"];
      case "new-driver":
        return ["5"];
      case "hotshot-management":
        return path[2] === "assigned" ? ["18"] : ["19"];
      case "job-management":
        return path[2] === "today"
          ? ["14"]
          : path[2] === "upcoming"
          ? ["15"]
          : path[2] === "job-past"
          ? ["16"]
          : ["17"];
      case "finance-management":
        return ["8"];
      case "settings":
        return path[2] === "about-us"
          ? ["10"]
          : path[2] === "terms_conditions"
          ? ["11"]
          : path[2] === "privacy-policy"
          ? ["12"]
          : ["13"];

      default:
        return ["1"];
    }
  };

  useEffect(() => {
    setOpenKeys(OpenKey(path));
  }, []);

  return (
    <Container>
      <LogoWrapper
        onClick={() => {
          navigate("/");
        }}
      >
        <Logo src={logo} />
      </LogoWrapper>
      <ManuWrapper>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 240 }}
          selectedKeys={SelectedOpenKey(path)}
        >
          {items.map((item: any) => {
            if (item.children) {
              return (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map((child: any) => (
                    <Menu.Item key={child.key}>
                      <Link to={child.path}>{child.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }

            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </ManuWrapper>
    </Container>
  );
};

export default Sidebar;
