import { Container, TableWrapper, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { Table } from "antd";
import { DataType, TodayJobData, data } from "constants/tableData";
import { ColumnsType } from "antd/es/table";
import { Action, UserImage, UserNameWrapper } from "styles/dashboard";
import viewIcone from "assets/images/view.png";
import { ActionsWrapper, Icon } from "styles/pages/userManagement";
import { useNavigate } from "react-router-dom";
import TableContainer from "components/TableContainer";
export const TodayJobs = () => {
  const navigate = useNavigate();
  const Todaycolumns: ColumnsType<DataType> = [
    {
      title: "Driver Name",
      key: "name",
      render: (_, record: any) => (
        <UserNameWrapper>
          <UserImage src={record?.image} />
          {record?.name}
        </UserNameWrapper>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
          <ActionsWrapper>
            <Icon
              src={viewIcone}
              onClick={() => navigate(`/job-management/today/${record?.key}`)}
            />
          </ActionsWrapper>
        );
      },
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Title>Today's Job List</Title>
        <TableContainer colums={Todaycolumns} data={TodayJobData} />
      </Wrapper>
    </Container>
  );
};
