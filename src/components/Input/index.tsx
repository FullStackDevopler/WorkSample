import { InputWrapper, Input } from "styles/pages/Login";
import { CiMail } from "react-icons/ci";
import { Controller } from "react-hook-form";
import { LuPhone } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { TfiKey } from "react-icons/tfi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
const Inputs = (props: any) => {
  return (
    <>
      <InputWrapper className={props.className}>
        {props.title === "user" && <LuUser2 color="#A1A1A1" size={30} />}
        {props.type === "tel" && <LuPhone color="#A1A1A1" size={30} />}
        {props.type === "email" && <CiMail color="#A1A1A1" size={30} />}
        {props?.inputType === "password" && (
          <TfiKey color="#A1A1A1" size={30} />
        )}
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              type={props.type}
              placeholder={props.placeholder}
            />
          )}
          {...props}
        />
        {props?.inputType === "password" &&
          (props.type === "password" ? (
            <IoEyeOffOutline
              color="#A1A1A1"
              size={30}
              cursor="pointer"
              onClick={() => props.setType("text")}
            />
          ) : (
            <IoEyeOutline
              color="#A1A1A1"
              size={30}
              cursor="pointer"
              onClick={() => props.setType("password")}
            />
          ))}
      </InputWrapper>
    </>
  );
};

export default Inputs;
