import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Action,
  BlockButton,
  UnBlockButton,
  PendingButton,
} from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { ColumnsType } from "antd/es/table";
import { DataType } from "constants/tableData";
import viewIcone from "assets/images/view.png";
import TableContainer from "components/TableContainer";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { toggleLoader } from "../../../../redux/slices/loaderSlice";
import { postApi } from "api/api.client";
import { APIS } from "api/api.constant";
import { PAGINATION_SIZE, TOAST_MESSAGE, DATE_FILTERS } from "constants/common";
import { useDispatch } from "react-redux";
import { ListingUserInfo, ListingAction, CommonFilter } from "components";
import { TABLE_ACTION } from "constants/common";
import { getToast, getDateFromObject } from "utils";
import { WithConfirmationHoc } from "hoc";

export interface ActionMenuItem {
  icon: any;
  actionKey: string;
  isIcon: any;
  disabledIcon: any;
}

export const ACTION_MENU: ActionMenuItem[] = [
  {
    icon: viewIcone,
    actionKey: TABLE_ACTION.VIEW,
    isIcon: false,
    disabledIcon: "",
  },
  {
    icon: <MdCancel color="#F34235" size={23} cursor={"pointer"} />,
    disabledIcon: <MdCancel color="#b3a7a6" size={23} cursor={"pointer"} />,
    actionKey: TABLE_ACTION.REJECT,
    isIcon: true,
  },
  {
    icon: <FaCheckCircle size={19} color={"#01851e"} cursor={"pointer"} />,
    disabledIcon: (
      <FaCheckCircle size={19} color="#b3a7a6" cursor={"pointer"} />
    ),
    actionKey: TABLE_ACTION.ACCEPT,
    isIcon: true,
  },
];

export const filterInitialValue = {
  date_from: "",
  date_to: "",
  search: "",
};

export interface FilterValue {
  date_from: any;
  date_to: any;
  search: string;
}

const NewDriverList = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filter, setfilter] = useState(false);
  const [pageSize, setPageSize] = useState(PAGINATION_SIZE);
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [triggerFilter, setTriggerFilter] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterValue, setFilterValue] =
    useState<FilterValue>(filterInitialValue);

  useEffect(() => {
    dispatch(toggleLoader({ loader: true }));
    postApi(APIS.GET_NEW_DRIVER, { ...filterValue, page: page, size: pageSize })
      .then((res) => {
        let response: any = res;
        setTableData(response?.data?.users);
        setTotalCount(response?.data?.pagination?.totalCount);
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(toggleLoader({ loader: false }));
      });
  }, [triggerFilter, page, pageSize, refresh]);

  const onResetClick = () => {
    setFilterValue(filterInitialValue);
    setTriggerFilter(!triggerFilter);
  };

  const handleOk = () => {
    setfilter(false);
  };

  const handleCancel = () => {
    setfilter(false);
  };

  const onSearchClick = () => {
    if (filterValue.date_from !== null && filterValue.date_to !== null) {
      setTriggerFilter(!triggerFilter);
      setfilter(!filter);
    }
  };

  const onActionHandler = (action: any, id: any) => {
    dispatch(toggleLoader({ loader: true }));
    postApi(
      action === TABLE_ACTION.ACCEPT ? APIS.ACCEPT_DRIVER : APIS.REJECT_DRIVER,
      {
        driverId: id,
      }
    )
      .then((res) => {
        getToast("success", TOAST_MESSAGE.UPDATED);
        props.handleCancel();
        setRefresh(!refresh);
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(toggleLoader({ loader: false }));
      });
  };

  const onActionClick = (event: object, actionKey: string, record: any) => {
    switch (actionKey) {
      case TABLE_ACTION.VIEW:
        navigate(`/new-driver/${record?._id}`);
        break;
      case TABLE_ACTION.ACCEPT:
        props.setModalContent({
          open: true,
          title: "Confirmation",
          description: "Are you sure you want to accept the driver's profile ?",
          cancelButtonLabel: "Cancel",
          buttonLabel: "Accept",
          onConfirmClick: () =>
            onActionHandler(TABLE_ACTION.ACCEPT, record?._id),
        });
        break;
      case TABLE_ACTION.REJECT:
        props.setModalContent({
          open: true,
          title: "Confirmation",
          description: "Are you sure you want to reject the driver's profile ?",
          cancelButtonLabel: "Cancel",
          buttonLabel: "Reject",
          onConfirmClick: () =>
            onActionHandler(TABLE_ACTION.REJECT, record?._id),
        });
        break;

        break;
      default:
        console.log("handle the action=>", actionKey);
    }
  };

  const userColumns: ColumnsType<DataType> = [
    {
      title: "Driver Name",
      key: "full_name",
      render: (_, record: any) => <ListingUserInfo record={record} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date Of Birth",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record: any) => {
        return <>{getDateFromObject(record?.dob)}</>;
      },
    },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    //   render: (_, record: any) => {
    //     return <>{getAgeByDOB(record?.dob)}</>;
    //   },
    // },
    // {
    //   title: "Amount",
    //   dataIndex: "amount",
    //   key: "amount",
    // },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "isVerify",
      render: (_, record: any) => {
        return (
          <Action style={{ justifyContent: "start" }}>
            {record?.isVerify === null && (
              <PendingButton>Pending</PendingButton>
            )}
            {record?.isVerify === false && <BlockButton>Rejected</BlockButton>}
            {record?.isVerify === true && (
              <UnBlockButton>Accepted</UnBlockButton>
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
          <ListingAction
            actionMenu={ACTION_MENU}
            onActionClick={onActionClick}
            record={record}
          />
        );
      },
    },
  ];

  const onSearchChange = (event: any) => {
    setFilterValue({ ...filterValue, search: event.target.value });
    setTriggerFilter(!triggerFilter);
  };

  return (
    <Container>
      <Wrapper>
        <Title>New Drivers</Title>
        <TableContainer
          filterValue={filterValue}
          onSearchChange={onSearchChange}
          isSearchAble={true}
          onResetClick={onResetClick}
          data={tableData}
          colums={userColumns}
          setfilter={setfilter}
          filter={filter}
          type="user"
          filtertext={"Filter"}
          totalCount={totalCount}
          onPaginationChange={(page: any, pageSize: any) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
        {filter && (
          <CommonFilter
            filter={filter}
            handleOk={handleOk}
            handleCancel={handleCancel}
            DATE_FILTERS={DATE_FILTERS}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            onSearchClick={onSearchClick}
          />
        )}
      </Wrapper>
    </Container>
  );
};
export default WithConfirmationHoc(NewDriverList);
