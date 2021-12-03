/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { setUser, unsetUser } from '../../store/slices/auth';
import Navbar from '../../components/Navbar';
import routes from '../../utils/routes';
import Home from '../Home/loadable';
import Chat from '../Chat/loadable';
import SignUp from '../SignUp/loadable';
import useMemoizedDispatch from '../../hooks/useMemoizedDispatch';
import NotFound from '../NotFound';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useMemoizedDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(unsetUser());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <React.Suspense fallback={<h1>Fallback</h1>}>
        <Switch>
          <Route path={routes.home.route} exact>
            {isAuthenticated ? <Redirect to={routes.chat.route} /> : <Home />}
          </Route>
          <Route path={routes.chat.route}>
            {isAuthenticated ? <Chat /> : <Redirect to={routes.home.route} />}
          </Route>
          <Route path={routes.signup.route}>
            {!isAuthenticated ? <SignUp /> : <Redirect to={routes.chat.route} />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
