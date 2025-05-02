import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@atlaskit/css-reset';

createRoot(document.getElementById("root")!).render(<App />);
