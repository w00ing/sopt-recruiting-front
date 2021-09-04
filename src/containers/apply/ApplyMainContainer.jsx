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
import queryString from 'query-string';

import {
  useLocation,
  useRouteMatch,
  useHistory,
  useParams,
} from 'react-router-dom';
import ApplyFormComponent from 'src/components/apply/ApplyFormComponent';

const ApplyMainContainer = ({ type }) => {
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();

  const qs = queryString.parse(search);
  console.log(qs);

  return (
    <div>
      <ApplyFormComponent type={type} />
    </div>
  );
};

export default ApplyMainContainer;
