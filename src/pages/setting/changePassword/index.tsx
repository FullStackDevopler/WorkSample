import { UserWrapper, DetailsWrapper } from "styles/commonStyle";
import userImage2 from "assets/images/updatepassword.png";
import { Container, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import { useState } from "react";
import { Form } from "styles/updateProfile";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { TfiKey } from "react-icons/tfi";
import {
  FormTitle,
  Image,
  ImageWrapper,
  Label,
  SubmitButton,
} from "styles/view";
import { useFormik } from "formik";
import FieldError from "components/fieldError";
import { Input, Wrapper as NewWrapper, InputWrapper } from "styles/pages/Login";
import { changePasswordSchema } from "constants/schema";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../../redux/slices/loaderSlice";
import { postApi } from "api/api.client";
import { APIS } from "api/api.constant";
import { getToast } from "utils";
import { TOAST_MESSAGE } from "constants/common";

const initialValues: any = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
export const ChangePassword = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state: any) => state?.authSlice?.userId);

  const [fieldType, setFieldType]: any = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true,
  });
  const onSubmit = (payload: any, { resetForm }: any) => {
    dispatch(toggleLoader({ loader: true }));
    postApi(APIS.CHANGE_PASSWORD, {
      userId: currentUserId,
      password: payload?.oldPassword,
      newPassword: payload?.confirmPassword,
    })
      .then((res) => {
        getToast("success", TOAST_MESSAGE.UPDATED);
        resetForm();
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(toggleLoader({ loader: false }));
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: changePasswordSchema,
    enableReinitialize: true,
  });

  const { handleSubmit, errors, values, setFieldValue, touched, setTouched } =
    formik;

  const FORM_FILEDS = [
    {
      label: "Old Password",
      name: "oldPassword",
      key: "oldPassword",
      type: fieldType?.oldPassword ? "password" : "text",
      placeholder: "Old Password",
    },
    {
      label: "New Password",
      name: "newPassword",
      key: "newPassword",
      type: fieldType?.newPassword ? "password" : "text",
      placeholder: "New Password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      key: "confirmPassword",
      type: fieldType?.confirmPassword ? "password" : "text",
      placeholder: "Confirm Password",
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Title>Change Password</Title>
        <UserWrapper>
          <DetailsWrapper className="img-start">
            <ImageWrapper>
              <Image src={userImage2} />
            </ImageWrapper>
            <Form onSubmit={handleSubmit}>
              <FormTitle>Update your password</FormTitle>
              {FORM_FILEDS.map((fieldObj, i, arr) => {
                return (
                  <NewWrapper key={`${fieldObj?.name}-${i}`}>
                    <Label>{fieldObj.label}</Label>
                    <InputWrapper className="input">
                      <TfiKey color="#A1A1A1" size={30} />
                      <Input
                        onBlur={() =>
                          setTouched({ ...touched, [fieldObj?.name]: true })
                        }
                        value={values?.[fieldObj?.name]}
                        name={fieldObj.name}
                        type={fieldObj?.type}
                        placeholder={fieldObj?.placeholder}
                        onChange={(event) => {
                          setFieldValue(fieldObj?.name, event.target.value);
                        }}
                      />
                      {fieldType?.[fieldObj?.key] ? (
                        <IoEyeOffOutline
                          color="#A1A1A1"
                          size={30}
                          cursor="pointer"
                          onClick={() => {
                            setFieldType({
                              ...fieldType,
                              [fieldObj?.key]: !fieldType?.[fieldObj?.key],
                            });
                          }}
                        />
                      ) : (
                        <IoEyeOutline
                          color="#A1A1A1"
                          size={30}
                          cursor="pointer"
                          onClick={() => {
                            setFieldType({
                              ...fieldType,
                              [fieldObj?.key]: !fieldType?.[fieldObj?.key],
                            });
                          }}
                        />
                      )}
                    </InputWrapper>
                    <FieldError
                      width="500px"
                      fieldName={fieldObj?.name}
                      errors={errors}
                      touched={touched}
                    />
                  </NewWrapper>
                );
              })}
              <SubmitButton type="submit">Update</SubmitButton>
            </Form>
          </DetailsWrapper>
        </UserWrapper>
      </Wrapper>
    </Container>
  );
};
