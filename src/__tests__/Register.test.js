import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Register from '../components/register'


describe('<Register/>', () => {

    const event={
        target:{
            value:{},
            password:"",
            c_password:""
        },
        preventDefault: () => {

        }
    }
    const wrapper = shallow( <Register/> );

    it('renders without crashing', () => {
        render(<Register/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Register />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders the Register class', () => {   
        expect(wrapper.find(".Register")).toHaveLength(0);
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div/>))
    });
    it('renders seventeen div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(17);        
    });
    it('should render form without throwing an error', () => {
        expect(wrapper.exists(<form/>))
    });
    it('should render <h2> without throwing an error', () => {
        expect(wrapper.exists(<h2 className="text-capitalize card-title mt-5"/>))
    });
    it('renders five label elements', () => {
        expect(wrapper.find("label")).toHaveLength(5);        
    });
    it('renders five input label elements', () => {
        expect(wrapper.find("input")).toHaveLength(5);        
    });
    it('should render a button', () =>{
        expect(wrapper.find('button').length).toEqual(1)
    });
    it('should render form inputs', () => {
        expect(wrapper.find('#first_name').length).toEqual(1);
        expect(wrapper.find('#last_name').length).toEqual(1);
        expect(wrapper.find('#email').length).toEqual(1);
        expect(wrapper.find('#password').length).toEqual(1);
        expect(wrapper.find('#c_password').length).toEqual(1);
    });

    it('input should respond to change event and change the state', () => {
        wrapper.find('#first_name').simulate('change', { target: { name: 'first_name', value: 'ivan' } });
        expect(wrapper.state('first_name')).toEqual('ivan')
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#last_name').simulate('change', { target: { name: 'last_name', value: 'aturinda' } });
        expect(wrapper.state('last_name')).toEqual('aturinda')
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'admin@gmail.com' } });
        expect(wrapper.state('email')).toEqual('admin@gmail.com')
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'baron1234' } });
        expect(wrapper.state('password')).toEqual('baron1234')
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#c_password').simulate('change', { target: { name: 'c_password', value: 'baron1234' } });
        expect(wrapper.state('c_password')).toEqual('baron1234')
    });
    it('handles submit', () => {
        const wrapper = mount(<Register />); 
        wrapper.instance().handleSubmit(event)
    })
   
});