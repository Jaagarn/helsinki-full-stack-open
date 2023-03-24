export const Filter = ({ filter, handleOnChangedFilter }) => {
  return (
    <>
      <p>
        find countries{" "}
        <input type="search" value={filter} onChange={handleOnChangedFilter} />
      </p>
    </>
  );
};

export default Filter;
