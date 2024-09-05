import { useEffect, useState } from "react";
import { Action, BreadcrumbWrap, Container, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { Breadcrumb } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataType } from "constants/tableData";
import TableContainer from "components/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import {
  PAGINATION_SIZE,
  filterInitialValue,
  TABLE_ACTION,
  ACTION_MENU,
  DATE_FILTERS,
  TOAST_MESSAGE,
} from "constants/common";
import { postApi } from "api/api.client";
import { APIS } from "api/api.constant";
import { FilterValue } from "interfaces/iCommon";
import {
  ListingUserInfo,
  ListingStatusColumn,
  ListingAction,
  CommonFilter,
} from "components";
import { getDateFromObject, getToast } from "utils";
import { toggleLoader } from "../../../redux/slices/loaderSlice";
import { useDispatch } from "react-redux";

export const DriverManagementList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setfilter] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGINATION_SIZE);
  const [triggerFilter, setTriggerFilter] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterValue, setFilterValue] =
    useState<FilterValue>(filterInitialValue);

  useEffect(() => {
    dispatch(toggleLoader({ loader: true }));
    postApi(APIS.GET_DRIVER_LISTING, {
      ...filterValue,
      page: page,
      size: pageSize,
    })
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

  const onStatusChange = (event: any, key: any, id: any) => {
    dispatch(toggleLoader({ loader: true }));
    postApi(key === "block" ? APIS.UN_BLOCK_USER : APIS.BLOCK_USER, {
      userId: id,
    })
      .then((res) => {
        getToast("success", TOAST_MESSAGE.STATUS_CHANGED);
      })
      .catch((err) => {})
      .finally(() => {
        setRefresh(!refresh);
        dispatch(toggleLoader({ loader: false }));
      });
  };

  const onActionClick = (event: object, actionKey: string, record: any) => {
    switch (actionKey) {
      case TABLE_ACTION.VIEW:
        navigate(`/driver-management/${record?._id}`);
        break;
      case TABLE_ACTION.EDIT:
        navigate(`/driver-management/update/${record?._id}`);
        break;
      default:
        console.log("handle the action=>", actionKey);
    }
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

  const userColumns: ColumnsType<DataType> = [
    {
      title: "Driver Name",
      key: "first_name",
      render: (_, record: any) => <ListingUserInfo record={record} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Reg. Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record: any) => {
        return <>{getDateFromObject(record?.createdAt)}</>;
      },
    },
    {
      title: <Action>Status</Action>,
      key: "status",
      render: (_, record: any) => {
        return (
          <ListingStatusColumn
            record={record}
            onStatusChange={onStatusChange}
          />
        );
      },
    },
    {
      title: <Action>Action</Action>,
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
              title: "Driver Management List",
            },
          ]}
        />
      </BreadcrumbWrap>
      <Wrapper>
        <Title>Driver Management List </Title>
        <TableContainer
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
