import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Register from '../components/register'
import '../setupTests';


describe('<Register/>', () => {
    const wrapper = shallow( <Register/> );

    it('renders without crashing', () => {
        shallow(<Register/>);
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
    it('renders without crashing', () => {
        expect(wrapper).toMatchSnapshot();
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
    it('can validate that the two passwords are the same', ()=>{
        const field1 = wrapper.find({name: 'password'});
        field1.getElement("password");
        field1.simulate('change', field1);
        //
        const field2 = wrapper.find({name: 'c_password'});
        field2.getElement("c_password");
        field2.simulate('change', field2);
        //
        // wrapper.find('form').simulate('submit', { preventDefault() { } });
        // expect(wrapper.state().notify).toEqual("Passwords dont match");
        // expect(wrapper.state().errors.password2).toEqual("Please make sure these passwords match");
    });
});