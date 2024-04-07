/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios"

const CharacterFocus = ({ character }) => {
  const [comics, setComics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchComics = async () => {
      try {
        if (character.comics.length === 0) {
          setIsLoading(false);
          return;
        }

        const comicsData = []
          for (const comicId of character.comics) {
            const response = await axios.get('https://site--marvel--gpvxp89pqghq.code.run/comic/${characterId}')
            comicsData.push(response.data)
          }

        setComics(comicsData)
        setIsLoading(false)

      } catch (error) {
        console.log({ message: error.message });
      }
    }
    fetchComics()
  }, [character.comics])

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <div className="character-image">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </div>
      <div className="character-description">
        <p>{character.description || "No description available"}</p>
        <h2>Comics:</h2>
        {isLoading? (
          <p>Loading comics ...</p>
        ) : (
          <ul>
            {comics.map((comic) => (
              <li key={comic._id}>{comic.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CharacterFocus;
