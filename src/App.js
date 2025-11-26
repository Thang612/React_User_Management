import Container from 'react-bootstrap/Container';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer, Bounce } from 'react-toastify';


function App() {

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <TableUsers />
        </Container>
      </div>
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
