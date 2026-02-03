import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography
} from '@mui/material';
import {NavLink, useLocation} from 'react-router-dom';

const NavBar = () => {
    const { pathname } = useLocation();
    const isAdmin = pathname.startsWith('/admin');

    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static" color="primary">
                <Container>
                     <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component={NavLink} to={isAdmin ? '/admin' : '/'}
                        sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                    >
                        {isAdmin ? 'Turtle Pizza Admin' : 'Turtle Pizza'}
                    </Typography>

                    {isAdmin &&
                        <Box>
                          <Button
                            sx={{ mx: 'auto', color: 'white' }}
                            variant="outlined"
                            type="button"
                            component={NavLink}
                            to='/admin/dishes'
                          >
                            Dishes
                          </Button>

                          <Button
                            sx={{ mx: 'auto', color: 'white' }}
                            variant="outlined"
                            type="button"
                            component={NavLink}
                            to='/admin/orders'
                          >
                            Orders
                          </Button>
                        </Box>
                    }
                </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default NavBar;