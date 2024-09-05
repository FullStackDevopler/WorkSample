import { Input, InputWrapper } from "styles/pages/Login";
import { FaSearch } from "react-icons/fa";

interface SearchableInputProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterValue: any;
}

const SearchableInput: React.FC<SearchableInputProps> = ({
  onSearchChange,
  filterValue,
}) => {
  return (
    <InputWrapper
      style={{
        height: "33px",
        alignItems: "center",
        border: "1px solid #494949",
        borderRadius: "35px",
        display: "flex",
        padding: "0 20px",
      }}
    >
      <FaSearch />
      <Input
        className="custome2"
        value={filterValue?.search}
        type="text"
        placeholder="Search"
        onChange={onSearchChange}
      />
    </InputWrapper>
  );
};

export default SearchableInput;
