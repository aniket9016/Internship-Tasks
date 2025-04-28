import './App.css';
import Footer from './Components/Common/Footer';
import Header from './Components/Common/Header';
import Counter from './Components/Task2/Counter';
import Todo from './Components/Task2/Todo';
import Home from './Components/Common/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Task2/Register';
import NoPage from './Components/Common/NoPage';
import FetchApi from './Components/Task2/FetchApi'
import TicTacToe from './Components/Task1/TicTacToe'
import Task1 from './Components/Task1/Task1';
import Clock from './Components/Task1/Clock';
import DataFetch from './Components/Task1/DataFetch';
import Task2 from './Components/Task2/Task2';
import Task3 from './Components/Task3/Task3';
import CRUDUsingClass from './Components/Task3/CRUDUsingClass';
import StudentCRUD from './Components/Task3/StudentCRUD';
import StudentCRUDFunction from './Components/Task3/StudentCRUDFunction';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title="First-Project"/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/task1" element={<Task1 />}>
              <Route path="clock" element={<Clock />} />
              <Route path="tictactoe" element={<TicTacToe />} />
              <Route path="datafetch" element={<DataFetch />} />
            </Route>

            <Route path="/task2" element={<Task2 />}>
              <Route path="counter" element={<Counter />} />
              <Route path="todo" element={<Todo />} />
              <Route path="register" element={<Register />} />
              <Route path="fetchapi" element={<FetchApi />} />
            </Route>

            <Route path="/task3" element={<Task3 />}>
              <Route path="crudusingclass" element={<CRUDUsingClass />} />
              <Route path="studentcrud" element={<StudentCRUD />} />
              <Route path="studentcrudfunction" element={<StudentCRUDFunction />} />
            </Route>
            
            <Route path="*" element={<NoPage />} />
          </Routes>

        </div>
      </div>
      <Footer companyname="First Project"/>
    </BrowserRouter>
  );
}


export default App;
