import { Modal, DatePicker } from "antd";
import {
  ModalContent,
  DateContainer,
  DateWrapper,
  FilterSearchButton,
} from "styles/pages/userManagement";
import { ModalTitle } from "styles/modal";
import dayjs from "dayjs";

interface CommonFilterProps {
  filter: any;
  handleOk: any;
  handleCancel: any;
  DATE_FILTERS: any;
  filterValue: any;
  setFilterValue: any;
  onSearchClick: any;
}

const disabledFutureDate = (current: any) => {
  return current && current > dayjs().endOf("day");
};

const CommonFilter: React.FC<CommonFilterProps> = ({
  filter,
  handleOk,
  handleCancel,
  DATE_FILTERS,
  filterValue,
  setFilterValue,
  onSearchClick,
}) => {
  return (
    <Modal
      open={filter}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      centered
    >
      <ModalContent>
        <ModalTitle>Filter</ModalTitle>
        <DateContainer>
          {DATE_FILTERS.map((obj: any, i: any, arr: any) => {
            return (
              <DateWrapper key={`${obj.key}-${i}`}>
                <DatePicker
                  className="styleDate"
                  placeholder={obj?.placeholder}
                  suffixIcon={null}
                  format="YYYY-MM-DD"
                  disabledDate={disabledFutureDate}
                  value={
                    (filterValue as any)[obj.key]
                      ? dayjs((filterValue as any)[obj.key])
                      : undefined
                  }
                  onChange={(date, dateString) => {
                    setFilterValue({
                      ...filterValue,
                      [obj.key]: dateString,
                    });
                  }}
                />
              </DateWrapper>
            );
          })}
        </DateContainer>
        <FilterSearchButton
          onClick={onSearchClick}
          style={{
            cursor:
              filterValue?.date_from === "" || filterValue?.date_to === ""
                ? "text"
                : "pointer",
          }}
          disabled={
            filterValue?.date_from === "" || filterValue?.date_to === ""
          }
        >
          Search
        </FilterSearchButton>
      </ModalContent>
    </Modal>
  );
};
export default CommonFilter;
