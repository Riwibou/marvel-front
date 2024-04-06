import axios from 'axios';
import { Link } from 'react-router-dom';

function ComicFocus({comic}) {

  return (
    <div>
    <h2>All Comics</h2>
      <ul>
          {comicFocus.map(comic => (
              <li key={comic.id}>
                  <Link to={`/comics/${comic._id}`}>{comic.title}</Link>
              </li>
          ))}
      </ul>
    </div>
  )
}

export default ComicFocus
