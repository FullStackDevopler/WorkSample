import React from "react";
import { ActionsWrapper, Icon } from "styles/pages/userManagement";
import { ListingActionProps } from "interfaces/iCommon";
import { getIconType, getClickByType } from "utils";

const ListingAction: React.FC<ListingActionProps> = ({
  actionMenu,
  onActionClick,
  record,
}) => {
  return (
    <ActionsWrapper>
      {actionMenu?.map((obj: any, i: any, arr: any) => {
        return (
          <>
            {obj?.isIcon ? (
              <div
                style={{ display: "flex" }}
                onClick={(event) =>
                  getClickByType(record?.isVerify, obj)
                    ? onActionClick(event, obj?.actionKey, record)
                    : undefined
                }
              >
                {getIconType(record?.isVerify, obj)}
              </div>
            ) : (
              <Icon
                src={obj.icon}
                onClick={(event) =>
                  onActionClick(event, obj?.actionKey, record)
                }
              />
            )}
          </>
        );
      })}
    </ActionsWrapper>
  );
};

export default ListingAction;
