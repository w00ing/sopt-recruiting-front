import React, { useState, useEffect } from 'react';
import { Form, Grid, Image, Loader, Message, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { auth } from 'src/constants/firebase';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'src/assets/images/logo_transparent.png';
import Cookies from 'js-cookie';
import { getUserInfoInitial, logIn, logOut, setUser } from 'src/redux/auth';
import AuthAPI from 'src/api/auth';
import LoadingComponent from '../shared/LoadingComponent';
import RecruitingAdminAPI from 'src/api/recruitingAdmin';

const LoginComponent = (props) => {
  const { user: loggedInUser, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        const res = await AuthAPI.authLoginEmailPOST(email, user.uid);
        if (!res.err) {
          console.log(res);
          dispatch(setUser(res.user));
          dispatch(logIn());
          Cookies.set('accesstoken', res.accesstoken, { path: '/', expires: 86400 * 30 * 2 });
          Cookies.set('idfirebase', res.user.idFirebase, { path: '/', expires: 86400 * 30 * 2 });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log('Failed to login.\n' + err.message);
        setLoading(false);
      });
  };

  if (loading) return <Loader active />;

  if (isLoggedIn) {
    let { from } = props.location.state || { from: { pathname: '/admin' } };
    return <Redirect to={from} />;
  }
  return (
    <div className="flex flex-col bg-surface-light text-on-surface h-screen">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-black px-6 py-8 rounded-xl shadow-md  w-full ">
            <div className="flex flex-row justify-center items-center ">
              <img src={logo} alt="logo" className="h-12 mb-8" />
            </div>

            <input
              type="text"
              className="block border border-gray-300 w-full p-3 rounded mb-4 text-black"
              name="email"
              placeholder="Email"
              onChange={({ target: { value } }) => setEmail(value)}
            />

            <input
              type="password"
              className="block border border-gray-300 w-full p-3 rounded mb-4 text-black"
              name="password"
              placeholder="Password"
              onChange={({ target: { value } }) => setPassword(value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-surface-light text-white hover:bg-dark-purple focus:outline-none my-1"
              onClick={(e) => handleLogin(e)}>
              Log In
            </button>
          </div>
          {/* <div className="mt-6">
              Don&apos;t have an account yet?{' '}
              <Link href="/auth/signup">
                <a className="no-underline border-b border-blue text-dark-purple">Sign up</a>
              </Link>
            </div> */}
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
