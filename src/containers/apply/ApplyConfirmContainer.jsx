import React, { useState, useEffect } from 'react';
import { Form, Grid, Image, Loader, Message, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { auth } from 'src/constants/firebase';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'src/assets/images/logo_transparent.png';
import Cookies from 'js-cookie';
import { getUserInfoInitial, logIn, logOut, setUser } from 'src/redux/auth';
import AuthAPI from 'src/api/auth';
import LoadingComponent from '../../components/shared/LoadingComponent';
import RecruitingAdminAPI from 'src/api/recruitingAdmin';
import RecruitingApplicantAPI from 'src/api/recruitingApplicant';
import { CURRENT_SEASON } from 'src/constants/season';

const ApplyConfirmContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState('YB');
  const [name, setName] = useState('');
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  useEffect(() => {}, []);

  const handleApplyConfirm = async (e) => {
    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!(phone1 && phone2 && phone3)) {
      alert('핸드폰 번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    const phone = `${phone1}-${phone2}-${phone3}`;
    const res = await RecruitingApplicantAPI.recruitingApplicantApplyConfirmGET(CURRENT_SEASON, group, name, phone);
    if (!res.err) {
      alert(`${name}님의 지원서가 확인되었습니다.`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col bg-surface-light text-on-surface h-screen">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-black px-6 py-8 rounded-xl shadow-md  w-full ">
            <div className="flex flex-row justify-center items-center ">
              <img src={logo} alt="logo" className="h-12 mb-8" />
            </div>

            <div className="flex flex-row justify-around mb-4 text-xl">
              <div>
                <label className="mr-4">YB</label>
                <input
                  type="checkbox"
                  name="YB"
                  checked={group === 'YB'}
                  value="YB"
                  onChange={({ target: { value } }) => setGroup(value)}
                />
              </div>
              <div>
                <label className="mr-4">OB</label>
                <input
                  type="checkbox"
                  name="OB"
                  checked={group === 'OB'}
                  value="OB"
                  onChange={({ target: { value } }) => setGroup(value)}
                />
              </div>
            </div>

            <input
              type="text"
              className="block border border-gray-300 w-full p-3 rounded mb-4 text-black"
              name="name"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={({ target: { value } }) => setName(value)}
            />

            <div className="flex flex-row items-center mb-4">
              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded text-black text-center"
                name="phone"
                placeholder="010"
                value={phone1}
                onChange={({ target: { value } }) => setPhone1(value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyConfirm(e)}
              />
              &nbsp;-&nbsp;
              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded text-black text-center"
                name="phone"
                placeholder="0000"
                value={phone2}
                onChange={({ target: { value } }) => setPhone2(value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyConfirm(e)}
              />
              &nbsp;-&nbsp;
              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded text-black text-center"
                name="phone"
                placeholder="0000"
                value={phone3}
                onChange={({ target: { value } }) => setPhone3(value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyConfirm(e)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-surface-light text-white hover:bg-dark-purple focus:outline-none my-1"
              onClick={(e) => handleApplyConfirm(e)}>
              지원 확인하기
            </button>
          </div>
          {/* <div className="mt-6">
              Don&apos;t have an account yet?{' '}
              <Link href="/auth/signup">
                <a className="no-underline border-b border-blue text-dark-purple">Sign up</a>
              </Link>
            </div> */}
        </div>
      )}
    </div>
  );
};

export default ApplyConfirmContainer;
