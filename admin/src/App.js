import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { loginFailure, updateStatus } from 'redux/slices/auth';
import AuthAction from 'redux/thunks/authAction';
import routes from 'routes';
import AuthService from 'services/auth';
import User from 'services/models/user';
import './App.less';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, id } = useSelector((state) => state.auth);

  let element = useRoutes(routes);

  useEffect(() => {
    const unsubscribe = AuthService.auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(AuthAction.rehydrate());
      } else {
        dispatch(loginFailure());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const unsubscribe = User.watchUser(id, ({ active_status }) =>
        dispatch(updateStatus(active_status))
      );
      return unsubscribe;
    }
  }, [isLoggedIn, dispatch, id]);

  return <>{element}</>;
};

export default App;
