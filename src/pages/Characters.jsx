import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 100;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/characters?page=${currentPage}`);
        const filteredCharacters = response.data.results.filter(character => {
          return character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
                 character.thumbnail.extension !== "gif";
        });
        setCharacters(filteredCharacters);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCharacters();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="main">
      <div className="characters-container">
        {characters.map((character) => (
          <div key={character._id} className="character-card">
            <h1>{character.name}</h1>
            <Link to={`/comics/${character._id}`}>
              <div className="character-info">
                <div className="character-image">
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                </div>
                <div className="character-description">
                  <p>{character.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={charactersPerPage}
        totalItemsCount={1493}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default Characters;
