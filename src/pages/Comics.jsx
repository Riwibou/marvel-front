import { useEffect, useState } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState();
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics`
        );

        console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchData();
  }, []);
  return isloading ? (
    <p> Chargement </p>
    // trouver une icone de chargement react a mettre ici
  ) : (
    <div className="main">
      <div className="characters-container">
        {data.results.map((comic) => {
          return (
            <div key={comic._id} className="character-card">
              <h1>{comic.title}</h1>

              <div className="character-info">
                <div className="character-image">
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                </div>
                <div className="character-description">
                  <p>{comic.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
