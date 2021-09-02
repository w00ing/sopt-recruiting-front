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

import { useLocation, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';

const AdminMainContainer = (props) => {
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();

  const qs = queryString.parse(search);

  return <div>AdminMainContainer</div>;
};

export default AdminMainContainer;
