import { privateAPI, publicAPI } from './index';

class RecruitingAnswerAPI {
  static recruitingAnswerPOST(
    address,
    birthday,
    college,
    email,
    gender,
    group,
    knownPath,
    leaveAbsence,
    major,
    mostRecentSeason,
    name,
    part,
    phone,
    pic,
    season,
    univYear,
    willAppjam,
    nearestStation,
    answers,
  ) {
    const url = '/recruiting-answer';
    return publicAPI.post(url, {
      address,
      birthday,
      college,
      email,
      gender,
      group,
      knownPath,
      leaveAbsence,
      major,
      mostRecentSeason,
      name,
      part,
      phone,
      pic,
      season,
      univYear,
      willAppjam,
      nearestStation,
      answers,
    });
  }
}

export default RecruitingAnswerAPI;
