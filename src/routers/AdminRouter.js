import AdminApplicantsContainer from 'src/containers/admin/applicants/AdminApplicantsContainer';
import AdminMainContainer from 'src/containers/admin/AdminMainContainer';
import AdminQuestionsContainer from 'src/containers/admin/questions/AdminQuestionsContainer';
import HomeContainer from 'src/containers/HomeContainer';
import RecruitingMainContainer from 'src/containers/recruiting/RecruitingMainContainer';
import AdminApplicantsDetailContainer from 'src/containers/admin/applicants/AdminApplicantsDetailContainer';

export const AdminRouter = [
  {
    path: '/admin/questions/ob',
    component: AdminQuestionsContainer,
    extraProps: { type: 'ob' },
  },
  {
    path: '/admin/questions/yb',
    component: AdminQuestionsContainer,
    extraProps: { type: 'yb' },
  },

  {
    path: '/admin/applicants/ob',
    component: AdminApplicantsContainer,
    extraProps: { type: 'ob' },
  },
  {
    path: '/admin/applicants/yb',
    component: AdminApplicantsContainer,
    extraProps: { type: 'yb' },
  },
  {
    path: '/admin/applicants/detail/:id',
    component: AdminApplicantsDetailContainer,
  },

  { path: '/admin', component: AdminMainContainer },
];
