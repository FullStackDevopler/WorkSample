import { InputWrapper, Input } from "styles/pages/Login";
import { CiMail } from "react-icons/ci";
import { Controller } from "react-hook-form";
import { LuPhone } from "react-icons/lu";
import { useState } from "react";
const PasswordInputs = (props: any) => {
  const [type, setType] = useState("password");
  return (
    <>
      <InputWrapper className={props.className}>
        {props.type === "number" && <LuPhone color="#A1A1A1" size={30} />}
        {props.type === "email" && <LuPhone color="#A1A1A1" size={30} />}

        <CiMail color="#A1A1A1" size={30} />
        <Controller
          render={({ field }) => (
            <Input {...props} {...field} type={props.type} />
          )}
          {...props}
        />
      </InputWrapper>
    </>
  );
};

export default PasswordInputs;
