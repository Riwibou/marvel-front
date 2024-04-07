import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination"

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [charactersPerPage] = useState(100)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?`
        );
        setCharacters(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacters();
  }, []);

  const indexOfLastCharacter = currentPage * charactersPerPage
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  )

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return isLoading ? (
    <p>😩 Loading 😩</p>
  ) : (
    <div className="main">
      <div className="characters-container">
        {characters
          .filter((character) => {
            // Filtre les sans photo//
            return (
              character.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
            );
          }) // .map sur le reste
          .map((character) => {
            const {_id} = character
            console.log("id ====>", _id);
            return (
              <div key={character._id} className="character-card">
                <h1>{character.name}</h1>
                <Link
                  to={`/comics/${_id}`}
                >
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
            );
          })}
      </div>
    </div>
  );
};

export default Characters;
