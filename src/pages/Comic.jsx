import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Comic() {
  const location = useLocation();
  const comic = location.state?.comic;
  const [characs, setCharacs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComicAndCharacs = async () => {
      try {
        if (!comic) return;

        console.log("Comic ID:", comic._id);

        const totalPages = await getTotalPages();
        console.log("Total Pages:", totalPages);

        const allCharacters = await fetchAllCharacters(totalPages);
        console.log("All Characters:", allCharacters);

        const characData = allCharacters.filter(charac => charac.comics.includes(comic._id));
        console.log("Filtered Characters:", characData);

        setCharacs(characData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComicAndCharacs();
  }, [comic]);

  async function getTotalPages() {
    try {
      const response = await axios.get(`https://site--marvel--gpvxp89pqghq.code.run/characters`);
      return response.data.totalPages;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  async function fetchAllCharacters(totalPages) {
    let allCharacters = [];

    for (let page = 1; page <= totalPages; page++) {
      try {
        const response = await axios.get(`https://site--marvel--gpvxp89pqghq.code.run/characters?page=${page}`);
        allCharacters = allCharacters.concat(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }

    return allCharacters;
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>Comic Details:</h2>
      <p>Name: {comic.title}</p>
      <p>Description: {comic.description}</p>
      <p>Thumbnail: <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name} /></p>

      <h2>Heroes in this Comic:</h2>
      <ul>
        {characs.map(charac => (
          <li key={charac._id}>
            {charac.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comic;
