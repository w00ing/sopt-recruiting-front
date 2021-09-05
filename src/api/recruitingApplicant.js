import { privateAPI, publicAPI } from './index';

class RecruitingApplicantAPI {
  static recruitingApplicantGET(recruitingApplicantId) {
    const url = '/recruiting-applicant';
    return privateAPI.get(url, { recruitingApplicantId });
  }

  static recruitingApplicantApplyConfirmGET(season, group, name, phone) {
    const url = '/recruiting-applicant/apply-confirm';
    return publicAPI.get(url, { season, group, name, phone });
  }

  static recruitingApplicantListGET(season, group, offset, limit, nameSearchKeyword) {
    const url = '/recruiting-applicant/list';
    // const nameSearchKeyword = encodeURIComponent(keyword);
    // console.log('encoded', nameSearchKeyword);
    return privateAPI.get(url, { season, group, offset, limit, nameSearchKeyword });
  }
}

export default RecruitingApplicantAPI;
