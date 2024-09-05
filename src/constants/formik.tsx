import { LuPhone, LuUser2 } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import * as Yup from "yup";

const Fields = {
  fullName: {
    title: "user",
    type: "text",
    name: "full_name",
    placeholder: "Full Name",
    className: "custome",
    component: "input",
    icon: <LuUser2 color="#A1A1A1" size={30} />,
    width: "400px",
  },
  userPhone: {
    title: "",
    type: "tel",
    name: "phone",
    placeholder: "Phone Number",
    className: "custome",
    component: "input",
    icon: <LuPhone color="#A1A1A1" size={30} />,
    width: "400px",
  },
  userEmail: {
    title: "",
    type: "email",
    name: "email",
    placeholder: "Email",
    className: "custome",
    component: "input",
    icon: <CiMail color="#A1A1A1" size={30} />,
    width: "400px",
    disabled: true,
  },
  companyPhoneNumber: {
    title: "",
    type: "tel",
    name: "company_number",
    placeholder: "Company Number",
    className: "custome",
    component: "input",
    icon: <LuPhone color="#A1A1A1" size={30} />,
    width: "400px",
  },

  address1: {
    title: "",
    type: "text",
    name: "address1",
    placeholder: "Address Line 1",
    className: "custome",
    component: "input",
    width: "400px",
  },
  address2: {
    title: "",
    type: "text",
    name: "address2",
    placeholder: "Address Line 2",
    className: "custome",
    component: "input",
    width: "400px",
  },
  city: {
    title: "",
    type: "text",
    name: "city",
    placeholder: "City",
    className: "custome",
    component: "input",
    // width: "250px",
    width: "400px",
  },
  state: {
    title: "",
    type: "text",
    name: "state",
    placeholder: "State",
    className: "custome",
    component: "input",
    // width: "250px",
    width: "400px",
  },
  zipcode: {
    title: "",
    type: "text",
    name: "zipcode",
    placeholder: "Zip Code",
    className: "custome",
    component: "input",
    // width: "250px",
    width: "400px",
  },
  note: {
    rows: 4,
    placeholder: "Note..",
    minLength: 6,
    className: "textarea",
    component: "text-area",
  },
  dob: {
    name: "dob",
    className: "custome",
    componentClassName: "styleDate",
    placeholder: "Date Of Birth",
    component: "date-picker",
  },
  gender: {
    name: "gender",
    className: "custome",
    placeholder: "Select Gender",
    component: "select",
  },
};

export const formSchema = {
  full_name: Yup.string()
    .min(3, "Username should be between (2-40) characters")
    .max(39, "Username should be between (2-40) characters")
    .matches(/^[a-zA-Z]+$/, "Name must contain only alphabets")
    .required("Required*"),
  email: Yup.string().email().required("Required*"),
  phone: Yup.string()
    .length(10, "Phone no. should be of 10 digits")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Required*"),
  company_number: Yup.string()
    .length(10, "Company no. should be of 10 digits")
    .matches(/^[0-9]+$/, "Company number must contain only digits")
    .required("Required*"),
  address1: Yup.string().max(50, "Address 1 should be max of 50 characters."),
  address2: Yup.string().max(50, "Address 2 should be max of 50 characters."),
  city: Yup.string()
    .min(4, "city should be between (3-40) characters")
    .max(39, "city should be between (3-40) characters")
    .required("Required*"),
  state: Yup.string()
    .min(4, "state should be between (3-40) characters")
    .max(39, "state should be between (3-40) characters")
    .required("Required*"),
  zipcode: Yup.string()
    .min(5, "Zipcode should be alphanumeric and between (4-8) characters")
    .max(7, "Zipcode should be alphanumeric and between (4-8) characters")
    .required("Required*"),
};

export const UPDATE_USER_FORM: any = {
  form_fields: [
    [Fields.fullName, Fields.userPhone],
    [Fields.userEmail, Fields.companyPhoneNumber],
    [Fields.address1, Fields.address2],
    [Fields.city, Fields.state, Fields.zipcode],
    [Fields.note],
  ],
  initialValues: {
    full_name: "",
    email: "",
    phone: "",
    password: "",
    company_number: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    note: "",
    photo: "",
  },
  formSchema: Yup.object().shape({
    full_name: formSchema.full_name,
    email: formSchema.email,
    phone: formSchema.phone,
    company_number: formSchema.company_number,
    address1: formSchema.address1,
    address2: formSchema.address2,
    city: formSchema.city,
    state: formSchema.state,
    zipcode: formSchema.zipcode,
  }),
};

export const UPDATE_DRIVER_FORM: any = {
  form_fields: [
    [Fields.fullName, Fields.userPhone],
    [Fields.userEmail, Fields.address1],
    [Fields.address2, Fields.city],
    [Fields.state, Fields.zipcode],
    [Fields.note],
    [Fields.dob, Fields.gender],
  ],
  initialValues: {
    full_name: "",
    email: "",
    phone: "",
    password: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    note: "",
    photo: "",
    dob: "",
    gender: "",
  },
  formSchema: Yup.object().shape({
    full_name: formSchema.full_name,
    email: formSchema.email,
    phone: formSchema.phone,
    address1: formSchema.address1,
    address2: formSchema.address2,
    city: formSchema.city,
    state: formSchema.state,
    zipcode: formSchema.zipcode,
  }),
};
