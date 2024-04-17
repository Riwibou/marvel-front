const SearchBar = ({ setName, setCounter, setSkip }) => {
  return (
    <section className="search">
      <div>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          className="search-character"
          type="text"
          placeholder="Search a Hero or Comic ..."
          onChange={(event) => {
            setName(event.target.value);
            setCounter(1);
            setSkip(0);
          }}
        />
      </div>
    </section>
  );
};

export default SearchBar;
