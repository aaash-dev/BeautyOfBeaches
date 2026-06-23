// Root entrypoint for the SPA: mount the React App and import the shared global stylesheet once.
import { createRoot } from "react-dom/client"; 
import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  