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
  TextArea,
  Tab,
  Icon,
} from 'semantic-ui-react';

import _ from 'lodash';
import numeral from 'numeral';
import dayjs from 'dayjs';

import { useLocation, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import TextareaAutosize from 'react-textarea-autosize';
import RecruitingQuestionAPI from 'src/api/recruitingQuestion';
import LoadingComponent from 'src/components/shared/LoadingComponent';
import { CURRENT_SEASON } from 'src/constants/season';

const AdminQuestionsMainContainer = ({ type }) => {
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();

  const group = type.toUpperCase();

  const [commonQuestions, setCommonQuestions] = useState({});
  const [partQuestions, setPartQuestions] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [showCommonQuestions, setShowCommonQuestions] = useState(true);

  useEffect(() => {
    load();
  }, [group]);

  const load = async () => {
    // setLoading(true);
    const res = await RecruitingQuestionAPI.recruitingQuestionListGET(CURRENT_SEASON, group);
    if (!res.err) {
      setCommonQuestions(res.commonQuestions);
      setPartQuestions(res.partQuestions);
      setQuestionTypes(res.questionTypes);
      setLoading(false);
    }
  };

  const handleAddQuestion = async (part, season, group, recruitingQuestionTypeId, order) => {
    const res = await RecruitingQuestionAPI.recruitingQuestionPOST(season, group, recruitingQuestionTypeId, order);
    if (!res.err) {
      if (part === '공통') {
        setCommonQuestions((prev) => ({
          part: '공통',
          questions: [...prev.questions, res.question],
        }));
      } else {
        setPartQuestions((prev) =>
          prev.map((o) => (o.part === part ? { part: o.part, questions: [...o.questions, res.question] } : o)),
        );
      }
    }
  };
  const handleChangeQuestion = (part, value, questionId) => {
    if (part === '공통') {
      setCommonQuestions((prev) => ({
        part: '공통',
        questions: prev.questions.map((o) => (o.id === questionId ? { ...o, question: value } : o)),
      }));
    } else {
      setPartQuestions((prev) =>
        prev.map((p) =>
          p.part === part
            ? {
                part: p.part,
                questions: p.questions.map((o) => (o.id === questionId ? { ...o, question: value } : o)),
              }
            : p,
        ),
      );
    }
  };

  const handleChangeCharLimit = (part, value, questionId) => {
    if (part === '공통') {
      setCommonQuestions((prev) => ({
        part: '공통',
        questions: prev.questions.map((o) => (o.id === questionId ? { ...o, charLimit: Number(value) } : o)),
      }));
    } else {
      setPartQuestions((prev) =>
        prev.map((p) =>
          p.part === part
            ? {
                part: p.part,
                questions: p.questions.map((o) => (o.id === questionId ? { ...o, charLimit: Number(value) } : o)),
              }
            : p,
        ),
      );
    }
  };

  const handleDeleteQuestion = async (part, recruitingQuestionId) => {
    const res = await RecruitingQuestionAPI.recruitingQuestionDELETE(recruitingQuestionId);
    if (!res.err) {
      if (part === '공통') {
        setCommonQuestions((prev) => ({
          part: '공통',
          questions: prev.questions.filter((o) => o.id !== recruitingQuestionId),
        }));
      } else {
        setPartQuestions((prev) =>
          prev.map((p) =>
            p.part === part
              ? {
                  part: p.part,
                  questions: p.questions.filter((o) => o.id !== recruitingQuestionId),
                }
              : p,
          ),
        );
      }
    }
  };

  const handleSaveQuestion = async (part, recruitingQuestionId, question, charLimit) => {
    const res = await RecruitingQuestionAPI.recruitingQuestionPUT(recruitingQuestionId, question, charLimit);
  };

  // console.log(_.find(partQuestions, (o) => o.part === '웹'));
  if (loading) return <Loader />;

  const questionsComponent = (part, questions) => {
    // console.log(questionTypes);
    const recruitingTypeId = _.find(questionTypes, (o) => o.typeKr === part)?.id;
    // console.log(recruitingTypeId);
    return (
      <div>
        <Form>
          {questions?.map((o, i) => (
            <div key={o.id} className="mb-12">
              <div className="flex flex-row items-center text-xl">✔️ &nbsp;&nbsp;질문 {o.order}</div>

              <Form.Field
                control={TextareaAutosize}
                value={o.question || ''}
                onChange={({ target: { value } }) => handleChangeQuestion(part, value, o.id)}
                // label={`질문 ${o.order}`}
              />

              <Input
                className="w-1/12"
                label="글자 수 제한: "
                value={o.charLimit || 0}
                onChange={({ target: { value } }) => handleChangeCharLimit(part, value, o.id)}
              />

              <div className="flex flex-row mt-4">
                <Button primary onClick={() => handleSaveQuestion(part, o.id, o.question, o.charLimit)}>
                  저장
                </Button>
                <Button color="red" onClick={() => handleDeleteQuestion(part, o.id)}>
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </Form>
        {part !== '공통' && (
          <Button
            onClick={() =>
              handleAddQuestion(
                part,
                CURRENT_SEASON,
                group,
                recruitingTypeId,
                _.find(partQuestions, (o) => o.part === part).questions.length + 1,
              )
            }>
            질문 추가
          </Button>
        )}
      </div>
    );
  };

  const panes = partQuestions?.map((o) => ({
    menuItem: o.part,
    render: () => <Tab.Pane>{questionsComponent(o.part, o.questions)}</Tab.Pane>,
  }));
  console.log(panes);
  return (
    <div className="mx-6 my-8">
      <div className="text-4xl my-8">
        {CURRENT_SEASON}기 {group} 질문 리스트
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          {commonQuestions?.part && questionTypes?.length !== 0 && (
            <Container as={Segment}>
              <div className="flex flex-row items-center mb-6">
                <div className="font-bold text-2xl text-center self-center center mr-4">공통 질문</div>
                {/* <Button basic onClick={() => setShowCommonQuestions((prev) => !prev)}>
              {showCommonQuestions ? '숨기기' : '보이기'}
            </Button> */}
              </div>
              {questionsComponent('공통', commonQuestions?.questions)}
              <Button
                onClick={() =>
                  handleAddQuestion('공통', CURRENT_SEASON, group, 1, commonQuestions?.questions?.length + 1)
                }>
                질문 추가
              </Button>
            </Container>
          )}
        </div>
        <div className="w-1/2 ml-6">
          {panes?.length !== 0 && (
            <Container as={Segment}>
              <div className="font-bold text-2xl mb-4">파트 별 질문</div>
              <Tab panes={panes} />
            </Container>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionsMainContainer;
