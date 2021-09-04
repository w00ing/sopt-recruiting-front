import { privateAPI, publicAPI } from './index';

class RecruitingApplicantAPI {
  static recruitingApplicantGET(recruitingApplicantId) {
    const url = '/recruiting-applicant';
    return privateAPI.get(url, { recruitingApplicantId });
  }

  static recruitingApplicantListGET(season, group, offset, limit) {
    const url = '/recruiting-applicant/list';
    return privateAPI.get(url, { season, group, offset, limit });
  }
}

export default RecruitingApplicantAPI;
