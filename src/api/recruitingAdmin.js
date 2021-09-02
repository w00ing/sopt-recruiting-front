import { publicAPI } from './index';

class RecruitingAdminAPI {
  static recruitingAdminGET(idFirebase) {
    const url = '/recruiting-admin';
    return publicAPI.get(url, { idFirebase });
  }
}

export default RecruitingAdminAPI;
