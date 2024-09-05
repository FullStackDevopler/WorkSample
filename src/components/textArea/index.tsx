import { Controller } from "react-hook-form";

import { Textarea, TextareaWrapper } from "styles/updateProfile";
const TextArea = (props: any) => {
  return (
    <>
      <TextareaWrapper className={props.className}>
        <Controller
          render={({ field }) => (
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          )}
          {...props}
        />
      </TextareaWrapper>
    </>
  );
};

export default TextArea;
