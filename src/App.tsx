import './App.css';
import NavBar from './components/NavBar/NavBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import HomeClientPage from './containers/HomeClientPage/HomeClientPage.tsx';
import DishesPage from './containers/AdminPage/DishesPage/DishesPage.tsx';
import OrdersPage from './containers/AdminPage/OrdersPage/OrdersPage.tsx';
import NewDish from './containers/AdminPage/DishesPage/NewDish/NewDish.tsx';
import EditDish from './containers/AdminPage/DishesPage/EditDish/EditDish.tsx';

const App = () => {

    return (
        <>
            <NavBar />
            <Container>
                <Routes>
                    <Route path="/" element={(<HomeClientPage />)} />

                    <Route path="/admin" element={(<DishesPage/>)} />
                    <Route path="/admin/dishes" element={(<DishesPage/>)} />
                    <Route path="/admin/dishes/new-dish" element={(<NewDish/>)} />
                    <Route path="/admin/dishes/:id/edit-dish" element={(<EditDish/>)} />

                    <Route path="/admin/orders" element={(<OrdersPage/>)} />


                     <Route path='*' element={(<Typography component='p' variant='h4' sx={{textAlign: 'center', mt: 3, fontWeight: 'medium'}}>Not found page!</Typography>)} />
                </Routes>
            </Container>
        </>
    )
};

export default App
