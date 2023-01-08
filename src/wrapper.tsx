import { useParams, useNavigate } from 'react-router-dom';

const withParams = (WrappedComponent: any) => (props: any) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};

const withRouter = (WrappedComponent: any) => (props: any) => {
  const navigate = useNavigate();
  return <WrappedComponent {...props} navigate={navigate} />;
};

export { withParams, withRouter };
