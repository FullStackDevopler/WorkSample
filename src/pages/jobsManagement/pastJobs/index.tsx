import {
  Action,
  BlockButton,
  Container,
  TableWrapper,
  Title,
  UnBlockButton,
  UserImage,
  UserNameWrapper,
} from "styles/dashboard";
import {
  ActionsWrapper,
  Filter,
  FilterWrapper,
  Icon,
  TableTitle,
  Text,
  Wrapper,
} from "styles/pages/userManagement";
import { Table } from "antd";
import { DataType, TodayJobData } from "constants/tableData";
import { useNavigate } from "react-router-dom";
import viewIcone from "assets/images/view.png";
import uploadIcone from "assets/images/upload.png";
import deleteIcone from "assets/images/deleteIcon.png";

import { ColumnsType } from "antd/es/table";
import filterIcone from "assets/images/filterIcon.png";
import {
  DeleteButton,
  DownloadButton,
  DownloadText,
} from "styles/jobManagement";
export const PastJobs = () => {
  const navigate = useNavigate();
  const Pastcolumns: ColumnsType<DataType> = [
    {
      title: "Name",
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
      title: <Action>Status</Action>,
      key: "status",
      render: (_, record) => {
        return (
          <>
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
          </>
        );
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
              onClick={() =>
                record.Jobstatus === "cancelled"
                  ? navigate(
                      `/job-management/job-past/cancelled/${record?.key}`
                    )
                  : navigate(
                      `/job-management/job-past/completed/${record?.key}`
                    )
              }
            />
            <Icon src={uploadIcone} />
          </ActionsWrapper>
        );
      },
    },
  ];
  return (
    <Container>
      <Wrapper>
        <Title>Past Jobs List</Title>
        <TableWrapper>
          <FilterWrapper className="customeFilter">
            <Filter>
              <Text>Filter</Text>
              <Icon src={filterIcone} />
            </Filter>
            <DownloadButton>
              <DownloadText>Download all</DownloadText>
              <Icon src={uploadIcone} />
            </DownloadButton>
            <DeleteButton>
              <Icon src={deleteIcone} />
              <DownloadText>Delete</DownloadText>
            </DeleteButton>
          </FilterWrapper>
          <Table
            className="tableStyle"
            columns={Pastcolumns}
            dataSource={TodayJobData}
          />
        </TableWrapper>
      </Wrapper>
    </Container>
  );
};
