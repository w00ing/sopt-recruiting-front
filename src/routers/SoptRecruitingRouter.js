import HomeContainer from 'src/containers/HomeContainer';
import ApplyMainContainer from 'src/containers/apply/ApplyMainContainer';
import LoginComponent from 'src/components/auth/LoginComponent';
import ApplyConfirmContainer from 'src/containers/apply/ApplyConfirmContainer';

export const SoptRecruitingRouter = [
  { path: '/', component: HomeContainer },
  { path: '/admin/login', component: LoginComponent },
  {
    path: '/recruiting/apply/ob',
    component: ApplyMainContainer,
    extraProps: { type: 'ob' },
  },
  {
    path: '/recruiting/apply/yb',
    component: ApplyMainContainer,
    extraProps: { type: 'yb' },
  },
  {
    path: '/recruiting/apply/confirm',
    component: ApplyConfirmContainer,
    // extraProps: { type: 'yb' },
  },
];
