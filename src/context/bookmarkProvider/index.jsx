/* eslint-disable react/prop-types */
import { useReducer, createContext } from 'react';
import { bookmarkReducer } from '../Reducers';


export const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, {
    bookmarks: [],
  });

  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export { BookmarkProvider };

export default BookmarkContext;
