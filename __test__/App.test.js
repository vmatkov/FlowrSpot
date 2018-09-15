import 'react-native';
import React, {Component} from 'react';
import App from '../App';
//import 'isomorphic-fetch';

import renderer from 'react-test-renderer';

it('Renders correctly', () => {
    const app = renderer.create(
        <App />
    )
})

test('App Snapshot', () => {
    const snapShot = renderer.create(
        <App />
    ).toJSON()
    expect(snapShot).toMatchSnapshot();
})

// it('Searching for flower', async () => {
//     let AppData = renderer.create(<App />).getInstance();

//     global.fetch = jest.fn().mockImplementation( () => {
//         var p = new Promise((resolve, reject) => {
//             resolve({
//                 json: () => {
//                     return { id: 1, name : 'Alpski volcin', latin_name: 'Daphne alpina'}
//                 }
//             })
//         })
//     });

//     const response = await AppData.componentDidMount();
//     console.log(AppData.state);
//     //console.log(AppData)
//     let text = "Alpski";
//     AppData.onTextChange(text);
//     console.log(AppData.state);
    
// })