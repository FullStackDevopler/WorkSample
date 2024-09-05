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
import { Breadcrumb, TabsProps } from "antd";
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
import { DriverComponent } from "components/driverDetails";
const DriverJobDetails = () => {
  const tabdata = ["Today's Jobs", "Upcoming Jobs", "Past Jobs"];
  const tabdata2 = ["Today's Jobs", "Upcoming Jobs", "Past Jobs", "Unassigned"];
  const filterTab = ["In Jobs", "Out Jobs"];
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: activeFilterTab !== 1 ? "User Name" : "Driver Name",
      key: "name",
      render: (_, record: any) => (
        <UserNameWrapper>
          <UserImage
            src={
              "https://i.pinimg.com/originals/fa/ad/a7/faada775710b6c45762a0fa9c6c9e587.jpg"
            }
          />
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
      title: <Action>Action</Action>,
      key: "Action",
      render: (_, record) => {
        return (
          <ActionsWrapper
            onClick={() =>
              activeFilterTab == 1
                ? navigate(`/driver-management/todayJob/out/${record?.key}`)
                : navigate(`/driver-management/${id}/todayJob/${record?.key}`)
            }
          >
            <Icon src={viewIcone} />
          </ActionsWrapper>
        );
      },
    },
  ];
  const PostJob: ColumnsType<DataType> = [...columns];
  PostJob.splice(0, 1);
  PostJob.splice(4, 1, {
    title: <Action>Actions</Action>,
    key: "Action",
    render: (_, record) => {
      return (
        <ActionsWrapper
          onClick={() =>
            record?.Jobstatus === "cancelled"
              ? activeFilterTab === 1
                ? navigate(
                    `/driver-management/${id}/cancelled/out/${record?.key}`
                  )
                : navigate(
                    `/driver-management/list/${id}/cancelled/${record?.key}`
                  )
              : activeFilterTab === 1
              ? navigate(
                  `/driver-management/${id}/completed/out/${record?.key}`
                )
              : navigate(`/driver-management/${id}/completed/${record?.key}`)
          }
        >
          <Icon src={viewIcone} />
        </ActionsWrapper>
      );
    },
  });

  PostJob.splice(-1, 0, {
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
  });

  const UpcomingJobcolumns: ColumnsType<DataType> = [...columns];
  UpcomingJobcolumns.splice(0, 1);
  UpcomingJobcolumns.splice(4, 1, {
    title: <Action>Actions</Action>,
    key: "Action",
    render: (_, record) => {
      return (
        <ActionsWrapper
          onClick={() =>
            activeFilterTab === 1
              ? navigate(`/driver-management/${id}/upcoming/out/${record?.key}`)
              : navigate(`/driver-management/${id}/upcoming/${record?.key}`)
          }
        >
          <Icon src={viewIcone} />
        </ActionsWrapper>
      );
    },
  });
  UpcomingJobcolumns.splice(-1, 0, {
    title: "Time",
    dataIndex: "time",
    key: "time",
  });

  const UnAssignedJob: ColumnsType<DataType> = [...columns];
  UnAssignedJob.splice(0, 1);
  UnAssignedJob.splice(4, 1, {
    title: <Action>Actions</Action>,
    key: "Action",
    render: (_, record) => {
      return (
        <ActionsWrapper
          onClick={() =>
            navigate(`/driver-management/${id}/unassignedJob/${record?.key}`)
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
    {
      key: "4",
      label: <div>Un Assigned Jobs</div>,
      children: (
        <TableContainer
          title={"Post Jobs"}
          data={TodayJobData}
          colums={UnAssignedJob}
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
              title: (
                <Link to={"/driver-management/List"}>
                  Driver Management List
                </Link>
              ),
            },
            {
              title: "Driver Details",
            },
          ]}
        />
      </BreadcrumbWrap>
      <Wrapper>
        <TopSection>
          <Title>Driver Details</Title>
          <ButtonWrapper>
            <UpDateButton
              onClick={() => navigate(`/driver-management/update/${id}`)}
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
          <DriverComponent />
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
            <ButtonWrap>
              {tabdata2?.map((item, index) => {
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

        {items?.map((item, index) => {
          if (index === activeTab) {
            return item.children;
          }
        })}
      </Wrapper>
    </Container>
  );
};

export default DriverJobDetails;
