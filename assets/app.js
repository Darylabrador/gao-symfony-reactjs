import React from 'react'
import ReactDOM from "react-dom";
import Navigation from './components/Navigation';
import './styles/app.css';

if (document.getElementById('app')) {
    ReactDOM.render(<Navigation />, document.getElementById('app'));
}