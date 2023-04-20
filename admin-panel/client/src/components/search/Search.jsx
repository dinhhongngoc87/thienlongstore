import "./search.css";
function Search({ setSearchValue }) {
  const handleOnchange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <div className="search__container">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => handleOnchange(e)}
        />
        <i className="bx bx-search"></i>
      </div>
    </>
  );
}

export default Search;
