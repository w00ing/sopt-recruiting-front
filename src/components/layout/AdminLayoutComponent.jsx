import React, { useEffect, useState } from 'react';
import { Dropdown, Header, Icon, Label, Menu, Sidebar } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from 'src/constants/firebase';
import Cookies from 'js-cookie';
import 'semantic-ui-css/semantic.min.css';

const LayoutComponent = (props) => {
  const menusInit = [
    {
      type: 'SUBMENU',
      text: '질문',
      open: true,
      hasSubMenus: true,
      subMenus: [
        { text: 'OB', path: '/admin/questions/ob' },
        { text: 'YB', path: '/admin/questions/yb' },
      ],
    },
    {
      type: 'SUBMENU',
      text: '지원서 확인',
      open: true,
      hasSubMenus: true,
      subMenus: [
        { text: 'OB', path: '/admin/applicants/ob' },
        { text: 'YB', path: '/admin/applicants/yb' },
      ],
    },
  ];

  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState(menusInit);
  const [visible, setVisible] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    Cookies.remove('accesstoken');
    Cookies.remove('idfirebase');
  };

  return (
    <>
      <Menu
        fixed="top"
        // inverted
        secondary
        style={{
          backgroundColor: '#EFF0F1',
          borderBottomWidth: '0px',
          height: '40px',
        }}>
        <Menu.Item
          onClick={() => {
            setVisible(!visible);
          }}
          icon="sidebar"
        />
      </Menu>
      <div style={{ paddingTop: '40px' }}>
        <Sidebar.Pushable>
          <Sidebar
            size="large"
            as={Menu}
            // onHide={() => setVisible(false)}
            style={{ height: 'calc(100vh - 40px)', width: '275px' }}
            animation="overlay"
            visible={visible}
            // inverted
            vertical
            // borderless
          >
            {/* <Segment inverted vertical> */}
            {/* </Segment> */}
            <Menu.Item as={Link} to="/admin">
              <Icon name="home" />
              Home
            </Menu.Item>
            {menus.map((menu, i) => {
              switch (menu.type) {
                case 'MENU':
                  return (
                    <Menu.Item key={i} as={NavLink} to={menu.path}>
                      {menu.text}
                      {menus[i].labelNo > 0 && <Label color="red">{menus[i].labelNo}</Label>}
                      {!!menu.icon && <Icon name={menu.icon} />}
                    </Menu.Item>
                  );
                case 'SUBMENU':
                  return (
                    <Menu.Item key={i}>
                      {/* <Menu.Item> */}
                      <Icon
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          menus[i].open = !menus[i].open;
                          setMenus((prevState) => [...menus]);
                        }}
                        name={!menus[i].open ? 'chevron down' : 'chevron up'}
                      />
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          menus[i].open = !menus[i].open;
                          setMenus((prevState) => [...menus]);
                        }}>
                        {menu.text}
                      </span>
                      {menus[i].open && (
                        <Menu.Menu>
                          {menu.subMenus?.map((subMenu, j) => {
                            return (
                              <Menu.Item
                                as={NavLink}
                                // activeStyle={{ color: 'red' }}
                                name={subMenu.text}
                                to={subMenu.path}
                                icon={subMenu.iconName}
                                label={subMenu.label}
                                key={i * 10 + j}
                              />
                            );
                          })}
                        </Menu.Menu>
                      )}
                    </Menu.Item>
                  );
                case 'DROPDOWN':
                  return (
                    <Dropdown key={i} item text={menu.text} direction="left">
                      <Dropdown.Menu>
                        {menu.subMenus?.map((subMenu, j) => {
                          return (
                            <Dropdown.Item
                              key={i * 10 + j}
                              as={Link}
                              icon={subMenu.iconName}
                              text={subMenu.text}
                              to={subMenu.path}
                            />
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                default:
                  return null;
              }
            })}
            <Menu.Item onClick={handleLogout}>
              <Icon name="log out" />
              Log Out
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher
            style={
              visible
                ? {
                    height: 'calc(100vh - 40px)',
                    overflow: 'scroll',
                    marginLeft: '275px',
                  }
                : {
                    height: 'calc(100vh - 40px)',
                    overflow: 'scroll',
                  }
            }>
            {props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    </>
  );
};

export default LayoutComponent;
