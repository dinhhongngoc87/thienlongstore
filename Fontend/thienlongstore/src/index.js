import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'mdbreact/dist/css/mdb-free.css';
// import "./asset/scss/free/mdb-free.scss"
import './custom.scss';
import GlobalStyles from './components/GlobalStyles';
import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={reduxStore}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
