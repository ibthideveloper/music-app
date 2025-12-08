import "./App.css";
import { AppRoutes } from "./routes/routes";
import ToasterProvider from "../providers/ToasterProvider";

function App() {
  return (
    <div className="h-screen">
      <ToasterProvider />
      <AppRoutes />
    </div>
  );
}

export default App;
