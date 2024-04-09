import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { SpotifyApiProvider } from "./context/SpotifyApiContext";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? (
    <SpotifyApiProvider code={code}>
      <Dashboard />
    </SpotifyApiProvider>
  ) : (
    <Login />
  );
}

export default App;
