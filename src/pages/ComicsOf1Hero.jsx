import { useEffect, useState, useContext } from "react";
import axios from "axios";
import BookmarkContext from "../context/bookmarkProvider"
import { useParams } from "react-router-dom";

const ComicsOf1Hero = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const id = useParams()

  const {
    state: { bookmarks },
    dispatch,
  } = useContext(BookmarkContext);

  const setBookmark = (comic) => {
    let bookmark = {
      title: comic.title,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      description: comic.description }
    return bookmark
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel--gpvxp89pqghq.code.run/comics/${id.characterId}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <p> Chargement </p>
    // trouver une icone de chargement react a mettre ici
  ) : (
    <div className="main">
      <div className="characters-container">
        {data.comics.map((comic, index) => {
          let bookmark = setBookmark(comic)
          bookmark.id = index;

          return (
            <div key={comic._id} className="character-card">
              <div className="character-info">
                <h1>{comic.title}</h1>
              </div>
              <div className="character-image"
              onClick={() =>
                dispatch({
                type: 'ADD_TO_BOOKMARK',
                payload: { bookmark },
                })
              }>
                <div className="svg-container">
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >

                    <path
                      d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
                      stroke="#464455"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
              </div>
              <div className="character-description">
                  <span>{comic.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsOf1Hero;
