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
} from 'semantic-ui-react';

import _ from 'lodash';
import numeral from 'numeral';
import dayjs from 'dayjs';

import { useLocation, useRouteMatch, useHistory } from 'react-router';

const RecruitingMainContainer = (props) => {
  const [loading, setLoading] = useState(true);

  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  return <div>RecruitingMainContainer</div>;
};

export default RecruitingMainContainer;
