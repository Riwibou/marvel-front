export const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BOOKMARK':
      return { ...state, bookmarks: [...state.bookmarks, { ...action.payload }] };
    case 'REMOVE_FROM_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (item) => item.bookmark.id !== action.payload.bookmark.id
        ),
      };
    default:
      return state;
  }
};
