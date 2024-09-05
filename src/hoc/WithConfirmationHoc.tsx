import { useState } from "react";
import { Modal } from "antd";
import { ModalContent, FilterSearchButton } from "styles/pages/userManagement";
import { ModalTitle, ButtonWrapper, Reject, Accept } from "styles/modal";
import { ConfirmationRow } from "styles/updateProfile";

const intialValues = {
  open: false,
  title: "",
  description: "",
  cancelButtonLabel: "",
  buttonLabel: "",
  onConfirmClick: () => {},
};

const WithConfirmationHoc: any = (WrappedComponent: any) => {
  const NewWrappedComponent = (props: any) => {
    const [modalContent, setModalContent] = useState(intialValues);

    const handleCancel = () => {
      setModalContent(intialValues);
    };
    return (
      <>
        <WrappedComponent
          {...props}
          setModalContent={setModalContent}
          modalContent={modalContent}
          handleCancel={handleCancel}
        />

        <Modal
          open={modalContent?.open}
          onOk={modalContent?.onConfirmClick}
          onCancel={handleCancel}
          footer={false}
          centered
        >
          <ModalContent>
            <ModalTitle>{modalContent.title}</ModalTitle>
            <div style={{ fontSize: "16px", marginTop: "6px" }}>
              {modalContent?.description}
            </div>
            <ConfirmationRow>
              <ButtonWrapper
                onClick={handleCancel}
                style={{ paddingTop: "14px" }}
              >
                <Reject style={{ height: "30px", width: "100px" }}>
                  {modalContent?.cancelButtonLabel}
                </Reject>
              </ButtonWrapper>
              <ButtonWrapper
                onClick={modalContent?.onConfirmClick}
                style={{ paddingTop: "14px" }}
              >
                <Accept style={{ height: "30px", width: "100px" }}>
                  {modalContent?.buttonLabel}
                </Accept>
              </ButtonWrapper>
            </ConfirmationRow>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return NewWrappedComponent;
};

export default WithConfirmationHoc;
