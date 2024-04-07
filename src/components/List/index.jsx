import { useContext } from 'react';
import BookmarkContext from '../../context/bookmarkProvider';
import './list.css';

const List = () => {
  const {
    state: { bookmarks },
  } = useContext(BookmarkContext);

  function toggle() {
    const element = document.querySelector('.dropdown');
    if (element.style.display === 'none') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }

  return (
    <>
      <div className="cart">
        <img
          className="small-cart"
          src="star.svg"
          alt="shopping cart"
          onClick={toggle}
        />
        <div className="badge">{bookmarks.length}</div>
      </div>
    </>
  );
};

export default List;
