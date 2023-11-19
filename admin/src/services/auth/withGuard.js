import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withGuard = (Component, roles) => {
  const Wrapper = () => {
    const auth = useSelector((state) => state.auth);

    if (!auth.isLoggedIn) {
      return <Navigate to="/login" replace={true} />;
    }
    if (!auth.isActive) {
      return <Navigate to="/block" />;
    }
    if (roles.indexOf(auth.role) !== -1) {
      return Component;
    }
    return <Navigate to="/403" />;
  };

  return <Wrapper />;
};

export default withGuard;
