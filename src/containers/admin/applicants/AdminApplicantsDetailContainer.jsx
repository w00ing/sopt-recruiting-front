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
  List,
  Header,
  Message,
} from 'semantic-ui-react';

import _ from 'lodash';
import numeral from 'numeral';
import dayjs from 'dayjs';

import { useLocation, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import RecruitingAnswerAPI from 'src/api/recruitingAnswer';
import RecruitingApplicantAPI from 'src/api/recruitingApplicant';
import { CURRENT_SEASON } from 'src/constants/season';

const AdminApplicantsDetailContainer = ({}) => {
  const [loading, setLoading] = useState(true);

  const [applicant, setApplicant] = useState({});
  const [commonQuestions, setCommonQuestions] = useState([]);
  const [partQuestions, setPartQuestions] = useState([]);

  const { id: recruitingApplicantId } = useParams();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await RecruitingApplicantAPI.recruitingApplicantGET(recruitingApplicantId);
    if (!res.err) {
      setApplicant(res.applicant);
      setCommonQuestions(res.commonQuestions);
      setPartQuestions(res.partQuestions);
      setLoading(false);
    }
  };

  const handleGoToApplicantDetailPage = () => {};

  if (loading) return <Loader active />;

  return (
    <Container>
      <Container as={Segment} padded="very">
        <div className="flex flex-row items-center">
          <div className="w-1/2 h-full mb-8">
            <img
              alt=""
              src={applicant?.pic || 'https://react.semantic-ui.com/images/wireframe/image.png'}
              className="w-full h-full"
            />
          </div>
          <div className="w-1/2 ml-8 text-3xl font-bold">
            <div>{applicant?.name}</div>
            <div>
              {applicant?.season}기 {applicant?.part} {applicant?.group} 지원
            </div>
          </div>
        </div>

        <List horizontal>
          <List.Item>
            <Label>
              id<Label.Detail>{applicant?.id}</Label.Detail>
            </Label>
          </List.Item>
          {/* <List.Item>
            <Label>
              이름<Label.Detail>{applicant?.name}</Label.Detail>
            </Label>
          </List.Item> */}
          {/* <List.Item>
            <Label>
              구분<Label.Detail>{applicant?.group}</Label.Detail>
            </Label>
          </List.Item> */}
          {/* <List.Item>
            <Label>
              파트<Label.Detail>{applicant?.part}</Label.Detail>
            </Label>
          </List.Item> */}
          {/* <List.Item>
            <Label>
              지원 기수<Label.Detail>{applicant?.season}</Label.Detail>
            </Label>
          </List.Item> */}
        </List>

        <div className="flex flex-row mt-8">
          <div className="w-1/2">
            <List>
              <List.Item>
                <Label>
                  최근 활동 기수<Label.Detail>{applicant?.mostRecentSeason || '없음'}</Label.Detail>
                </Label>
              </List.Item>
              <List.Item>
                <Label>
                  전화번호<Label.Detail>{applicant?.phone}</Label.Detail>
                </Label>
              </List.Item>
              <List.Item>
                <Label>
                  거주지<Label.Detail>{applicant?.address}</Label.Detail>
                </Label>
              </List.Item>
              <List.Item>
                <Label>
                  지하철역<Label.Detail>{applicant?.nearestStation}</Label.Detail>
                </Label>
              </List.Item>
            </List>
          </div>
          <div className="w-1/2">
            <List>
              <List.Item>
                <Label>
                  학교<Label.Detail>{applicant?.college}</Label.Detail>
                </Label>
              </List.Item>
              <List.Item>
                <Label>
                  학과<Label.Detail>{applicant?.major}</Label.Detail>
                </Label>
              </List.Item>
              <List.Item>
                <Label>
                  휴학 여부<Label.Detail>{applicant?.leaveAbsence ? 'O' : 'X'}</Label.Detail>
                </Label>
              </List.Item>
              {applicant?.group === 'OB' && (
                <List.Item>
                  <Label>
                    앱잼 참여 여부<Label.Detail>{applicant?.willAppjam ? 'O' : 'X'}</Label.Detail>
                  </Label>
                </List.Item>
              )}
              <List.Item>
                <Label>
                  생년월일<Label.Detail>{applicant?.birthday}</Label.Detail>
                </Label>
              </List.Item>
            </List>
          </div>
        </div>
      </Container>
      <br />
      <br />
      <Container>
        <Label size="huge">공통질문</Label>
        {commonQuestions?.map((cq) => {
          return (
            <Container as={Segment} key={cq.id} padded="very">
              {/* <Header as="h3"> */}
              <Message info>
                <Message.Header>
                  {cq.order}. {cq.question}
                </Message.Header>
              </Message>

              <p>{cq.answer?.answer}</p>
              <div className="float-right">
                ({cq.answer?.answer?.length || 0} / {cq.charLimit})
              </div>
              <br />

              {/* </Header> */}
            </Container>
          );
        })}
      </Container>
      <br />
      <br />
      <Container>
        <Label size="huge">파트 별 질문</Label>
        {partQuestions?.map((pq) => {
          return (
            <Container as={Segment} key={pq.id} padded="very">
              {/* <Header as="h3"> */}
              <Message info>
                <Message.Header>
                  {pq.order}. {pq.question}
                </Message.Header>
              </Message>

              <p>{pq.answer?.answer}</p>
              <div className="float-right">
                ({pq.answer?.answer?.length || 0} / {pq.charLimit})
              </div>
              <br />

              {/* </Header> */}
            </Container>
          );
        })}
      </Container>
    </Container>
  );
};

export default AdminApplicantsDetailContainer;
