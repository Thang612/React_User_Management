import Container from 'react-bootstrap/Container';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer, Bounce } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router';


function App() {

  return (
    <>
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/users" element={<TableUsers />} />
          </Routes>
        </Container>
      </div>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
