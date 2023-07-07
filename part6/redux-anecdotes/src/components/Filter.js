import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter, clearFilter } from "../reducers/filterReducer";

const Filter = () => {
  const [filterContent, setFilterContent] = useState("");

  const dispatch = useDispatch();

  // Setfiltercontent updates to slow for dispatch to pick it up.
  const handleFilterChange = (event) => {
    setFilterContent(event.target.value);
    dispatch(setFilter(event.target.value));
  };

  const clearInputFilter = (event) => {
    event.preventDefault();
    setFilterContent("");
    dispatch(clearFilter());
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <p>
        filter <input value={filterContent} onChange={handleFilterChange} />
      </p>
      <button onClick={clearInputFilter}>clear filter</button>
    </div>
  );
};

export default Filter;
