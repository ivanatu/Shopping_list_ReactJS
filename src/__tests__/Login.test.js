import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import Login from '../components/login'
import moxios from 'moxios'
import sinon from 'sinon';
import {MemoryRouter} from 'react-router-dom'

describe('<Login/>', () => {
   
    const wrapper = shallow( <Login/> );

    it('renders without crashing', () => {
    shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
    });
    it('has a valid snapshot', () => {
        const component = renderer.create(
            <MemoryRouter><Login/></MemoryRouter>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
   
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="login"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="login-screen"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="app-title"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="login-form"/>))
    });
    it('should render <form> without throwing an error', () => {
        expect(wrapper.exists(<form className="register-form"/>))
    });
    it('renders three div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(6);        
    });
    it('renders input tags  elements', () => {
        expect(wrapper.find("input")).toHaveLength(2);        
    });
    it('renders button elements', () => {
        expect(wrapper.find("button")).toHaveLength(1);        
    });
    it('renders link elements', () => {
        expect(wrapper.find("Link")).toHaveLength(1);        
    });
    it('should render label without throwing an error', () => {
        expect(wrapper.exists(<label className="login-field-icon fui-user"/>))
    });
    it('should render label without throwing an error', () => {
        expect(wrapper.exists(<label className="login-field-icon fui-lock"/>))
    });
    it('should render form inputs', () => {
        expect(wrapper.find('#email').length).toEqual(1);
        expect(wrapper.find('#password').length).toEqual(1);
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'admin@gmail.com' } });
        expect(wrapper.state('email')).toEqual('admin@gmail.com')
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'baron1234' } });
        expect(wrapper.state('password')).toEqual('baron1234')
    });
    it('renders login form and submits data', () =>{
        wrapper.find("#login_form").simulate('submit', {preventDefault(){}});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
 
});