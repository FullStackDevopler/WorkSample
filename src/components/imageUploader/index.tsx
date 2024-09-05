import React from "react";
import { ImageWrapper, Image } from "styles/commonStyle";
import { Upload } from "antd";
import { ChangeText } from "styles/updateProfile";
import userIcon from "../../assets/images/no-user.jpg";
import { getToast } from "utils";
import { TOAST_MESSAGE } from "constants/common";

interface ImageUploaderProps {
  image: any;
  setFieldValue: any;
  setImage: any;
  values: any;
}

const ALLOW_IMAGES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/svg",
];

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  setFieldValue,
  setImage,
}) => {
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    const MBSzie = (file?.size / (1024 * 1024)).toFixed(2);

    if (!ALLOW_IMAGES.includes(file?.type)) {
      getToast("error", TOAST_MESSAGE.WRONG_FILE);
    } else {
      if (Number(MBSzie) > 2) {
        getToast("error", TOAST_MESSAGE.SIZE_ERROR);
      } else {
        setFieldValue("photo", file);
        const url = URL.createObjectURL(file);
        setImage(url);
      }
    }
  };

  const handleImageUpload: any = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("File input element not found.");
    }
  };

  return (
    <ImageWrapper>
      <Image src={image !== null ? image : userIcon} />
      <input
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        id="fileInput"
        accept=".jpg, .jpeg, .png, .svg"
      />
      <ChangeText onClick={handleImageUpload}>Change Profile</ChangeText>
    </ImageWrapper>
  );
};

export default ImageUploader;
