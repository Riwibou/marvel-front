import { useContext } from 'react';
import BookmarkContext from '../../context/bookmarkProvider';
import './drop.css';

const Dropdown = () => {
  const {
    state: { bookmarks },
    dispatch,
  } = useContext(BookmarkContext);

  if (bookmarks.length > 0) {
    return (
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <p className="cart-title">Bookmarks</p>
        </div>

        <ul className="shopping-cart-items">
          {bookmarks.map((item) => (
            <li key={item.id}>
              <div className="first">
                <img
                  className="thumb-shop"
                  src={`${item.thumbnail}`}
                  alt="bookmark"
                />
              </div>
              <div className="second">
                <p className="item-name">{item.title}</p>
              </div>
              <div className="third">
                <button
                  className="remove"
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE_FROM_BOOKMARK',
                      payload: item,
                    })
                  }
                >
                  <img src="icon-delete.svg" alt="delete" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <p className="cart-title">Bookmarks</p>
        </div>
        <div className="shopping-cart-body big">
          <p className="p-big">Your Bookmarks list is empty.</p>
        </div>
      </div>
    );
  }
};

export default Dropdown;
