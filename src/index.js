
import ReactDOM from 'react-dom/client';
import initReactFastclick from 'react-fastclick';
import App from "./App";

initReactFastclick();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);