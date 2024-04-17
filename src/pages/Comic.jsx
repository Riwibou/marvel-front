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

        const allCharactersPromises = [];
        let totalPages = 1;
        let page = 1;

        while (page <= totalPages) {
          console.log(`Fetching page ${page}...`);
          const response = await axios.get(`https://site--marvel--gpvxp89pqghq.code.run/characters?page=${page}`);
          console.log(`Response for page ${page}:`, response);
          allCharactersPromises.push(response);
          page++;
        }

        console.log('All characters promises:', allCharactersPromises);

        const allCharactersResponses = await Promise.all(allCharactersPromises);
        console.log('All characters responses:', allCharactersResponses);

        const allCharacters = allCharactersResponses.flatMap(response => response.data.results);
        console.log('All characters:', allCharacters);

        const characData = allCharacters.filter(charac => charac.comics.includes(comic._id));
        console.log('Filtered characters:', characData);

        setCharacs(characData);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchComicAndCharacs();
  }, [comic]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>Comic Details:</h2>
      <p>Name: {comic.title}</p>
      <p>Description: <span dangerouslySetInnerHTML={{ __html: comic.description }} /></p>
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
