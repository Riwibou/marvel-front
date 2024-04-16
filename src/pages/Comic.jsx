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
        // characs du comic

        const characResponse = await axios.get(`https://site--marvel--gpvxp89pqghq.code.run/characters`);
        const characData = characResponse.data.results.filter(charac => charac.comics.includes(comic._id));
        setCharacs(characData);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComicAndCharacs()
  }, [comic]);

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
