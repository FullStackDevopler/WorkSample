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
  TabWrapper,
  ButtonWrapper as ButtonWrap,
  TabButton,
} from "styles/commonStyle";
import {
  Action,
  BlockButton,
  BreadcrumbWrap,
  Container,
  Title,
  UnBlockButton,
  UserImage,
  UserNameWrapper,
} from "styles/dashboard";
import { ActionsWrapper, Icon, Wrapper } from "styles/pages/userManagement";
import userImage from "assets/images/userImage.png";
import { CiMail } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { Breadcrumb, Tabs, TabsProps } from "antd";
import TableContainer from "components/TableContainer";
import { ColumnsType } from "antd/es/table";
import { DataType, TodayJobData } from "constants/tableData";
import viewIcone from "assets/images/view.png";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BackButton,
  ButtonText,
  ButtonWrapper,
  TopSection,
  UpDateButton,
} from "styles/unAssignedJob";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
const UserJobDetails = () => {
  const tabdata = ["Today's Jobs", "Upcoming Jobs", "Past Jobs"];
  const filterTab = ["Assigned", "Unassigned"];
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: "Driver Name",
      key: "name",
      render: (_, record: any) => (
        <UserNameWrapper
        // onClick={() => navigate(`/user-management/todayJob/${record?.key}`)}
        >
          <UserImage src={record?.image} />
          {record?.name}
        </UserNameWrapper>
      ),
    },
    {
      title: "First Location",
      dataIndex: "FirstLocation",
      key: "First Location",
    },
    {
      title: "Last Location",
      dataIndex: "LastLocation",
      key: "last Location",
    },
    {
      title: <Action>Total Stops</Action>,
      dataIndex: "totalStops",
      key: "Total Stops",
      render: (_, record) => {
        return <Action>{record?.totalStops}</Action>;
      },
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      render: (_, record) => {
        return <div>{record?.totalItems}</div>;
      },
    },

    {
      title: <Action>Actions</Action>,
      key: "Action",
      render: (_, record) => {
        return (
          <ActionsWrapper
            onClick={() =>
              navigate(`/user-management/${id}/todayJob/${record?.key}`)
            }
          >
            <Icon src={viewIcone} />
          </ActionsWrapper>
        );
      },
    },
  ];
  const UpcomingJobcolumns: ColumnsType<DataType> = [
    {
      title: "First Location",
      dataIndex: "FirstLocation",
      key: "First Location",
    },
    {
      title: "Last Location",
      dataIndex: "LastLocation",
      key: "last Location",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: <Action>Total Stops</Action>,
      dataIndex: "totalStops",
      key: "Total Stops",
      render: (_, record) => {
        return <Action>{record?.totalStops}</Action>;
      },
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      render: (_, record) => {
        return <div>{record?.totalItems}</div>;
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: <Action>Actions</Action>,
      key: "Action",
      render: (_, record) => {
        return (
          <ActionsWrapper
            onClick={() =>
              navigate(`/user-management/${id}/upcoming/${record?.key}`)
            }
          >
            <Icon src={viewIcone} />
          </ActionsWrapper>
        );
      },
    },
  ];

  const PostJob: ColumnsType<DataType> = [
    {
      title: "Driver Name",
      key: "name",
      render: (_, record: any) => (
        <UserNameWrapper
        // onClick={() =>
        //   navigate(`/user-management/${id}/todayJob/${record?.key}`)
        // }
        >
          <UserImage src={record?.image} />
          {record?.name}
        </UserNameWrapper>
      ),
    },
    {
      title: "First Location",
      dataIndex: "FirstLocation",
      key: "First Location",
    },
    {
      title: "Last Location",
      dataIndex: "LastLocation",
      key: "last Location",
    },
    {
      title: <Action>Total Stops</Action>,
      dataIndex: "totalStops",
      key: "Total Stops",
      render: (_, record) => {
        return <Action>{record?.totalStops}</Action>;
      },
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      render: (_, record) => {
        return <div>{record?.totalItems}</div>;
      },
    },
    {
      title: <Action>Status</Action>,
      key: "status",
      render: (_, record) => {
        return (
          <Action>
            {record?.Jobstatus == "cancelled" ? (
              <BlockButton
                style={{ backgroundColor: "#FFD5D2", color: "#F34235" }}
              >
                Cancelled
              </BlockButton>
            ) : (
              <UnBlockButton
                style={{ backgroundColor: "#C2FFCF", color: "#01851E" }}
              >
                Completed
              </UnBlockButton>
            )}
          </Action>
        );
      },
    },
    {
      title: <Action>Actions</Action>,
      key: "Action",
      render: (_, record) => {
        return (
          <ActionsWrapper
            onClick={() =>
              record?.Jobstatus === "cancelled"
                ? navigate(`/user-management/${id}/cancelled/${record?.key}`)
                : navigate(`/user-management/${id}/completed/${record?.key}`)
            }
          >
            <Icon src={viewIcone} />
          </ActionsWrapper>
        );
      },
    },
  ];

  const UnAssignedJob: ColumnsType<DataType> = [...columns];
  UnAssignedJob.splice(0, 1);
  UnAssignedJob.splice(4, 1, {
    title: <Action>Actions</Action>,
    key: "Action",
    render: (_, record) => {
      return (
        <ActionsWrapper
          onClick={() =>
            navigate(`/user-management/${id}/unassignedJob/${record?.key}`)
          }
        >
          <Icon src={viewIcone} />
        </ActionsWrapper>
      );
    },
  });
  UnAssignedJob.splice(-1, 0, {
    title: "Vehicle Type",
    dataIndex: "vehicle",
    key: "Vehicle",
  });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <div>Todays's Job</div>,
      children: (
        <TableContainer
          title={"Today's Jobs"}
          data={TodayJobData}
          colums={columns}
        />
      ),
    },
    {
      key: "2",
      label: <div>Upcoming Jobs </div>,
      children: (
        <TableContainer
          title={"Upcoming Jobs"}
          data={TodayJobData}
          colums={UpcomingJobcolumns}
        />
      ),
    },
    {
      key: "3",
      label: <div>Past Jobs </div>,
      children: (
        <TableContainer
          amount={true}
          title={"Past Jobs"}
          data={TodayJobData}
          colums={PostJob}
        />
      ),
    },
  ];

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
              title: "User Job Details",
            },
          ]}
        />
      </BreadcrumbWrap>
      <Wrapper>
        <TopSection>
          <Title>User Job Details</Title>
          <ButtonWrapper>
            <UpDateButton
              onClick={() => navigate(`/user-management/update/${id}`)}
            >
              <FaRegEdit size={20} />
              <ButtonText> Edit/Update</ButtonText>
            </UpDateButton>
            <BackButton onClick={() => navigate(-1)}>
              <IoIosArrowBack size={20} />
              <ButtonText> Back</ButtonText>
            </BackButton>
          </ButtonWrapper>
        </TopSection>
        <UserWrapper>
          <DetailsWrapper>
            <ImageWrapper>
              <Image src={userImage} />
            </ImageWrapper>
            <Details>
              <Wrapper1>
                <TextWrapper>
                  <Label>
                    <LuUser2 size={20} /> <div>Full Name</div>
                  </Label>
                  <Data>Jennifer Levine</Data>
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
              <Wrapper1>
                <TextWrapper>
                  <Label>
                    <CiLocationOn size={20} /> <div>Address</div>
                  </Label>
                  <Data>914 North Bend River RoadLexington, KY 40507</Data>
                </TextWrapper>
                <TextWrapper>
                  <Label>
                    <LuPhone size={20} /> <div>Company Number</div>
                  </Label>
                  <Data>9876541235</Data>
                </TextWrapper>
              </Wrapper1>
            </Details>
          </DetailsWrapper>
        </UserWrapper>

        <TabWrapper>
          {activeFilterTab !== 1 ? (
            <ButtonWrap>
              {tabdata?.map((item, index) => {
                return (
                  <TabButton
                    isActive={activeTab === index}
                    onClick={() => setActiveTab(index)}
                  >
                    {item}
                  </TabButton>
                );
              })}
            </ButtonWrap>
          ) : (
            <div></div>
          )}

          <ButtonWrap>
            {filterTab?.map((item, index) => {
              return (
                <TabButton
                  isActive={activeFilterTab === index}
                  onClick={() => setActiveFilterTab(index)}
                >
                  {item}
                </TabButton>
              );
            })}
          </ButtonWrap>
        </TabWrapper>

        {activeFilterTab !== 1 ? (
          items?.map((item, index) => {
            if (index === activeTab) {
              return item.children;
            }
          })
        ) : (
          <TableContainer
            title={"Unassigned Jobs"}
            data={TodayJobData}
            colums={UnAssignedJob}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default UserJobDetails;
