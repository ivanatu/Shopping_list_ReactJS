import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Editlist from '../components/editlist'
import toJson from 'enzyme-to-json';
import '../setupTests';


describe('<Editlist/>', () => {
    const wrapper = shallow( <Editlist/> );

    it('renders without crashing', () => {
    render(<Editlist/>);
    expect(wrapper).toMatchSnapshot();
    });
    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Editlist />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
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
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="modal-body"/>))
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="form-group"/>))
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#list').simulate('change', { target: { name: 'list', value: 'mangoes' } });
        expect(wrapper.state().name).toEqual('mangoes')
    });
    it('render the inputs', () =>{
        expect(wrapper.find('form').length).toEqual(1);
        expect(wrapper.find('input').length).toEqual(1)
    });
    it('renders the edit list form and submits data', () =>{
        wrapper.setState({list:'groceries'});
        wrapper.find("#editlist").simulate('submit', {preventDefault(){}});
        expect(toJson(wrapper)).toMatchSnapshot();
        // expect(handleSubmit.calledOnce).toEqual(false)
    });
    
});