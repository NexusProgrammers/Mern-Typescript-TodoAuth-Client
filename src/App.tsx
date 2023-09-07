import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddTodo, Home, SignIn, SignUp } from "./pages";
import { Header, ProtectRoute, PublicRoute } from "./components";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/add/todo"
          element={
            <ProtectRoute>
              <AddTodo />
            </ProtectRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
