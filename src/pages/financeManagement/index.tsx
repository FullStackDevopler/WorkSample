import {
  Action,
  BlockButton,
  Container,
  Title,
  UnBlockButton,
  UserImage,
  UserNameWrapper,
} from "styles/dashboard";
import {
  Amount,
  AmountWrap,
  Button,
  ComonWrapper,
  Download,
  DownloadText,
  Image,
  ImageWrapper,
  InnerContainer,
  InvoiceWrapper,
  Label,
  Late,
  PaymentWrapper,
  RadioButtons,
  SelectContainer,
  SelectWrap,
  SelectWrapper,
  Text,
  TotalAmount,
} from "styles/pages/financeMagement";
import {
  ActionsWrapper,
  Icon,
  TableWrapper,
  Wrapper,
} from "styles/pages/userManagement";
import image from "assets/images/financeImage.png";
import { Radio, RadioChangeEvent, Select } from "antd";
import { useState } from "react";
import { InputWrapper } from "styles/pages/Login";
import { monthOptions } from "constants/monthsData";
import { IoIosCloudDownload } from "react-icons/io";
import TableContainer from "components/TableContainer";
import { DataType, TodayJobData, Userdata } from "constants/tableData";
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import editIcone from "assets/images/edit.png";
import viewIcone from "assets/images/view.png";
import { Stops } from "styles/commonStyle";
const FinanceManagement = () => {
  const [value, setValue] = useState("Driver");
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const userColumns: ColumnsType<DataType> = [
    {
      title: `${value}  Name`,
      key: "name",
      render: (_, record) => (
        <UserNameWrapper onClick={() => navigate(`/user-management/1`)}>
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
      title: <Stops>Total Items</Stops>,
      dataIndex: "totalStops",
      render: (_, record) => {
        return <Stops>{record?.totalStops}</Stops>;
      },
    },
    {
      title: <Stops>Total Items</Stops>,
      dataIndex: "totalItems",
      render: (_, record) => {
        return <Stops>{record?.totalItems}</Stops>;
      },
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
    },
  ];
  return (
    <Container>
      <Wrapper>
        <Title>Finance Management List</Title>
        <InnerContainer>
          <SelectContainer>
            {!selected && (
              <ImageWrapper>
                <Image src={image} />
              </ImageWrapper>
            )}

            <ComonWrapper>
              <SelectWrapper>
                <RadioButtons>
                  {!selected && <Label>Select User</Label>}
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className="radio"
                  >
                    <Radio value={"Driver"} className="radio-text">
                      Driver
                    </Radio>
                    <Radio value={"Customer"} className="radio-text">
                      Customer
                    </Radio>
                  </Radio.Group>
                </RadioButtons>
                <SelectWrap>
                  <InputWrapper className={"select"}>
                    <Select
                      onChange={(e) => setSelected(e)}
                      placeholder={`Select ${value}`}
                      options={[
                        {
                          value: "Pat Cummins",
                          label: "Pat Cummins",
                        },
                        {
                          value: "Mark Boulcher",
                          label: "Mark Boulcher",
                        },
                      ]}
                      className={"custome-select"}
                    />
                  </InputWrapper>
                  <InputWrapper className={"select"}>
                    <Select
                      className={"custome-select"}
                      placeholder="Select Months"
                      options={monthOptions}
                    />
                  </InputWrapper>
                </SelectWrap>
              </SelectWrapper>
              {selected && (
                <PaymentWrapper>
                  {value == "Driver" ? (
                    <Late>Last Payment Generated : 10-Jan-2024</Late>
                  ) : (
                    <Late>Last Payment Raised : 10-Jan-2024</Late>
                  )}
                  <AmountWrap>
                    <Amount>£3,050 </Amount>
                    <Text>Total Amount</Text>
                    <Download>
                      <IoIosCloudDownload size={16} />
                      <DownloadText>Download Invoice</DownloadText>
                    </Download>
                  </AmountWrap>
                </PaymentWrapper>
              )}
            </ComonWrapper>
          </SelectContainer>
          {selected && (
            <>
              <TableWrapper className="customeTable">
                <Table
                  className="tableStyle"
                  columns={userColumns}
                  dataSource={TodayJobData}
                  pagination={false}
                />
              </TableWrapper>

              <InvoiceWrapper>
                <Button>Generate Invoice</Button>
                <TotalAmount>
                  Total Amount: <span> £2,100</span>
                </TotalAmount>
              </InvoiceWrapper>
            </>
          )}
        </InnerContainer>
      </Wrapper>
    </Container>
  );
};

export default FinanceManagement;
