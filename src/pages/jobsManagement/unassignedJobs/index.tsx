import { Container, TableWrapper, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { DataType, TodayJobData, data } from "constants/tableData";
import { ColumnsType } from "antd/es/table";
import { Action, UserImage, UserNameWrapper } from "styles/dashboard";
import viewIcone from "assets/images/view.png";
import { ActionsWrapper, Icon } from "styles/pages/userManagement";
import { useNavigate } from "react-router-dom";
import TableContainer from "components/TableContainer";
export const UnassignedJobs = () => {
  const navigate = useNavigate();
  const Todaycolumns: ColumnsType<DataType> = [
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
      title: "Vehicle Type",
      dataIndex: "vehicle",
      key: "vehicle",
    },

    {
      title: <Action>Actions</Action>,
      key: "Action",
      render: (_, record) => {
        return (
          <ActionsWrapper>
            <Icon
              src={viewIcone}
              onClick={() =>
                navigate(`/job-management/unassigned/${record?.key}`)
              }
            />
          </ActionsWrapper>
        );
      },
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Title>Unassigned Job List</Title>
        <TableContainer colums={Todaycolumns} data={TodayJobData} />
      </Wrapper>
    </Container>
  );
};
