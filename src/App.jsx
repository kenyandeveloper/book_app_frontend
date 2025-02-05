import "./App.css";
import Login from "./components/Authentication/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useUser } from "./context/UserContext.js";
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import SignUp from "./components/Authentication/SignUp.jsx";
import HomeUser from "./components/HomeUser.jsx";
import ReadingList from "./components/ReadingList.jsx";
import BookDetail from "./components/BookDetail.jsx";
import AddBook from "./components/AddBook.jsx";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login..."); // Debugging
    return <Navigate to="/login" />;
  }
  return element;
};

function App() {
  return (
    <Router>
      {/* Add ToastContainer here */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<DashBoard />} />}
        />
        <Route
          path="/home"
          element={<ProtectedRoute element={<HomeUser />} />}
        />
        <Route
          path="/reading-list"
          element={<ProtectedRoute element={<ReadingList />} />}
        />
        <Route
          path="/addbook"
          element={<ProtectedRoute element={<AddBook />} />}
        />
        <Route
          path="/books/:id"
          element={<ProtectedRoute element={<BookDetail />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
