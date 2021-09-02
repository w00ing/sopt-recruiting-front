import _ from 'lodash';
import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import logo from 'src/assets/images/logo_transparent.png';

const ApplyFormComponent = (props) => {
  const { handleSubmit, reset } = props;
  const { search } = useLocation();
  const { type } = queryString.parse(search);

  const { user } = useSelector((state) => state.auth);
  console.log('user', user);

  const group = type.toUpperCase();

  const [birthday, setBirthday] = useState(new Date());
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [address, setAddress] = useState('');
  const [nearestStation, setNearestStation] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [leaveAbsence, setLeaveAbsence] = useState(false);
  const [major, setMajor] = useState('');
  const [univYear, setUnivYear] = useState(1);
  const [mostRecentSeason, setMostRecentSeason] = useState('');

  const handleSelectGender = ({ target: { value } }) => {
    console.log(value);
    setGender(value);
  };

  // console.log(phone1, phone2, phone3);
  console.log(mostRecentSeason);
  let mostRecentSeasonOptions = _.range(1, 29);
  mostRecentSeasonOptions = mostRecentSeasonOptions.map((o) => ({ value: o, text: `${o}기` }));
  mostRecentSeasonOptions.push({ value: '', text: '없음' });
  mostRecentSeasonOptions.reverse();

  const handleApply = async () => {
    // const res = await
  };

  return (
    <div className="flex bg-surface-light items-center justify-center text-on-surface">
      <div className="grid bg-surface-light w-11/12 md:w-9/12 lg:w-1/2">
        <div className="flex flex-col justify-center px-4 my-4">
          <div className="flex justify-center">
            <img alt="logo" src={logo} className="h-12 mb-8" />
          </div>
          <div className="text-sm justify-center leading-loose mt-4 lg:text-center">
            <h1 className="text-2xl text-center lg:text-4xl my-2">대학생 연합 IT 창업 동아리 SOPT</h1>
            <h1 className="text-3xl text-center lg:text-5xl">{group} 지원 신청서</h1>
            <hr className="my-4" />
            <ul className="list-disc px-4">
              <li>지원서 작성 전에 SOPT 커리큘럼을 꼭 숙지하고 지원해주시기 바랍니다.</li>
              <li className="text-primary-dark">
                한 번 제출된 지원서는 수정이 불가하니 신중히 작성하신 후 제출 부탁드립니다.
              </li>
              <li className="text-primary-dark">
                9월 25일 토요일 OT(온라인 예정)에 불참 시 지원이 불가하오니 자세히 확인 바랍니다.
              </li>
              <li>지원서는 PC에서 작성하는것을 권장드립니다. Chrome에 최적화 되어있습니다.</li>
            </ul>
            <br />
            <div>[지원 기간] 09.05(일) 12:00(정오) – 09.11(토) 12:00(정오)</div>
            <div>[서류 발표] 09.16(목)</div>
            <div>[면접 평가] 09.18(토) - 09.19(일) (온라인 면접 Zoom)</div>
            <div>[최종 합격 발표] 09.22(수)</div>
            <hr className="my-4" />
          </div>
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-label text-light font-semibold mb-1">사진</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col border-2 border-dashed w-full h-32  hover:border-primary-default group">
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
                <p className="lowercase text-sm text-gray-400 group-hover:text-primary-dark pt-4 tracking-wider">
                  ※ 사진은 면접 참고용으로만 이용됩니다.
                </p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-5 mx-7">
          {/* 이름 */}
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">이름</label>
            <input
              className="text-on-surface py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              placeholder="이름을 입력해주세요."
            />
          </div>
          {/* 성별 */}
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">성별</label>
            <div className="relative">
              <select
                value={gender}
                onChange={({ target: { value } }) => setGender(value)}
                className="w-full py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent appearance-none">
                <option value="female">여자</option>
                <option value="male">남자</option>
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
        {/* 생년월일 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">생년월일</label>
            <DatePicker
              className="py-2 px-3 border-primary-default border rounded-lg w-full bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent focus:outline-none"
              selected={birthday}
              onChange={(date) => setBirthday(date)}
            />
          </div>
          {/* 연락처 */}
          <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">연락처</label>
            <div className="flex flex-row items-center w-full text-center">
              <input
                value={phone1}
                onChange={({ target: { value } }) => setPhone1(value)}
                className="text-center w-1/4 py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
              />
              &nbsp;-&nbsp;
              <input
                value={phone2}
                onChange={({ target: { value } }) => setPhone2(value)}
                className="text-center w-1/3 py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
              />
              &nbsp;-&nbsp;
              <input
                value={phone3}
                onChange={({ target: { value } }) => setPhone3(value)}
                className="text-center w-1/3 py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
              />
            </div>
          </div>
        </div>
        {/* 거주지 */}
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">거주지</label>
          <input
            value={address}
            onChange={({ target: { value } }) => setAddress(value)}
            className="py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
            type="text"
            placeholder="예) 서울특별시 관악구 신림동"
          />
        </div>
        {/* 지하철역 */}
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">지하철역</label>
          <input
            value={nearestStation}
            onChange={({ target: { value } }) => setNearestStation(value)}
            className="py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
            type="text"
            placeholder="예) 성신여대입구"
          />
        </div>
        {/* 이메일 */}
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">이메일</label>
          <input
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            className="py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
            type="text"
            placeholder="user_id@domain.com"
          />
        </div>

        {/* 학교 */}
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">학교</label>
          <div className="flex flex-row items-center">
            <div className="w-2/3">
              <input
                value={college}
                onChange={({ target: { value } }) => setCollege(value)}
                className="w-full py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
                type="text"
                placeholder="학교 전체 이름을 정확하게 적어주세요."
              />
            </div>

            <div className="mx-4">
              <input
                value="notabsent"
                checked={!leaveAbsence}
                onChange={() => setLeaveAbsence(false)}
                className="py-2 px-3 rounded-lg border border-primary-default focus:outline-none focus:border-transparent bg-red-200 text-primary-default mr-2"
                type="radio"
              />
              <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">재학</label>
            </div>
            <div>
              <input
                value="absent"
                checked={leaveAbsence}
                onChange={() => setLeaveAbsence(true)}
                className="py-2 px-3 rounded-lg border border-primary-default focus:outline-none  focus:border-transparent mr-2"
                type="radio"
              />
              <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">휴학</label>
            </div>
          </div>
        </div>
        {/* 학과 */}
        <div className="flex flex-row mt-5 mx-7">
          <div className="grid grid-cols-1 w-2/3">
            <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">학과</label>
            <input
              value={major}
              onChange={({ target: { value } }) => setMajor(value)}
              className="w-full text-on-surface py-2 px-3 rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent"
              type="text"
              placeholder="학과 이름을 정확하게 적어주세요."
            />
          </div>
          <div className="grid grid-cols-1 ml-4 w-1/3">
            <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">학년</label>
            <div className="relative">
              <select
                value={univYear}
                onChange={({ target: { value } }) => setUnivYear(value)}
                className="w-full py-2 px-3  rounded-lg border border-primary-default mt-1 focus:outline-none bg-surface-light focus:ring-1 focus:ring-primary-dark focus:border-transparent appearance-none">
                <option value={1}>1학년</option>
                <option value={2}>2학년</option>
                <option value={3}>3학년</option>
                <option value={4}>4학년</option>
                <option value={5}>5학년</option>
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
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-label text-light font-semibold">
            이전 기수 활동 여부 (※ 제명된 경우도 포함.)
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
        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <button
            onClick={handleApply}
            type="button"
            className="w-full my-2 mx-4 bg-primary-default hover:bg-primary-dark rounded-lg shadow-xl font-medium text-white px-4 py-2">
            지원하기
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex flex-row mx-4">
          <div>공통 질문</div>
        </div>
      </div>
    </div>
  );
};

export default ApplyFormComponent;
