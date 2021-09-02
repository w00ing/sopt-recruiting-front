import Cookies from 'js-cookie';
import React, { Component, useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button, Container, Grid, Message, Segment, Table } from 'semantic-ui-react';
import { auth } from 'src/constants/firebase';

const UnauthorizedComponent = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await auth.signOut();
    Cookies.remove('accesstoken');
    Cookies.remove('idfirebase');
  };

  return (
    <>
      <Container style={{}}>
        <Grid style={{ height: '100vh', alignItems: 'center' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450, margin: 'auto' }}>
            <Segment vertical basic>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  style={{
                    backgroundImage: `url(${user.photoUrl})`,
                    backgroundSize: '100px',
                    height: '100px',
                    width: '100px',
                    borderRadius: '50px',
                  }}
                />
                <div style={{ flex: 1, paddingLeft: '1rem' }}>
                  <Table>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell style={{}}>Full Name</Table.Cell>
                        <Table.Cell>
                          {user.firstName} {user.lastName}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>uid</Table.Cell>
                        <Table.Cell>{user.id}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>idFirebase</Table.Cell>
                        <Table.Cell>{user.idFirebase}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
              <Message warning>
                <Message.Header content="Login Error" />
                <Message.Content>This account does not have admin permissions.</Message.Content>
              </Message>
              <Button fluid onClick={handleLogout} content="Log Out" basic />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default UnauthorizedComponent;
