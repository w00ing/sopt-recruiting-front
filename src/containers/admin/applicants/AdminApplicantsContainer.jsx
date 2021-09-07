import React, { useEffect, useState, useRef } from 'react';
import {
  Input,
  Container,
  Card,
  Segment,
  Image,
  Dimmer,
  Grid,
  Button,
  Modal,
  Loader,
  Divider,
  Form,
  Pagination,
  Item,
  Comment,
  TeotArea,
  Label,
  Dropdown,
  Checkbox,
  Table,
  Search,
  Header,
  Icon,
} from 'semantic-ui-react';

import _ from 'lodash';
import numeral from 'numeral';
import dayjs from 'dayjs';

import { useLocation, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import RecruitingAnswerAPI from 'src/api/recruitingAnswer';
import RecruitingApplicantAPI from 'src/api/recruitingApplicant';
import { CURRENT_SEASON } from 'src/constants/season';
import { firestore, storage } from 'src/constants/firebase';

const AdminApplicantsContainer = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [perPage, setPerPage] = useState(50);
  const [nameSearchKeyword, setNameSearchKeyword] = useState('');
  const [dontReadOptions, setDontReadOptions] = useState([]);
  const [alreadyReadOptions, setAlreadyReadOptions] = useState([]);

  const [partOptions, setPartOptions] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

  const [readData, setReadData] = useState([]);

  const [applicants, setApplicants] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const history = useHistory();

  const group = type.toUpperCase();

  console.log(nameSearchKeyword);

  useEffect(() => {
    loadParts();
  }, []);

  useEffect(() => {
    load();
  }, [perPage, activePage, selectedPart]);
  // console.log(applicants);

  const loadParts = async () => {
    const res = await RecruitingApplicantAPI.recruitingApplicantPartsGET();
    if (!res.err) {
      setPartOptions(res.parts?.map((o) => ({ key: o.id, text: o.typeKr, value: o.typeKr })));
    }
  };

  const load = async () => {
    const res = await RecruitingApplicantAPI.recruitingApplicantListGET(
      CURRENT_SEASON,
      group,
      perPage * (activePage - 1),
      perPage,
      nameSearchKeyword,
      selectedPart,
    );
    if (!res.err) {
      const readData = await firestore
        .collection('applicants')
        .get()
        .then((snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            if (doc.exists) {
              data.push(Object.assign(doc.data(), { id: doc.id }));
            }
          });

          return data;
        })
        .catch((e) => {
          console.log(e);
          return { err: true };
        });

      if (!readData.err) {
        setReadData(readData);
        setApplicants(res.applicants);
        setTotalPage(res.meta?.totalPage || 1);
        setDontReadOptions(
          res.adminRoles?.map((o) => ({
            key: o.id,
            text: o.role,
            value: o.id,
            color: o.primaryColor,
            role: o.role,
            content: (
              <Button
                className="px-2 py-3 rounded flex flex-row"
                color={o.primaryColor}
                onClick={() => console.log('click')}
                style={{ fontWeight: 'normal' }}>
                읽마 by {o.role}
              </Button>
            ),
          })),
        );
        setAlreadyReadOptions(
          res.adminRoles?.map((o) => ({
            key: o.id,
            text: o.role,
            value: o.id,
            color: o.primaryColor,
            role: o.role,
            content: (
              <Button
                className="px-2 py-3 rounded flex flex-row"
                color={o.primaryColor}
                onClick={() => console.log('click')}
                style={{ fontWeight: 'normal' }}>
                {o.role}
              </Button>
            ),
          })),
        );
        addListener();
      }

      setLoading(false);
    }
  };

  const addListener = () => {
    firestore.collection('applicants').onSnapshot({ includeMetadataChanges: false }, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change?.doc?.exists && (change.type === 'modified' || change.type === 'added')) {
          const newData = Object.assign(change.doc.data(), { id: change.doc.id });
          console.log('readData', readData);
          setReadData((prev) =>
            prev.map((p) =>
              Number(p.id) === Number(newData.id)
                ? { ...p, dontRead: newData.dontRead, alreadyRead: newData.alreadyRead }
                : p,
            ),
          );
        }
      });
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleSearch = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    await load();
  };

  // const handleSelectPart = () => {
  //   setPart
  // }

  const handleGoToApplicantDetailPage = (id) => {
    history.push(`/admin/applicants/detail/${id}`);
  };

  const handleDontReadChange = async (value, recruitingApplicantId) => {
    await firestore.collection('applicants').doc(recruitingApplicantId.toString()).set({ dontRead: value });
  };

  const handleAlreadyReadChange = async (value, recruitingApplicantId) => {
    await firestore.collection('applicants').doc(recruitingApplicantId.toString()).set({ alreadyRead: value });
  };

  const renderDontReadLabel = (label) => ({
    color: label.color,
    content: `읽마 by ${label.role}`,
  });

  const renderAlreadyReadLabel = (label) => ({
    color: label.color,
    content: label.role,
  });

  return (
    <div>
      <Container as={Segment} vertical fluid>
        <Container style={{ marginBottom: 12 }}>
          <Button
            icon="refresh"
            content="새로고침"
            onClick={handleRefresh}
            loading={refreshing}
            disabled={refreshing}
          />
          <Dropdown
            selection
            value={perPage}
            onChange={(e, { value }) => {
              setPerPage(value);
              setActivePage(1);
            }}
            options={[
              { text: '20개씩 보기', value: 20, key: 1 },
              { text: '50개씩 보기', value: 50, key: 2 },
              { text: '100개씩 보기', value: 100, key: 3 },
              { text: '200개씩 보기', value: 200, key: 4 },
              { text: '500개씩 보기', value: 500, key: 5 },
            ]}
            style={{ marginRight: 24 }}
          />
          <Button icon="search" content="이름 검색" onClick={handleSearch} loading={refreshing} disabled={refreshing} />
          <Input
            onChange={(e, { value }) => setNameSearchKeyword(value)}
            placeholder="이름을 입력해주세요."
            value={nameSearchKeyword}
            style={{ marginRight: 24 }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <Dropdown
            clearable
            selection
            placeholder="파트로 필터 가능합니다."
            value={selectedPart}
            onChange={(e, { value }) => {
              setSelectedPart(value);
            }}
            options={partOptions}
          />
        </Container>
        <Container fluid>
          {loading ? (
            <div className="items-center justify-center h-screen">
              <Loader active />
            </div>
          ) : (
            <Table celled striped size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>id</Table.HeaderCell>
                  <Table.HeaderCell>이름</Table.HeaderCell>
                  <Table.HeaderCell>지원파트</Table.HeaderCell>
                  <Table.HeaderCell>읽어야할까?</Table.HeaderCell>
                  <Table.HeaderCell>읽은사람</Table.HeaderCell>
                  <Table.HeaderCell>email</Table.HeaderCell>
                  <Table.HeaderCell>생년월일</Table.HeaderCell>
                  <Table.HeaderCell>최근 기수</Table.HeaderCell>
                  <Table.HeaderCell>전화번호</Table.HeaderCell>
                  <Table.HeaderCell>학교</Table.HeaderCell>
                  <Table.HeaderCell>학과</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {applicants?.map((applicant, index) => {
                  return (
                    <Table.Row
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleGoToApplicantDetailPage(applicant.id)}
                      key={index}>
                      <Table.Cell>{applicant.id}</Table.Cell>
                      <Table.Cell>{applicant.name}</Table.Cell>
                      <Table.Cell>{applicant.part}</Table.Cell>
                      <Table.Cell width="2" style={{ padding: 0 }} onClick={(e) => e.stopPropagation()}>
                        <Dropdown
                          icon="none"
                          fluid
                          placeholder="직위(?) 검색 가능"
                          renderLabel={renderDontReadLabel}
                          selection
                          search
                          value={_.find(readData, (o) => Number(o.id) === applicant.id)?.dontRead}
                          multiple
                          onChange={(e, { value }) => {
                            handleDontReadChange(value, applicant.id);
                            console.log(value);
                            // setApplicants(prev => {
                            //   prev.map(p => p.)
                            // });
                            // setActivePage(1);
                          }}
                          scrolling
                          style={{
                            borderRadius: 0,
                            width: '100%',
                            padding: 5,
                            borderWidth: 0,
                            backgroundColor: 'rgba(0,0,0,0)',
                          }}
                          options={dontReadOptions}
                        />
                      </Table.Cell>
                      <Table.Cell width="2" style={{ padding: 0 }} onClick={(e) => e.stopPropagation()}>
                        <Dropdown
                          icon="none"
                          fluid
                          placeholder="직위(?) 검색 가능"
                          renderLabel={renderAlreadyReadLabel}
                          selection
                          search
                          value={_.find(readData, (o) => Number(o.id) === applicant.id)?.alreadyRead}
                          multiple
                          onChange={(e, { value }) => {
                            handleAlreadyReadChange(value, applicant.id);
                            console.log(value);
                            // setApplicants(prev => {
                            //   prev.map(p => p.)
                            // });
                            // setActivePage(1);
                          }}
                          scrolling
                          style={{
                            borderRadius: 0,
                            width: '100%',
                            padding: 5,
                            borderWidth: 0,
                            backgroundColor: 'rgba(0,0,0,0)',
                          }}
                          options={alreadyReadOptions}
                        />
                      </Table.Cell>

                      <Table.Cell>{applicant.email}</Table.Cell>
                      <Table.Cell>{applicant.birthday}</Table.Cell>
                      <Table.Cell>{applicant.mostRecentSeason || '없음'}</Table.Cell>
                      <Table.Cell>{applicant.phone}</Table.Cell>
                      <Table.Cell>{applicant.college}</Table.Cell>
                      <Table.Cell>{applicant.major}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan={10} textAlign="center">
                    <Pagination
                      activePage={activePage}
                      onPageChange={(e, { activePage }) => setActivePage(activePage)}
                      totalPages={totalPage}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default AdminApplicantsContainer;

// <Button.Group>
//                             {/* <Button color={o.primaryColor} onClick={(e) => e.stopPropagation()} size="mini">
//                               읽마 by {o.role}
//                             </Button> */}
//                             <Dropdown
//                               inline
//                               // as={Button}
//                               icon="globe"
//                               renderLabel={renderDontReadLabel}
//                               // color="red"
//                               selection
//                               // value={perPage}
//                               multiple
//                               onChange={(e, { value }) => {
//                                 // setPerPage(value);
//                                 // setActivePage(1);
//                               }}
//                               options={dontReadOptions}
//                               style={{ marginRight: 24 }}
//                             />
//                           </Button.Group>
