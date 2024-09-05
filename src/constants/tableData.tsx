import { ColumnsType } from "antd/es/table";
import {
  Action,
  ActionWrap,
  BlockButton,
  UnBlockButton,
  UserImage,
  UserNameWrapper,
} from "styles/dashboard";

import customerImage from "assets/images/customerImage.png";
import userImage from "assets/images/userImage.png";
import driverImage from "assets/images/driverImage.png";

export interface DataType {
  key: string;
  role?: string;
  name: string;
  email: string;
  regDate?: string;
  status: string;
  phone?: number;
  FirstLocation?: string;
  LastLocation?: string;
  totalStops?: number;
  totalItems?: string;
  vehicle?: string;
  time?: string;
  Jobstatus?: string;
  age?: number;
  amount?: string;
  price?: string;
  image?: string;
  date?: string;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "User Name",
    key: "name",
    render: (_, record) => (
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
    title: "Email",
    dataIndex: "email",
    key: "age",
  },
  {
    title: "Reg. Date",
    dataIndex: "regDate",
    key: "regdate",
  },
  {
    title: <Action>Status</Action>,
    key: "status",
    render: (_, record) => {
      return (
        <>
          {record?.status == "block" ? (
            <BlockButton>Block</BlockButton>
          ) : (
            <UnBlockButton>Unblock</UnBlockButton>
          )}
        </>
      );
    },
  },
];

export const Drivercolumns: ColumnsType<DataType> = [
  {
    title: "Driver Name",
    key: "name",
    render: (_, record) => (
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
    title: "Email",
    dataIndex: "email",
    key: "age",
  },
  {
    title: "Reg. Date",
    dataIndex: "regDate",
    key: "regdate",
  },
  {
    title: <Action>Status</Action>,
    key: "status",
    render: (_, record) => {
      return (
        <>
          {record?.status == "block" ? (
            <BlockButton>Block</BlockButton>
          ) : (
            <UnBlockButton>Unblock</UnBlockButton>
          )}
        </>
      );
    },
  },
];

export const TodayJobData: DataType[] = [
  {
    key: "1",
    name: "Jennifer Levine",
    email: "jennifer@gmail.com",
    FirstLocation: "Bosworth",
    LastLocation: "Westminster",
    vehicle: "Van",
    totalStops: 4,
    totalItems: "12 Boxes",
    status: "block",
    time: "10:00pm",
    Jobstatus: "cancelled",
    role: "User",
    price: "£250",
    image: driverImage,
    date: "02-01-2024",
  },
  {
    key: "2",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    FirstLocation: "Bosworth",
    LastLocation: "Westminster",
    totalStops: 10,
    vehicle: "Car",
    totalItems: "12 Boxes",
    time: "11:00pm",
    status: "unblock",
    Jobstatus: "Competed",
    role: "User",
    price: "£250",
    image: customerImage,
    date: "02-01-2024",
  },
  {
    key: "3",
    name: "Leo Stanton",
    email: "Leo@gmail.com",
    FirstLocation: "Westminster",
    LastLocation: "Bosworth",
    totalStops: 7,
    vehicle: "Van",
    totalItems: "12 Boxes",
    time: "09:00pm",
    status: "block",
    Jobstatus: "Competed",
    role: "Driver",
    price: "£250",
    image: userImage,
    date: "02-01-2024",
  },
  {
    key: "4",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    FirstLocation: "Bosworth",
    LastLocation: "Westminster",
    totalStops: 7,
    totalItems: "12 Boxes",
    vehicle: "Van",
    status: "unblock",
    time: "11:00am",
    Jobstatus: "Competed",
    role: "User",
    price: "£250",
    image: driverImage,
    date: "02-01-2024",
  },
  {
    key: "5",
    name: "Jennifer Levine",
    email: "jennifer@gmail.com",
    FirstLocation: "Bosworth",
    LastLocation: "Westminster",
    totalItems: "18 Boxes",
    totalStops: 15,
    vehicle: "Lutton van",
    status: "block",
    time: "07:00am",
    Jobstatus: "Competed",
    role: "Driver",
    price: "£250",
    image: customerImage,
    date: "02-01-2024",
  },
  {
    key: "6",
    name: "Leo Stanton",
    email: "Leo@gmail.com",
    FirstLocation: "Bosworth",
    LastLocation: "Westminster",
    totalItems: "18 Boxes",
    totalStops: 15,
    vehicle: "Lutton van",
    status: "block",
    time: "07:00am",
    Jobstatus: "Competed",
    role: "Driver",
    price: "£250",
    image: userImage,
    date: "02-01-2024",
  },
  {
    key: "7",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    FirstLocation: "Bosworth",
    LastLocation: "Westminster",
    totalItems: "18 Boxes",
    totalStops: 15,
    vehicle: "Lutton van",
    status: "block",
    time: "07:00am",
    Jobstatus: "Competed",
    role: "Driver",
    price: "£250",
    image: driverImage,
    date: "02-01-2024",
  },
];

export const data: DataType[] = [
  {
    key: "1",
    name: "Jennifer Levine",
    email: "jennifer@gmail.com",
    regDate: "02-01-2024",
    status: "block",
    image: userImage,
  },
  {
    key: "2",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    regDate: "02-01-2024",
    status: "unblock",
    image: driverImage,
  },
  {
    key: "3",
    name: "Leo Stanton",
    email: "Leo@gmail.com",
    regDate: "02-01-2024",
    status: "block",
    image: customerImage,
  },
  {
    key: "4",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    regDate: "02-01-2024",
    status: "unblock",
    image: driverImage,
  },
  {
    key: "5",
    name: "Jennifer Levine",
    email: "jennifer@gmail.com",
    regDate: "02-01-2024",
    status: "block",
    image: userImage,
  },
];

export const Userdata: DataType[] = [
  {
    key: "1",
    name: "Jennifer Levine",
    email: "jennifer@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "block",
    age: 22,
    amount: "£200",
    image: customerImage,
  },
  {
    key: "2",
    name: "Leo Stanton",
    email: "Leo@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "unblock",
    age: 22,
    amount: "£200",
    image: userImage,
  },
  {
    key: "3",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "block",
    age: 22,
    amount: "£200",
    image: driverImage,
  },
  {
    key: "4",
    name: "Leo Stanton",
    email: "Leo@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "unblock",
    age: 22,
    amount: "£200",
    image: customerImage,
  },
  {
    key: "5",
    name: "Jennifer Levine",
    email: "jennifer@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "block",
    age: 22,
    amount: "£200",
    image: userImage,
  },
  {
    key: "6",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "block",
    age: 22,
    amount: "£200",
    image: customerImage,
  },
  {
    key: "7",
    name: "Jennifer Levine",
    email: "jennifer@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "unblock",
    age: 22,
    amount: "£200",
    image: driverImage,
  },
  {
    key: "8",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "block",
    age: 22,
    amount: "£200",
    image: userImage,
  },
  {
    key: "9",
    name: "Leo Stanton",
    email: "Leo@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "unblock",
    age: 22,
    amount: "£200",
    image: driverImage,
  },
  {
    key: "10",
    name: "Marcus Culhane",
    email: "marcus@gmail.com",
    phone: 9865949865,
    regDate: "02-01-2024",
    status: "block",
    age: 22,
    amount: "£200",
    image: userImage,
  },
];
