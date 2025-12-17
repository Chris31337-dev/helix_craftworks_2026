import React from 'react';
import ReactDOM from 'react-dom/client';
// Placeholder App component for when ./App is missing. Replace with
// `import App from './App';` after creating `src/App.tsx`.
const App: React.FC = () => (
  <div style={{ padding: 20 }}>
    App component not found. Please create src/App.tsx
  </div>
);
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
