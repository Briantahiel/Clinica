// import { Link } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { useUserContext } from "../assets/Provider/UserProvider";

const settings = ['Home', 'Log In'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { loggedInUser } = useUserContext();
  const { logout } = useUserContext();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleLogout = () => {
    logout(); 
  };
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  <>
    <AppBar style={{ backgroundColor:'white'}} className='appbar'>
      <Container className='container-appbar'>
        <Toolbar disableGutters>
        <img alt='logo' src="./img/logo.png" style={{ width: '70px' }} />     
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                  <Button
                    className="btn-pages"
                    sx={{ my: 3, color: 'black', display: 'block' }}
                  >
                    HOME
                  </Button>
                </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                    className="btn-pages"
                    onClick={() => {
                      handleCloseNavMenu();
                      scrollToSection('dentistas');
                    }}      
                    sx={{ my: 3, color: 'black', display: 'block' }}
                  >
                    DENTISTAS
                  </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    className="btn-pages"
                    onClick={() => {
                        handleCloseNavMenu();
                        scrollToSection('footer');
                      }}
                    sx={{ my: 3, color: 'black', display: 'block' }}
                  >
                    SOBRE NOSOTROS
                  </Button>
                  </MenuItem>
            </Menu> 
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button className='btn-pages'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'black', display: 'block' }}
              >
              <Link to="/" style={{ textDecoration: 'none'}}>HOME</Link>
              </Button>
              <Button className='btn-pages'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'black', display: 'block' }}
              >
                 <Link to="#" onClick={() => scrollToSection('medicos')} style={{ textDecoration: 'none' }}>
            DENTISTAS
          </Link>
              </Button>
              <Button className='btn-pages'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'black', display: 'block' }}
              >
          <Link to="#" onClick={() => scrollToSection('footer')}  style={{ textDecoration: 'none'}}>
            SOBRE NOSOTROS
          </Link>
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          {loggedInUser ? (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={loggedInUser.nombre} src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Ajustes">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={loggedInUser?.nombre}>
              {loggedInUser?.nombre?.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
          )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
           {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
            {setting === 'Home' ? (
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography textAlign="center">{setting}</Typography>
            </Link>
            ) : (
              <Link
              to={loggedInUser ? '/' : '/login'} style={{ textDecoration: 'none', color: 'inherit' }} onClick={loggedInUser ? handleLogout : undefined}>              
              <Typography textAlign="center">{loggedInUser ? 'Log Out' : 'Log In'}</Typography>
            </Link>
            )}
          </MenuItem>
          ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
 export default Navbar;
