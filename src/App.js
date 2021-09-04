import './App.css';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'dayjs/locale/ko';
import { auth } from './constants/firebase';
import LayoutComponent from './components/layout/AdminLayoutComponent';
import { SoptRecruitingRouter } from './routers/SoptRecruitingRouter';
import { RoutingComponent } from './components/layout/RoutingComponent';
import { useDispatch, useSelector } from 'react-redux';
import store from 'src/redux/store';
import LoginComponent from './components/auth/LoginComponent';
import LoadingComponent from './components/shared/LoadingComponent';
import { getUserInfoInitial, logIn, logOut, setUser } from './redux/auth';
import Cookies from 'js-cookie';
import { Loader } from 'semantic-ui-react';
import UnauthorizedComponent from './components/auth/UnauthorizedComponent';
import HomeContainer from './containers/HomeContainer';
import { AdminRouter } from './routers/AdminRouter';

function App() {
  const { user: loggedInUser, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [authStateChecked, setAuthStateChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        dispatch(logOut());
        setAuthStateChecked(true);
      } else {
        dispatch(getUserInfoInitial({ idFirebase: user.uid }));
        dispatch(logIn());
        setAuthStateChecked(true);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {}, [window.location.pathname]);

  if (!authStateChecked) return <LoadingComponent />;

  // if (!isLoggedIn) return <LoginComponent />;

  // if (!loggedInUser.isAdmin) return <UnauthorizedComponent />;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" component={LoginComponent} />
        {SoptRecruitingRouter.map((route, i) => {
          return (
            <RoutingComponent
              key={i}
              exact
              path={route.path}
              component={route.component}
              extraProps={route.extraProps}
            />
          );
        })}
        {loggedInUser.isAdmin && (
          <LayoutComponent>
            {AdminRouter.map((route, i) => {
              return (
                <RoutingComponent
                  key={i}
                  exact
                  path={route.path}
                  component={route.component}
                  extraProps={route.extraProps}
                />
              );
            })}
          </LayoutComponent>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
