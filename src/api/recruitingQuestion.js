import { privateAPI, publicAPI } from './index';

class RecruitingQuestionAPI {
  static recruitingQuestionPOST(season, group, recruitingQuestionTypeId, order) {
    const url = '/recruiting-question';
    return privateAPI.post(url, { season, group, recruitingQuestionTypeId, order });
  }

  static recruitingQuestionPUT(recruitingQuestionId, question, charLimit) {
    const url = '/recruiting-question';
    return privateAPI.put(url, { recruitingQuestionId, question, charLimit });
  }

  static recruitingQuestionDELETE(recruitingQuestionId) {
    const url = '/recruiting-question';
    return privateAPI.delete(url, { recruitingQuestionId });
  }

  static recruitingQuestionListGET(season, group) {
    const url = '/recruiting-question/list';
    return publicAPI.get(url, { season, group });
  }
}

export default RecruitingQuestionAPI;
