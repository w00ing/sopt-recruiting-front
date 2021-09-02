import AdminMainContainer from 'src/containers/admin/AdminMainContainer';
import AdminQuestionsMainContainer from 'src/containers/admin/AdminQuestionsContainer';
import HomeContainer from 'src/containers/HomeContainer';
import RecruitingMainContainer from 'src/containers/recruiting/RecruitingMainContainer';

export const AdminRouter = [
  { path: '/admin/questions/yb', component: AdminQuestionsMainContainer, extraProps: { type: 'yb' } },
  { path: '/admin/questions/ob', component: AdminQuestionsMainContainer, extraProps: { type: 'ob' } },
  { path: '/admin', component: AdminMainContainer },
];
