import React from 'react'
import ReactDom from 'react-dom'
import App from './app'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import './style.css'
import 'antd/dist/antd.css';
ReactDom.render(
<Router>
    <Provider store={store}>

<App/>
    </Provider>

</Router>

, document.querySelector('#root'))