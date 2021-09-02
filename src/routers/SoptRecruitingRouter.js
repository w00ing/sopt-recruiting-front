import HomeContainer from 'src/containers/HomeContainer';
import ApplyMainContainer from 'src/containers/apply/ApplyMainContainer';
import LoginComponent from 'src/components/auth/LoginComponent';

export const SoptRecruitingRouter = [
  { path: '/', component: HomeContainer },
  { path: '/admin/login', component: LoginComponent },
  { path: '/recruiting/apply', component: ApplyMainContainer },
];