import './App.css';
import NavBar from './components/NavBar/NavBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import HomeClientPage from './containers/HomeClientPage/HomeClientPage.tsx';

const App = () => {

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Routes>
                    <Route path="/" element={(<HomeClientPage />)} />

                     <Route path='*' element={(<Typography component='p' variant='h4' sx={{textAlign: 'center', mt: 3, fontWeight: 'medium'}}>Not found page!</Typography>)} />
                </Routes>
            </Container>
        </>
    )
};

export default App
