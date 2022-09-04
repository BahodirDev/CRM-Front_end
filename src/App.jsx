import { useEffect, useState } from 'react'
import './App.css';
import './styles/admin.css';
import './styles/tooplate.css';
import './styles/fontawesome.min.css';
import './styles/bootstrap.min.css';
import RightBar from './portions/RightBar';
import LeftBar from './portions/LeftBar';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import ShowInfo from './components/ShowInfo';
import Edit from './components/Edit';
import AddEmployee from './components/AddEmployee';
import Products from './components/Products';
import ItemShow from './components/ItemShow';
import AddItem from './components/AddItem';
import EditProducts from './components/EditProducts';
import Store from './components/Store';
import Basket from './components/Basket';
import Category from './components/Category';
import Report from './components/Report';
import Auth from './portions/Auth';
import { useDispatch, useSelector } from 'react-redux';
import CategoryAdd from './components/CategoryAdd';
import EditCat from './components/EditCat';
import ShowCat from './components/ShowCat';
import EditReport from './components/EditReport';

function App() {

  const { user, login } = useSelector(state => state);
  const [isLogin, setIsLogin] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/auth')
      setIsLogin(JSON.parse(localStorage.getItem('user')))
      dispatch({ type: "LOGIN", payload: true })
    }
  }, [])
  console.log(user);
  console.log(login);

  return (
    <>
    
      <Navbar />
      <div className='home'>
        <div className='left_bar'>
          <LeftBar />
        </div>
        <div className='right_bar'>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/auth' index element={
              <div className='login_modal'>
                <div className='login_component'>
                  <Auth />
                </div>
              </div>
            } />
            <Route path='/store' index element={<Store />} />
            <Route path='/employees' element={<RightBar />} />
            <Route path='/report' element={<Report />} />
            <Route path='/products' element={<Products />} />
            <Route path='/category' element={<Category />} />
            <Route path='/categoryAdd' element={<CategoryAdd />} />
            <Route path='/employeesAdd' element={<AddEmployee />} />
            <Route path='/add_item' element={<AddItem />} />
            <Route path='/store/show_item/:id' element={<ItemShow />} />
            <Route path='/show/:id' element={<ShowInfo />} />
            <Route path='/showCat/:id' element={<ShowCat />} />
            <Route path='/editCat/:id' element={<EditCat />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/edit_item/:id' element={<EditProducts />} />
            <Route path='/edit_report/:id' element={<EditReport />} />
            <Route path='/basket' element={<Basket />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
