import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Container, Title } from "styles/dashboard";
import { Editor, SubmitButton } from "styles/pages/setting";
import {
  ButtonText,
  ButtonWrapper,
  TopSection,
  UpDateButton,
} from "styles/unAssignedJob";
import { Wrapper } from "styles/pages/userManagement";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../redux/slices/loaderSlice";
import { postApi } from "api/api.client";
import { APIS } from "api/api.constant";
import { getToast } from "utils";
import { CSM_SLUG_TYPE, TOAST_MESSAGE } from "constants/common";

export const AboutUs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contentId, setContentId] = useState("");
  const [data, setData] = useState("");

  const onSubmit = () => {
    if (data === "") {
      getToast("error", TOAST_MESSAGE.EMPTY_TEXT);
    } else {
      dispatch(toggleLoader({ loader: true }));
      postApi(APIS.UPDATE_CMS, {
        id: contentId,
        content: data,
      })
        .then((res) => {
          getToast("success", TOAST_MESSAGE.UPDATED);
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(toggleLoader({ loader: false }));
        });
    }
  };

  useEffect(() => {
    dispatch(toggleLoader({ loader: true }));
    postApi(APIS.GET_CMS, {
      type: CSM_SLUG_TYPE.ABOUT_US,
    })
      .then((res) => {
        let response: any = res;
        setData(response?.data?.content);
        setContentId(response?.data?._id);
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(toggleLoader({ loader: false }));
      });
  }, []);

  return (
    <Container>
      <Wrapper>
        <TopSection>
          <Title>About us</Title>
          <ButtonWrapper>
            <UpDateButton onClick={() => navigate("/about-us/view")}>
              <ButtonText> View</ButtonText>
            </UpDateButton>
          </ButtonWrapper>
        </TopSection>
        <Editor>
          <ReactQuill
            className="customeStyle"
            modules={{
              toolbar: [
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],

              clipboard: {
                matchVisual: false,
              },
            }}
            value={data}
            onChange={(data) => {
              setData(data);
            }}
          />
          <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
        </Editor>
      </Wrapper>
    </Container>
  );
};
