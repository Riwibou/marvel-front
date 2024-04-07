/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import BookmarkContext from "../context/bookmarkProvider"

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 100;

  const {
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
    const fetchComics = async () => {
      try {
        const response = await axios.get(`site--marvel--gpvxp89pqghq.code.run/comics?page=${currentPage}`);
        const filteredComics = response.data.results.filter(comic => {
          return comic.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
                 comic.thumbnail.extension !== "gif";
        });
        setComics(filteredComics);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComics();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="main">
      <div className="comics-container">
        {comics.map((comic, index) => {
          let bookmark = setBookmark(comic)
          bookmark.id = index;
          console.log(bookmark);

          return (
            <>
            <Link key={comic._id} to={`/comic/${comic._id}`}>
          <div key={comic._id} className="comic-card">
            <h1>{comic.name}</h1>
              <div className="comic-info">
                <div className="comic-image"
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
                    alt={comic.name}
                  />
                </div>
                <div className="comic-description">
                  <p>{comic.description}</p>
                </div>
              </div>

          </div>
          </Link>
          </>
        )
      }
        )}
      </div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={comicsPerPage}
        totalItemsCount={1493}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default Comics;
