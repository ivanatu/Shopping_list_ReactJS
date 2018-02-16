import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Addlist from '../components/addlist'
import moxios from 'moxios';
import sinon from 'sinon';
import '../setupTests';

describe('<Addlist/>', () => {
    const wrapper = shallow( <Addlist/> );
    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Addlist />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        shallow(<Addlist/>);
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div id="myModal"/>))
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
    it('input should respond to change event and change the state', () => {
        wrapper.find('#list').simulate('change', { target: { name: 'list', value: 'mangoes' } });
        expect(wrapper.state().name).toEqual('mangoes')
    });
    it('render the inputs', () =>{
        expect(wrapper.find('form').length).toEqual(1);
        expect(wrapper.find('input').length).toEqual(1)
    });
});

describe('add list successfully', () => {
    beforeEach(function () {
        moxios.install()
    })
    afterEach(function () {
        moxios.uninstall()
    })

    it('should add shopping item without throwing an error', () => {
        const wrapper = shallow(<Addlist />);
        const handleSubmit = sinon.spy()
        // sinon.spy(Additem.prototype, 'handleSubmit');
        wrapper.setState({ list: 'Coffee' })
        const Form = wrapper.find('form')

        Form.simulate('submit', { preventDefault() { } })
        expect(handleSubmit.calledOnce).toEqual(false)
    });
});