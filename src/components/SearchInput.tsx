import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useDebounce from "../hooks/useDebounce";
import qs from "query-string";
import Input from "../components/Input";

const SearchInput = () => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const query = { title: debouncedValue };

    const url = qs.stringifyUrl({ url: "/search", query: query });
    navigate(url, { replace: true });
  }, [debouncedValue]);

  return (
    <div>
      <Input
        placeholder="What do you want to listen to ?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
