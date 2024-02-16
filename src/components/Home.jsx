const Home = ({ search, setSearch, handleSearch }) => {
  return (
    <div>
      <p>
        find countries: <input value={search} onChange={handleSearch} />{" "}
      </p>
    </div>
  );
};

export default Home;
