import { Table } from "antd";
import { Amount, TableWrapper } from "styles/dashboard";
import {
  Filter,
  FilterIcon,
  FilterWrapper,
  RightSec,
  TableTitle,
  Text,
  Reset,
} from "styles/pages/userManagement";
import filterIcone from "assets/images/filterIcon.png";
import { SearchableInput } from "components";

const TableContainer = ({
  isSearchAble = false,
  onResetClick = () => {},
  title,
  data,
  colums,
  setfilter,
  filter,
  type,
  amount,
  totalCount,
  onPaginationChange,
  filtertext,
  onSearchChange,
  filterValue,
}: any) => {
  return (
    <TableWrapper>
      <FilterWrapper>
        {isSearchAble ? (
          <SearchableInput
            onSearchChange={onSearchChange}
            filterValue={filterValue}
          />
        ) : (
          <TableTitle>{title}</TableTitle>
        )}
        <RightSec>
          {amount && (
            <Amount>
              <span>Total Amount :</span> 1,250
            </Amount>
          )}
          <Reset onClick={onResetClick}>
            <Text>Reset</Text>
          </Reset>
          <Filter onClick={() => type === "user" && setfilter(!filter)}>
            <Text>{filtertext}</Text>
            <FilterIcon src={filterIcone} />
          </Filter>
        </RightSec>
      </FilterWrapper>
      <Table
        className="tableStyle"
        columns={colums}
        dataSource={data}
        pagination={{
          total: totalCount,
          onChange: onPaginationChange,
        }}
      />
    </TableWrapper>
  );
};

export default TableContainer;
