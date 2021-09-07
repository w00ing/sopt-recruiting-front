import { privateAPI, publicAPI } from './index';

class RecruitingApplicantAPI {
  static recruitingApplicantGET(recruitingApplicantId) {
    const url = '/recruiting-applicant';
    return privateAPI.get(url, { recruitingApplicantId });
  }

  static recruitingApplicantPartsGET() {
    const url = '/recruiting-applicant/parts';
    return privateAPI.get(url, {});
  }

  static recruitingApplicantApplyConfirmGET(season, group, name, phone) {
    const url = '/recruiting-applicant/apply-confirm';
    return publicAPI.get(url, { season, group, name, phone });
  }

  static recruitingApplicantListGET(season, group, offset, limit, nameSearchKeyword, part) {
    const url = '/recruiting-applicant/list';
    return privateAPI.get(url, { season, group, offset, limit, nameSearchKeyword, part });
  }
}

export default RecruitingApplicantAPI;
