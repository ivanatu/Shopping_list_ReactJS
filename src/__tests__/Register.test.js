import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Register from '../components/register'
import '../setupTests';

describe('<Register/>', () => {
    const wrapper = shallow( <Register/> );
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
    
});