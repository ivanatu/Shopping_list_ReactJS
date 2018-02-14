import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import Header from '../components/header';
// import '../setupTests';


describe('<Header/>', () => {
    // const header = shallow( <Header/> );
    // // it('should render nav without throwing an error', () => {
    // //     expect(header.exists(<nav className="nav bar"/>))
    // // });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="container" />)).toBe(true)
    });
    // it('should render a link', () =>{
    //     expect(wrapper.find('Link').length).toEqual(1)
    // })
});

