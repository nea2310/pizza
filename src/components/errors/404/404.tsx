import { Link } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';

export default function () {
  return (
    <>
      <h1>Error 404, page not found</h1>
      <hr />
      <div className="alert alert-warning">
        <p>
          <Link to={routesMap.home}>Go to home page</Link>
        </p>
      </div>
    </>
  );
}