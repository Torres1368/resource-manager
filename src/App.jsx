import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider } from "./lib/context/user";
import { AppRouter } from "./router/AppRouter";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
      <UserProvider>
        <AppRouter />
      </UserProvider>
  );
}

export default App;
