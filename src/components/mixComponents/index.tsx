import React from "react";
import { InputWrapper, Input } from "styles/pages/Login";
import FieldError from "components/fieldError";
import TextArea from "antd/es/input/TextArea";
import { SlCalender } from "react-icons/sl";
import { FaTransgender } from "react-icons/fa";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { getGenderById } from "utils";
import { GENDER_OPTIONS } from "constants/common";

interface MixComponentsProps {
  fieldObj: any;
  i: any;
  setTouched: (touched: any) => void;
  touched: any;
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors: any;
}

const disabledDate = (current: any) => {
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  return current && current > eighteenYearsAgo;
};

// const formattedDate = (originalDate: any) => {
//   const parts = originalDate?.split("/");
//   const newDate = `${parts?.[2]}-${parts?.[1]}-${parts?.[0]}`;
//   return newDate;
// };

const MixComponents: React.FC<MixComponentsProps> = ({
  fieldObj,
  i,
  setTouched,
  touched,
  values,
  setFieldValue,
  errors,
}) => {
  return (
    <>
      {fieldObj.component === "input" && (
        <div
          className={`${fieldObj.className}`}
          style={{ maxWidth: fieldObj?.width }}
        >
          <InputWrapper key={`${fieldObj?.name}-${i}`}>
            {fieldObj?.icon && fieldObj?.icon}
            <Input
              onBlur={() =>
                setTouched({
                  ...touched,
                  [fieldObj?.name]: true,
                })
              }
              disabled={fieldObj?.disabled}
              value={values?.[fieldObj?.name]}
              name={fieldObj?.name}
              type={fieldObj?.type}
              placeholder={fieldObj?.placeholder}
              onChange={(event) => {
                setFieldValue(fieldObj?.name, event.target.value);
              }}
            />
          </InputWrapper>
          <FieldError
            width="200px"
            fieldName={fieldObj?.name}
            errors={errors}
            touched={touched}
          />
        </div>
      )}
      {fieldObj.component === "text-area" && (
        <TextArea
          rows={fieldObj.rows}
          placeholder={fieldObj.placeholder}
          minLength={fieldObj.minLength}
          className={fieldObj.className}
        />
      )}
      {fieldObj.component === "date-picker" && (
        <InputWrapper className={fieldObj.className}>
          <SlCalender color="#A1A1A1" size={30} />
          <DatePicker
            name={fieldObj.name}
            allowClear={false}
            disabledDate={disabledDate}
            className={fieldObj.componentClassName}
            suffixIcon={null}
            placeholder={fieldObj?.placeholder}
            onChange={(date, dateString) => {
              setFieldValue(fieldObj.name, dateString);
            }}
            value={dayjs(values?.[fieldObj.name])}
          />
        </InputWrapper>
      )}
      {fieldObj.component === "select" && (
        <InputWrapper className={fieldObj.className}>
          <FaTransgender color="#A1A1A1" size={30} />
          <Select
            value={getGenderById(values?.[fieldObj.name])}
            placeholder={fieldObj.placeholder}
            options={GENDER_OPTIONS}
            onChange={(value) => {
              setFieldValue(fieldObj.name, value);
            }}
          />
        </InputWrapper>
      )}
    </>
  );
};
export default MixComponents;
