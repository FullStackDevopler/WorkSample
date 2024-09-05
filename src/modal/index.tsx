import { Button, Modal } from "antd";
import { useState } from "react";

export const ModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <button>sadasd</button>
    </Modal>
  );
};
