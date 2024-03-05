import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './Redux/store';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RouteList from './routes/routeList';
import theme from './styles/theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const ThemeContext = createContext(theme);

root.render(
  <Provider store={store}>
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <RouteList />
      </BrowserRouter>
    </ThemeContext.Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
