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
} from 'semantic-ui-react';

import _ from 'lodash';
import numeral from 'numeral';
import dayjs from 'dayjs';

import { useLocation, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import RecruitingAnswerAPI from 'src/api/recruitingAnswer';
import RecruitingApplicantAPI from 'src/api/recruitingApplicant';
import { CURRENT_SEASON } from 'src/constants/season';

const AdminApplicantsContainer = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [perPage, setPerPage] = useState(20);
  const [nameSearchKeyword, setNameSearchKeyword] = useState('');
  const [part, setPart] = useState('전체');

  const [applicants, setApplicants] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [questionTypes, setQuestionTypes] = useState([]);

  const history = useHistory();

  const group = type.toUpperCase();

  const [partFilterOptions, setPartFilterOptions] = useState([]);

  useEffect(() => {
    load();
  }, [perPage, activePage]);

  const load = async () => {
    const res = await RecruitingApplicantAPI.recruitingApplicantListGET(
      CURRENT_SEASON,
      group,
      perPage * (activePage - 1),
      perPage,
      nameSearchKeyword,
    );
    if (!res.err) {
      setApplicants(res.applicants);
      setTotalPage(res.meta?.totalPage || 1);
      setQuestionTypes(res.questionTypes);
      // setPartFilterOptions(res.questionTypes?.map(o => ({o})))
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    await load();
    // setRefreshing(false);
  };

  const handleGoToApplicantDetailPage = (id) => {
    history.push(`/admin/applicants/detail/${id}`);
  };

  // if (loading) return <Loader active />;
  //                 setPart(_.find(questionTypes, (o) => o.id === Number(value)).typeKr);
  return (
    <div>
      <Container as={Segment} vertical>
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
          {/* </Container>
        <Container> */}
          <Button icon="search" content="이름 검색" onClick={handleSearch} loading={refreshing} disabled={refreshing} />
          <Input
            onChange={(e, { value }) => setNameSearchKeyword(value)}
            value={nameSearchKeyword}
            style={{ marginRight: 24 }}
          />
          {/* <Dropdown
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
          /> */}
        </Container>
        <Container>
          {loading ? (
            <div className="items-center justify-center h-screen">
              <Loader active />
            </div>
          ) : (
            <Table celled size="small" compact="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>id</Table.HeaderCell>
                  <Table.HeaderCell>이름</Table.HeaderCell>
                  <Table.HeaderCell>지원파트</Table.HeaderCell>
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
                  <Table.HeaderCell colSpan={8} textAlign="center">
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
