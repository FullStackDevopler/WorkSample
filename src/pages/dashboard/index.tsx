import {
  AmountData,
  DriverData,
  JobsData,
  UserData,
} from "constants/dashboardData";
import {
  Container,
  Title,
  AmountWrapper,
  CardWrapper,
  Card,
  Icone,
  CardTitle,
  Ammount,
  UserWrapper,
  ChartWrappeer,
  TableWrapper,
  PieChartWrapper,
  TableTitle,
  ChartHints,
  Quater1,
  Quater2,
  Quater3,
  Quater4,
  BarChartWrappeer,
  SuggetionWrapper,
  FilterWrapper,
  BarWrapper,
  BarColor,
  RightContent,
  PieTitle,
  BreadcrumbWrap,
} from "styles/dashboard";
import { Breadcrumb, Dropdown, MenuProps, Table } from "antd";
import Example from "components/graph";
import { PieChartComponent } from "components/pieChart";
import { Drivercolumns, columns, data } from "constants/tableData";
import Breadcrumbs from "components/Breadcrumbs";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "2024",
    },
    {
      key: "2",
      label: <div onClick={() => selectYear(2025)}>2025</div>,
    },
    {
      key: "3",
      label: "2026",
    },
  ];

  const selectYear = (value: number) => {
    console.log(value);
  };

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
              title: <Link to={"/"}>Dashboard</Link>,
            },
          ]}
        />
      </BreadcrumbWrap>

      <AmountWrapper>
        <Title>Amount Earned</Title>
        <CardWrapper>
          {AmountData?.map((item, index) => (
            <Card key={index}>
              <Icone src={item?.icone} />
              <CardTitle>{item?.title}</CardTitle>
              <Ammount>{item?.earned}</Ammount>
            </Card>
          ))}
        </CardWrapper>
        <BarChartWrappeer>
          <SuggetionWrapper>
            <TableTitle>Total Amount Earned £10,184.79</TableTitle>
            <RightContent>
              <BarWrapper>
                <BarColor />
                Earned
              </BarWrapper>
              <Dropdown menu={{ items }} className="customeDrop">
                <FilterWrapper>filter</FilterWrapper>
              </Dropdown>
            </RightContent>
          </SuggetionWrapper>
          <Example />
        </BarChartWrappeer>
      </AmountWrapper>
      <UserWrapper>
        <Title>User Details</Title>
        <CardWrapper>
          {UserData?.map((item) => (
            <Card>
              <Icone src={item?.icone} />
              <CardTitle>{item?.title}</CardTitle>
              <Ammount>{item?.earned}</Ammount>
            </Card>
          ))}
        </CardWrapper>
        <ChartWrappeer>
          <TableWrapper>
            <TableTitle>5 most recent user registered</TableTitle>
            <Table
              className="tableStyle"
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </TableWrapper>
          <PieChartWrapper>
            <PieTitle>Users registered in last 4 quarters</PieTitle>
            <PieChartComponent title={"Total User Registered"} />
            <ChartHints>
              <Quater1>Quater1</Quater1>
              <Quater2>Quater2</Quater2>
              <Quater3>Quater3</Quater3>
              <Quater4>Quater4</Quater4>
            </ChartHints>
          </PieChartWrapper>
        </ChartWrappeer>
      </UserWrapper>
      <UserWrapper>
        <Title>Driver Details</Title>
        <CardWrapper>
          {DriverData?.map((item) => (
            <Card>
              <Icone src={item?.icone} />
              <CardTitle>{item?.title}</CardTitle>
              <Ammount>{item?.earned}</Ammount>
            </Card>
          ))}
        </CardWrapper>
        <ChartWrappeer>
          <TableWrapper>
            <TableTitle>5 most recent Driver registered</TableTitle>
            <Table
              className="tableStyle"
              columns={Drivercolumns}
              dataSource={data}
              pagination={false}
            />
          </TableWrapper>
          <PieChartWrapper>
            <PieTitle>Driver registered in last 4 quarters</PieTitle>
            <PieChartComponent title={"Total Driver Registered"} />
            <ChartHints>
              <Quater1>Quater1</Quater1>
              <Quater2>Quater2</Quater2>
              <Quater3>Quater3</Quater3>
              <Quater4>Quater4</Quater4>
            </ChartHints>
          </PieChartWrapper>
        </ChartWrappeer>
      </UserWrapper>
      <UserWrapper>
        <Title>Jobs Details</Title>
        <CardWrapper>
          {JobsData?.map((item) => (
            <Card>
              <Icone src={item?.icone} />
              <CardTitle>{item?.title}</CardTitle>
              <Ammount>{item?.earned}</Ammount>
            </Card>
          ))}
        </CardWrapper>
        <ChartWrappeer>
          <TableWrapper>
            <TableTitle>5 most recent Jobs done</TableTitle>
            <Table
              className="tableStyle"
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </TableWrapper>
          <PieChartWrapper>
            <PieTitle>Jobs done in last 4 quarters</PieTitle>
            <PieChartComponent title={"Total Job Registered"} />
            <ChartHints>
              <Quater1>Quater1</Quater1>
              <Quater2>Quater2</Quater2>
              <Quater3>Quater3</Quater3>
              <Quater4>Quater4</Quater4>
            </ChartHints>
          </PieChartWrapper>
        </ChartWrappeer>
      </UserWrapper>
    </Container>
  );
};

export default Dashboard;
