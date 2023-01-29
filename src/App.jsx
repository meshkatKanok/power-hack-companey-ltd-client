import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./Auth/RequireAuth";
import useAuth from "./Hooks/useAuth";
import Billing from "./Pages/Billing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Shared/Footer";
import Header from "./Shared/Header";
export const AuthContext = createContext(null);
function App() {
  const { auth, refetch, user } = useAuth();
  const [paidTotal, setPaidTotal] = useState(0);

  return (
    <>
      <section>
        <Toaster />
        <AuthContext.Provider
          value={{ auth, user, refetch, setPaidTotal, paidTotal }}
        >
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Billing />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </AuthContext.Provider>
      </section>
    </>
  );
}

export default App;
