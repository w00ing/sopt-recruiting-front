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

import { useLocation, useRouteMatch } from 'react-router';

const HomeContainer = (props) => {
  const [loading, setLoading] = useState(true);

  const match = useRouteMatch();
  const location = useLocation();

  return <div>HomeContainer</div>;
};

export default HomeContainer;
