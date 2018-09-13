import 'react-native';
import React, {Component} from 'react';
import App from '../App';

import render from 'react-test-renderer';

it('renders correctly', () =>{
    const hello = render.create(
        <App />
    )
})