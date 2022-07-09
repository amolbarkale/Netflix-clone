import React, { useContext, useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, useMediaQuery, Drawer, Button, Avatar } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { Sidebar, Search } from '..';
import { fetchToken, createSessionId, moviesApi } from '../../Utils';
import { setUser, userSelector } from '../../features/auth';
import { ColorModeContext } from '../../Utils/ToggleColorMode';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  const ColorMode = useContext(ColorModeContext);

  useEffect(() => {
    const loggedInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    loggedInUser();
  }, [token]);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color="inherit" edge="start" aria-label="menu" style={{ outline: 'none' }} onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={ColorMode.handleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (<Button color="inherit" onClick={fetchToken}>Login &nbsp;<AccountCircle /></Button>) : (
              <Button color="inherit" component={Link} to={`/profile/${user.id}`} className={classes.linkButton} onClick={() => { }}>
                {!isMobile && (<>{user.username} &nbsp;</>)}
                <Avatar style={{ width: 30, height: 30 }} alt="profile" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} variant="temporary" anchor="right" open={mobileOpen} classes={{ paper: classes.drawerPaper }} ModalProps={{ keepMounted: true }}>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />

            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
