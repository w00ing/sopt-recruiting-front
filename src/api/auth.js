import { publicAPI } from './index';

class AuthAPI {
  static authLoginEmailPOST(email, idFirebase) {
    const url = '/auth/login/email';
    return publicAPI.post(url, { email, idFirebase });
  }

  static authUserEssentialGET(idFirebase) {
    const url = '/auth/user/essential';
    return publicAPI.get(url, { idFirebase });
  }
}

export default AuthAPI;
