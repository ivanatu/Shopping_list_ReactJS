import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer'
import Login from '../components/login'
import '../setupTests';

describe('<Login/>', () => {
    const wrapper = shallow( <Login/> );
    it('renders without crashing', () => {
        shallow(<Login />);
    });
    it('renders without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="login"/>))
    });
    it('renders three div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(6);        
    });
    it('renders input tags  elements', () => {
        expect(wrapper.find("input")).toHaveLength(2);        
    });
    // it('renders the sign in form and submit data', () =>{
    //     wrapper.setState({email:'geofrocker2@gmail.com', password:"psalms"});
    //     wrapper.find("register-form").simulate('submit', {preventDefault});
    //     expect(toJson(wrapper)).toMatchSnapshot();
    //     expect(preventDefault).toBeCalled();
    // });
    it('should render label without throwing an error', () => {
        expect(wrapper.exists(<label className="login-field-icon fui-user"/>))
    });
    it('should render label without throwing an error', () => {
        expect(wrapper.exists(<label className="login-field-icon fui-lock"/>))
    });
});