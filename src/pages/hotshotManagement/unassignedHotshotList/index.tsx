import { Container, TableWrapper, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { DataType, TodayJobData, data } from "constants/tableData";
import Table, { ColumnsType } from "antd/es/table";
import { Action, UserImage, UserNameWrapper } from "styles/dashboard";
import viewIcone from "assets/images/view.png";
import { ActionsWrapper, Icon } from "styles/pages/userManagement";
import { useNavigate } from "react-router-dom";
export const UnassignedHotshotList = () => {
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
      title: "Vehicle Type",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
                navigate(`/hotshot-management/unassigned/${record?.key}`)
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
        <Title>Unassigned Hotshots List</Title>
        <TableWrapper>
          <Table columns={Todaycolumns} dataSource={TodayJobData} />
        </TableWrapper>
      </Wrapper>
    </Container>
  );
};
