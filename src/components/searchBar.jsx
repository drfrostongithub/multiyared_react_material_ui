import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch, searchText }) => {
  return (
    <TextField
      label='Search'
      variant='standard'
      value={searchText}
      onChange={onSearch}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
