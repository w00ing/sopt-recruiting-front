import _ from 'lodash';
import React, { useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import logo from 'src/assets/images/logo_transparent.png';
import RecruitingQuestionAPI from 'src/api/recruitingQuestion';
import LoadingComponent from '../shared/LoadingComponent';
import 'semantic-ui-css/semantic.min.css';
import TextareaAutosize from 'react-textarea-autosize';
import RecruitingAnswerAPI from 'src/api/recruitingAnswer';
import { STATE_CHANGED, storage } from 'src/constants/firebase';
import { Loader } from 'semantic-ui-react';
import SpinnerComponent from '../shared/SpinnerComponent';
import dayjs from 'dayjs';
import { CURRENT_SEASON } from 'src/constants/season';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const isBetween = require('dayjs/plugin/isBetween');

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

const ApplyFormComponent = ({ type }) => {
  const group = type.toUpperCase();

  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);

  const [pic, setPic] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [address, setAddress] = useState('');
  const [nearestStation, setNearestStation] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [leaveAbsence, setLeaveAbsence] = useState(false);
  const [major, setMajor] = useState('');
  const [univYear, setUnivYear] = useState(1);
  const [mostRecentSeason, setMostRecentSeason] = useState(null);
  const [part, setPart] = useState('??????');
  const [knownPath, setKnownPath] = useState('SOPT ???????????? ?????????');

  const [canAttendSeminars, setCanAttendSeminars] = useState(false);
  const [agreedToTermsAndConditions, setAgreedToTermsAndConditions] = useState(false);

  const [commonQuestions, setCommonQuestions] = useState([]);
  const [partQuestions, setPartQuestions] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [selectedQuestionTypeId, setSelectedQuestionTypeId] = useState(2);
  const [willAppjam, setWillAppjam] = useState(false);

  const [commonAnswers, setCommonAnswers] = useState([]);
  const [partAnswers, setPartAnswers] = useState([]);

  const [applying, setApplying] = useState(false);

  const startDateString = group === 'YB' ? '2021-09-05 12:00' : '2021-08-23 11:00';
  const endDateString = group === 'YB' ? '2021-09-11 12:00' : '2021-08-26 18:00';

  useEffect(() => {
    load();
  }, [group]);

  const load = async () => {
    if (
      !dayjs()
        .tz('Asia/Seoul')
        .isBetween(dayjs.tz(startDateString, 'Asia/Seoul'), dayjs.tz(endDateString, 'Asia/Seoul'))
    ) {
      // console.log('//////');
      alert(`????????? ${group} ?????? ????????? ????????????.`);
      window.location.href = 'http://sopt.org/wp/';
      return;
    }
    const res = await RecruitingQuestionAPI.recruitingQuestionListGET(CURRENT_SEASON, group);
    if (!res.err) {
      setCommonQuestions(res.commonQuestions);
      setPartQuestions(res.partQuestions);
      setCommonAnswers(
        res.commonQuestions.questions.map((o) => ({
          recruitingQuestionId: o.id,
          answer: '',
        })),
      );
      setPartAnswers(
        res.partQuestions[0].questions.map((o) => ({
          recruitingQuestionId: o.id,
          answer: '',
        })),
      );
      setQuestionTypes(res.questionTypes);
      setLoading(false);
    }
  };

  let mostRecentSeasonOptions = _.range(1, 29);
  mostRecentSeasonOptions = mostRecentSeasonOptions.map((o) => ({
    value: o,
    text: `${o}???`,
  }));
  mostRecentSeasonOptions.push({ value: null, text: '??????' });
  mostRecentSeasonOptions.reverse();

  const validateForm = () => {
    if (!pic) {
      alert('????????? ??????????????????.');
      return false;
    }
    if (!name) {
      alert('????????? ??????????????????.');
      return false;
    }
    if (!birthday) {
      alert('??????????????? ??????????????????.');
      return false;
    }
    if (!(phone1 && phone2 && phone3)) {
      alert('??????????????? ??????????????????.');
      return false;
    }
    if (!address) {
      alert('???????????? ??????????????????.');
      return false;
    }
    if (!nearestStation) {
      alert('????????? ?????? ??????????????????.');
      return false;
    }
    if (!email) {
      alert('???????????? ??????????????????.');
      return false;
    }
    if (!college) {
      alert('?????? ????????? ??????????????????.');
      return false;
    }
    if (!major) {
      alert('?????? ????????? ??????????????????.');
      return false;
    }
    if (commonAnswers.filter((o) => o.answer.length === 0).length > 0) {
      alert('?????? ?????? ????????? ?????? ??????????????????.');
      return false;
    }
    if (partAnswers.filter((o) => o.answer.length === 0).length > 0) {
      alert('?????? ??? ?????? ????????? ?????? ??????????????????.');
      return false;
    }
    if (!canAttendSeminars) {
      alert('????????? ?????? ?????? ????????? ??????????????????.');
      return false;
    }
    if (!agreedToTermsAndConditions) {
      alert('???????????? ??????????????? ??????????????????.');
      return false;
    }
    return true;
  };

  // console.log(selectedQuestionTypeId);
  const handleApply = async () => {
    if (
      !dayjs()
        .tz('Asia/Seoul')
        .isBetween(dayjs.tz(startDateString, 'Asia/Seoul'), dayjs.tz(endDateString, 'Asia/Seoul'))
    ) {
      // console.log('//////');
      alert(`????????? ${group} ?????? ????????? ????????????.`);
      window.location.href = 'http://sopt.org/wp/';
      return;
    }
    const isFormValid = validateForm();
    if (!isFormValid) return;
    setApplying(true);

    const phone = phone1 + '-' + phone2 + '-' + phone3;
    const res = await RecruitingAnswerAPI.recruitingAnswerPOST(
      address,
      dayjs(birthday).format('YYYY.MM.DD'),
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
      CURRENT_SEASON,
      univYear,
      group === 'YB' ? false : willAppjam,
      nearestStation,

      [...commonAnswers, ...partAnswers],
    );
    if (!res.err) {
      // console.log(res);
      alert('?????????????????? ???????????????!');
      window.location.href = 'http://sopt.org/wp/';
    }
  };

  const handleImageUpload = async (e) => {
    if (e.target.files[0]) {
      setImageLoading(true);
      let file = e.target.files[0];
      const storageRef = storage.ref();
      const uploadTask = storageRef.child('recruiting/applicants/' + file.name).put(file);

      uploadTask.on(
        STATE_CHANGED,
        (snapshot) => {
          const progress = 1;
        },
        (error) => {
          throw error;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            const urlWithoutToken = url.split('&token=')[0];
            console.log('whiout', urlWithoutToken);
            setPic(urlWithoutToken);
            setImageLoading(false);
          });
        },
      );
      document.getElementById('file').value = null;
    }
  };

  // const handleImageChange =(e ) => {
  //   if(e.target.files[0]){
  //     setImage(e.target.files[0])
  //   }
  // }

  if (loading) return <LoadingComponent />;

  const commonQuestionsComponent = () => {
    return (
      <div className="my-12  ">
        {commonQuestions?.questions?.map((o) => {
          const charCount = _.find(commonAnswers, (ca) => ca.recruitingQuestionId === o.id).answer.length;
          return (
            <div key={o.id}>
              <div className="leading-relaxed mb-4 text-base whitespace-pre-wrap">
                {o.order}. {o.question}&nbsp;({o.charLimit}???)
              </div>
              <TextareaAutosize
                minRows={4}
                maxLength={o.charLimit}
                className="w-full leading-relaxed text-on-surface py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 text-base"
                onChange={({ target: { value } }) =>
                  setCommonAnswers((prev) =>
                    prev.map((p) => (p.recruitingQuestionId === o.id ? { ...p, answer: value } : p)),
                  )
                }
              />
              <div className="mb-16 mt-2 flex flex-row justify-end">
                ({charCount} / {o.charLimit})
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const partAnswersComponent = () => {
    return (
      <div className="my-8  ">
        {_.find(partQuestions, (o) => o.recruitingQuestionTypeId === selectedQuestionTypeId)?.questions?.map((o) => {
          const charCount = _.find(partAnswers, (ca) => ca.recruitingQuestionId === o.id).answer.length;
          return (
            <div key={o.id}>
              <div className="leading-relaxed mb-4 text-base whitespace-pre-wrap">
                {o.order}. {o.question}&nbsp;({o.charLimit}???)
              </div>
              <TextareaAutosize
                minRows={4}
                maxLength={o.charLimit}
                className="w-full leading-relaxed text-on-surface py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 text-base"
                onChange={({ target: { value } }) =>
                  setPartAnswers((prev) =>
                    prev.map((p) => (p.recruitingQuestionId === o.id ? { ...p, answer: value } : p)),
                  )
                }
              />
              <div className="mb-16 mt-2 flex flex-row justify-end">
                ({charCount} / {o.charLimit})
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex bg-surface-light items-center justify-center text-on-surface max">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <div className="grid bg-surface-light w-11/12 md:w-9/12 lg:w-1/2">
        <div className="flex flex-col justify-center px-4 my-4">
          <div className="flex justify-center">
            <a href="http://sopt.org/wp">
              <img alt="logo" src={logo} className="h-12 mb-8" />
            </a>
          </div>
          <div className="text-lg justify-center leading-loose mt-4 lg:text-center">
            <h1 className="text-2xl text-center lg:text-4xl my-2">????????? ?????? IT ?????? ????????? SOPT</h1>
            <h1 className="text-3xl text-center lg:text-5xl">{group} ?????? ?????????</h1>
            <hr className="my-8" />
            <ul className="list-disc mx-4">
              <li>????????? ?????? ?????? SOPT ??????????????? ??? ???????????? ?????????????????? ????????????.</li>
              <li className="text-primary-dark">
                ??? ??? ????????? ???????????? ????????? ???????????? ????????? ???????????? ??? ?????? ??????????????????.
              </li>
              <li className="text-primary-dark">
                9??? 25??? ????????? OT(????????? ??????)??? ?????? ??? ????????? ??????????????? ????????? ?????? ????????????.
              </li>
              {/* <li>
                ???????????? PC?????? ?????????????????? ??????????????????. Chrome??? ?????????
                ??????????????????.
              </li> */}
            </ul>
            <br />
            <div>[?????? ??????] 09.05(???) 12:00(??????) ??? 09.11(???) 12:00(??????)</div>
            <div>[?????? ??????] 09.16(???)</div>
            <div>[?????? ??????] 09.18(???) - 09.19(???) (????????? ?????? Zoom)</div>
            <div>[?????? ?????? ??????] 09.22(???)</div>
            <hr className="my-8" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="lg:w-1/2">
            <label className="uppercase md:text-lg text-base text-label text-light font-semibold mb-2">??????</label>
            <div className="flex flex-row items-center w-full mt-4">
              <label className="flex flex-col border-2 border-dashed w-52 h-52  hover:border-primary-default group items-center justify-center">
                {pic ? (
                  <div className="w-48 h-48">
                    <img alt="" src={pic} className="w-full h-full" />
                  </div>
                ) : imageLoading ? (
                  <SpinnerComponent />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      className="w-10 h-10 text-primary-default group-hover:text-primary-dark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="hidden px-4 lowercase text-center text-lg text-gray-400 group-hover:text-primary-dark pt-4 tracking-wider lg:block">
                      ??? ????????? ?????? ?????????????????? ???????????????.
                    </p>
                  </div>
                )}

                <input
                  id="file"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="px-4 ml-4 lowercase text-center text-lg text-gray-400 group-hover:text-primary-dark pt-4 tracking-wider lg:hidden">
                ???&nbsp;&nbsp;????????? ?????? ?????????????????? ???????????????.
              </p>
            </div>
          </div>

          <div className="flex flex-row mt-5 lg:flex-col lg:w-1/2">
            {/* ?????? */}
            <div className="grid grid-cols-1 w-1/2 mr-4 lg:w-full lg:mr-0 lg:mb-8">
              <label className="uppercase md:text-lg text-base text-label text-light font-semibold">??????</label>
              <input
                className="text-on-surface py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                placeholder="????????? ??????????????????."
              />
            </div>
            {/* ?????? */}
            <div className="grid grid-cols-1 w-1/2 lg:w-full">
              <label className="uppercase md:text-lg text-base text-label text-light font-semibold">??????</label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={({ target: { value } }) => setGender(value)}
                  className="w-full py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent appearance-none">
                  <option value="female">??????</option>
                  <option value="male">??????</option>
                </select>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ???????????? */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5  ">
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-lg text-base text-label text-light font-semibold">????????????</label>
            <DatePicker
              className="py-2 px-3 border-primary-default border rounded-lg w-full bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent focus:outline-none"
              selected={birthday}
              placeholderText="08/05/2021"
              onChange={(date) => setBirthday(date)}
            />
          </div>
          {/* ????????? */}
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-lg text-base text-label text-light font-semibold">?????????</label>
            <div className="flex flex-row items-center w-full text-center">
              <input
                value={phone1}
                onChange={({ target: { value } }) => setPhone1(value)}
                className="text-center w-1/4 py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
                placeholder="010"
              />
              &nbsp;-&nbsp;
              <input
                value={phone2}
                onChange={({ target: { value } }) => setPhone2(value)}
                className="text-center w-1/3 py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
                placeholder="0000"
              />
              &nbsp;-&nbsp;
              <input
                value={phone3}
                onChange={({ target: { value } }) => setPhone3(value)}
                className="text-center w-1/3 py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
                placeholder="0000"
              />
            </div>
          </div>
        </div>
        {/* ????????? */}
        <div className="grid grid-cols-1 mt-5  ">
          <label className="uppercase md:text-lg text-base text-label text-light font-semibold">?????????</label>
          <input
            value={address}
            onChange={({ target: { value } }) => setAddress(value)}
            className="py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
            type="text"
            placeholder="???) ??????????????? ????????? ?????????"
          />
        </div>
        {/* ???????????? */}
        <div className="grid grid-cols-1 mt-5  ">
          <label className="uppercase md:text-lg text-base text-label text-light font-semibold">????????????</label>
          <input
            value={nearestStation}
            onChange={({ target: { value } }) => setNearestStation(value)}
            className="py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
            type="text"
            placeholder="???) ??????????????????"
          />
        </div>
        {/* ????????? */}
        <div className="grid grid-cols-1 mt-5  ">
          <label className="uppercase md:text-lg text-base text-label text-light font-semibold">?????????</label>
          <input
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            className="py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
            type="text"
            placeholder="user_id@domain.com"
          />
        </div>

        {/* ?????? */}
        <div className="grid grid-cols-1 mt-5  ">
          <label className="uppercase md:text-lg text-base text-label text-light font-semibold">??????</label>
          <div className="flex flex-row items-center">
            <div className="w-2/3">
              <input
                value={college}
                onChange={({ target: { value } }) => setCollege(value)}
                className="w-full py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
                placeholder="?????? ????????? ???????????? ???????????????."
              />
            </div>
            <div className="w-1/3 mx-4 flex flex-row justify-around">
              <div className="flex flex-col md:flex-row">
                <input
                  value="notabsent"
                  checked={!leaveAbsence}
                  onChange={() => setLeaveAbsence(false)}
                  className="py-2 px-3 rounded-lg border border-primary-default focus:outline-none focus:border-transparent bg-red-200 text-primary-default mr-2"
                  type="radio"
                />
                <label className="uppercase md:text-lg text-base text-label text-light font-semibold">??????</label>
              </div>
              <div className="flex flex-col  md:flex-row">
                <input
                  value="absent"
                  checked={leaveAbsence}
                  onChange={() => setLeaveAbsence(true)}
                  className="py-2 px-3 rounded-lg border border-primary-default focus:outline-none  focus:border-transparent mr-2"
                  type="radio"
                />
                <label className="uppercase md:text-lg text-base text-label text-light font-semibold">??????</label>
              </div>
            </div>
          </div>
        </div>
        {/* ?????? */}
        <div className="flex flex-row mt-5  ">
          <div className="grid grid-cols-1 w-2/3">
            <label className="uppercase md:text-lg text-base text-label text-light font-semibold">??????</label>
            <input
              value={major}
              onChange={({ target: { value } }) => setMajor(value)}
              className="w-full text-on-surface py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
              type="text"
              placeholder="?????? ????????? ???????????? ???????????????."
            />
          </div>
          <div className="grid grid-cols-1 ml-4 w-1/3">
            <label className="uppercase md:text-lg text-base text-label text-light font-semibold">??????</label>
            <div className="relative">
              <select
                value={univYear}
                onChange={({ target: { value } }) => setUnivYear(value)}
                className="w-full py-2 px-3  rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent appearance-none">
                <option value={1}>1??????</option>
                <option value={2}>2??????</option>
                <option value={3}>3??????</option>
                <option value={4}>4??????</option>
                <option value={5}>5??????</option>
              </select>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        {/* ?????? ?????? ?????? ?????? */}
        <div className="grid grid-cols-1 mt-5  ">
          <label className="uppercase md:text-lg text-base text-label text-light font-semibold">
            ?????? ?????? ?????? ?????? (??? ????????? ????????? ??????.)
          </label>
          <div className="relative">
            <select
              value={mostRecentSeason}
              onChange={({ target: { value } }) => setMostRecentSeason(value)}
              className="w-full py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent appearance-none">
              {mostRecentSeasonOptions.map((o, i) => (
                <option key={i} value={o.value}>
                  {o.text}
                </option>
              ))}
            </select>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <hr className="my-28" />
        <div className="mb-8">
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div className="text-2xl md:text-3xl">?????? ??????</div>
          </div>
          <div>{commonQuestionsComponent()}</div>
        </div>
        <hr className="mb-28 mt-20" />
        <div className="flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <div className="text-2xl md:text-3xl">?????? ??? ??????</div>
        </div>
        <div className="flex flex-col my-5  ">
          <label className="uppercase mb-4">?????? ????????? ??????????????????.</label>
          <div className="relative">
            <select
              value={selectedQuestionTypeId}
              onChange={({ target: { value } }) => {
                setPartAnswers(
                  _.find(partQuestions, (pq) => pq.recruitingQuestionTypeId === Number(value))?.questions?.map((o) => ({
                    recruitingQuestionId: o.id,
                    answer: '',
                  })),
                );
                setSelectedQuestionTypeId(Number(value));
                setPart(_.find(questionTypes, (o) => o.id === Number(value)).typeKr);
              }}
              className="w-full py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent appearance-none">
              {questionTypes.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.typeKr}
                </option>
              ))}
            </select>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        <div>{partAnswersComponent()}</div>
        <hr className="my-8" />
        <div>
          <label className="uppercase md:text-lg text-base text-label text-light font-semibold">
            ???????????? ?????? ??? ??????
          </label>
          <div className="relative">
            <select
              value={mostRecentSeason}
              onChange={({ target: { value } }) => setKnownPath(value)}
              className="w-full py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent appearance-none">
              {knownPaths.map((o, i) => (
                <option key={i} value={o.value}>
                  {o.value}
                </option>
              ))}
            </select>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <div className="text-2xl mt-8">SOPT??? ?????? ??? ???????????? ?????? ???????????? ???????????????.</div>
          <div className="flex flex-row items-center mt-4">
            <input
              value="notabsent"
              checked={canAttendSeminars}
              onChange={() => setCanAttendSeminars((prev) => !prev)}
              className="py-2 px-3 rounded-lg border border-primary-default focus:outline-none focus:border-transparent bg-red-200 text-primary-default text-2xl mr-4"
              type="checkbox"
            />
            <label className="uppercase text-label text-light font-semibold text-2xl">?????? ???????????????.</label>
          </div>
        </div>

        <div>
          <div className="text-2xl mt-8 mb-4">???????????? ?????? ??? ?????? ??????</div>
          <div className="text-base leading-relaxed px-4">
            <div>
              SOPT??? ????????? ???????????? ??????????????? ?????? ??? ????????????, ????????? ??????????????? ???????????? ??????????????? ????????? ????????????.
            </div>
            <div>???????????? ?????? ??? ????????? ?????? ??????</div>
            <div>
              1. ?????? : ????????? ?????? ??????, ???????????? ??????, ??????????????? ??????, ???????????? ??????, ?????? ??????????????? ?????????
              ????????????, ???????????? ??????, ?????? ??? ???????????? ??????
            </div>
            <div>2. ?????? : ???????????????, ??????, ????????????, ???????????????, ??????, ??????, ????????????, ??????</div>
            <div>3. ???????????? : ?????? ?????? ??? ?????? ????????? ??????</div>
            <div>
              ??? ???????????? ????????? ?????? ????????? ????????? ????????? ?????????, ?????? ?????? ????????? ????????? ????????? ????????? ??? ????????????.
            </div>
          </div>
          <div className="flex flex-row items-center mt-4">
            <input
              value="notabsent"
              checked={agreedToTermsAndConditions}
              onChange={() => setAgreedToTermsAndConditions((prev) => !prev)}
              className="py-2 px-3 rounded-lg border border-primary-default focus:outline-none focus:border-transparent bg-red-200 text-primary-default text-2xl mr-4"
              type="checkbox"
            />
            <label className="uppercase text-label text-light font-semibold text-2xl">????????????</label>
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 pb-5 mb-40">
          {!applying ? (
            <button
              onClick={handleApply}
              type="button"
              className="w-full mt-2  mx-4 bg-primary-default hover:bg-primary-dark rounded-lg shadow-xl text-white h-16 py-2 text-2xl font-semibold">
              ????????????
            </button>
          ) : (
            <SpinnerComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyFormComponent;

const knownPaths = [
  {
    value: 'SOPT ???????????? ?????????',
  },
  {
    value: 'SOPT ???????????????',
  },
  {
    value: 'SOPT ?????????',
  },
  {
    value: '?????????',
  },
  {
    value: 'SOPT ????????? ?????????',
  },
  {
    value: '?????? ??????',
  },
  {
    value: '????????? ?????????(????????? ???????????? ???)',
  },
  {
    value: '???????????? ?????????(???????????? ???)',
  },
  {
    value: '??????',
  },
];
