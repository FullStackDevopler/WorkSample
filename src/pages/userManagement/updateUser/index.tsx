import { useLayoutEffect, useState } from "react";
import { UserWrapper, DetailsWrapper } from "styles/commonStyle";
import { BreadcrumbWrap, Container, Title } from "styles/dashboard";
import { Wrapper } from "styles/pages/userManagement";
import {
  BackButton,
  ButtonText,
  ButtonWrapper,
  TopSection,
  UpDateCusButton,
} from "styles/unAssignedJob";
import { Breadcrumb } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Row } from "styles/updateProfile";
import { UPDATE_USER_FORM } from "constants/formik";
import { useFormik } from "formik";
import { APIS, BASE_URL } from "api/api.constant";
import { postApi } from "api/api.client";
import { getToast } from "utils";
import { ImageUploader, MixComponents } from "components";
import { toggleLoader } from "../../../redux/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { TOAST_MESSAGE } from "constants/common";

export const UpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    dispatch(toggleLoader({ loader: true }));
    postApi(`${APIS.GET_USER_BY_ID}/${id}`, {})
      .then((result: any) => {
        setUserData(result?.data);
        if (result?.data?.photo !== null) {
          setImage(`${BASE_URL}/${result?.data?.photo}`);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        dispatch(toggleLoader({ loader: false }));
      });
  }, []);

  const onSubmit = (payload: any) => {
    dispatch(toggleLoader({ loader: true }));
    let formData = new FormData();
    formData.append("full_name", payload.full_name);
    formData.append("phone", payload.phone);
    formData.append("email", payload.email);
    formData.append("isActive", payload.isActive);
    formData.append("isBlocked", payload.isBlocked);
    formData.append("isVerify", payload.isVerify);
    formData.append("city", payload.city);
    formData.append("state", payload.state);
    formData.append("zipcode", payload.zipcode);
    formData.append("company_number", payload.company_number);
    formData.append("address1", payload.address1);
    formData.append("address2", payload.address2);
    if (id) {
      formData.append("userId", id);
    }

    if (values?.photo !== null) {
      formData.append("image", payload?.photo);
    }

    postApi(APIS.UPDATE_USER, Object.fromEntries(formData), true)
      .then((result: any) => {
        getToast("success", TOAST_MESSAGE.UPDATED);
        navigate(-1);
      })
      .catch((err: any) => {})
      .finally(() => {
        dispatch(toggleLoader({ loader: false }));
      });
  };

  const formik = useFormik({
    initialValues: id ? userData : UPDATE_USER_FORM.initialValues,
    onSubmit: onSubmit,
    validationSchema: UPDATE_USER_FORM.formSchema,
    enableReinitialize: true,
  });

  const { handleSubmit, errors, values, setFieldValue, touched, setTouched } =
    formik;

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
              title: <Link to={"/user-management"}>User Management</Link>,
            },
            {
              title: <Link to={`/user-management/${id}`}>User Job Detail</Link>,
            },
            {
              title: "Update Profile",
            },
          ]}
        />
      </BreadcrumbWrap>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <TopSection>
            <Title>Update Profile</Title>
            <ButtonWrapper>
              <UpDateCusButton type="submit">Update</UpDateCusButton>
              <BackButton onClick={() => navigate(-1)}>
                <ButtonText>Cancel</ButtonText>
              </BackButton>
            </ButtonWrapper>
          </TopSection>
          <UserWrapper>
            <DetailsWrapper className="img-start">
              <ImageUploader
                image={image}
                setImage={setImage}
                setFieldValue={setFieldValue}
                values={values}
              />

              <Form>
                {UPDATE_USER_FORM.form_fields.map(
                  (obj: any, i: any, arr: any) => {
                    return (
                      <Row style={{ paddingRight: "37px" }}>
                        {obj?.map((fieldObj: any, i: any, arr: any) => {
                          return (
                            <MixComponents
                              fieldObj={fieldObj}
                              i={i}
                              setTouched={setTouched}
                              touched={touched}
                              values={values}
                              setFieldValue={setFieldValue}
                              errors={errors}
                            />
                          );
                        })}
                      </Row>
                    );
                  }
                )}
              </Form>
            </DetailsWrapper>
          </UserWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};
