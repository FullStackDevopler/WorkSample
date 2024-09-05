import React from "react";

interface FieldErrorProps {
  width: any;
  fieldName: string;
  errors: any;
  touched: any;
}

const FieldError: React.FC<FieldErrorProps> = ({
  width,
  fieldName,
  errors,
  touched,
}) => {
  return (
    <>
      {errors?.[fieldName] && touched?.[fieldName] ? (
        <div
          style={{
            color: "red",
            textTransform: "capitalize",
            fontSize: "13px",
            fontStyle: "italic",
            fontWeight: 500,
            marginLeft: "10px",
            wordWrap: "break-word",
            width: width,
          }}
        >
          {errors?.[fieldName]}
        </div>
      ) : (
        <div style={{ color: "red", visibility: "hidden", fontSize: "13px" }}>
          Error
        </div>
      )}
    </>
  );
};

export default FieldError;

// errors: Record<string, string>;
// touched: Record<string, boolean>;
