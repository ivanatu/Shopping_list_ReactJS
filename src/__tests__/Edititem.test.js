import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Edititem from '../components/edititem'
import toJson from 'enzyme-to-json';
import '../setupTests';



describe('<Edititem/>', () => {
    const wrapper = shallow( <Edititem/> );
    
    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Edititem />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        render(<Edititem/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="modal"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="modal-dialog"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="modal-content"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="modal-header"/>))
    });
    it('should render a button', () =>{
        expect(wrapper.find('button').length).toEqual(2)
    })
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="modal-body"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="form-group"/>))
    });
    it('render the inputs', () =>{
        expect(wrapper.find('form').length).toEqual(1);
        expect(wrapper.find('input').length).toEqual(2)
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#name').simulate('change', { target: { name: 'name', value: 'apples' } });
        expect(wrapper.state().name).toEqual('apples')
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#price').simulate('change', { target: { name: 'price', value: '20' } });
        expect(wrapper.state().price).toEqual('20')
    });
    it('renders the edit item form and submits data', () =>{
        wrapper.setState({name:'apples', price:'20'});
        wrapper.find("#edititem").simulate('submit', {preventDefault(){}});
        expect(toJson(wrapper)).toMatchSnapshot();
        // expect(handleSubmit.calledOnce).toEqual(false)
    });
});