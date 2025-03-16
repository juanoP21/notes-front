import { createRoot } from "react-dom/client";
import "./index.css";
import RouterDom from "./routes/RouterDom.jsx"; // Updated extension

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <RouterDom />
    </Router>
  </React.StrictMode>
);
