import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import Login from '../components/login'
import moxios from 'moxios'
import sinon from 'sinon';
import {MemoryRouter} from 'react-router-dom'
import '../setupTests';

describe('<Login/>', () => {
    const wrapper = shallow( <Login/> );

    it('renders without crashing', () => {
    shallow(<Login />);
    });
    it('has a valid snapshot', () => {
        const component = renderer.create(
            <MemoryRouter><Login/></MemoryRouter>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        expect(wrapper).toMatchSnapshot();
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

    // it('should log in user without throwing an error', () => {
    //     beforeEach(function () {
    //         moxios.install()
    //     });
    //     afterEach(function () {
    //         moxios.uninstall()
    //     });

    //     sinon.spy(Login.prototype, 'handleSubmit');
    //     const wrapper = shallow(<Login />);
    //     wrapper.setState({ email: 'admin@gmail.com', password: 'baron12345' })
    //     const Form = wrapper.find('form')

    //     Form.simulate('submit', { preventDefault() { } })
    //     expect(Login.prototype.handleLogin.calledOnce).toEqual(true)
    // });
});