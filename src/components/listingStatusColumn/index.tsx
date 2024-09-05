import React from "react";
import { Action, BlockButton, UnBlockButton } from "styles/dashboard";
interface ListingStatusColumnProps {
  record: {
    isBlocked: boolean;
    _id: string;
  };
  onStatusChange: (event: object, key: string, id: string) => void;
}

const ListingStatusColumn: React.FC<ListingStatusColumnProps> = ({
  record,
  onStatusChange,
}) => {
  return (
    <Action>
      {record?.isBlocked === true ? (
        <BlockButton
          onClick={(event) => onStatusChange(event, "block", record?._id)}
        >
          Block
        </BlockButton>
      ) : (
        <UnBlockButton
          onClick={(event) => onStatusChange(event, "un-block", record?._id)}
        >
          Unblock
        </UnBlockButton>
      )}
    </Action>
  );
};
export default ListingStatusColumn;
