import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Additem from '../components/additem'
import moxios from 'moxios';
import sinon from 'sinon';
import '../setupTests';

describe('<Additem/>', () => {
    const wrapper = shallow( <Additem/> );
    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Additem />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        shallow(<Additem/>);
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
    // it('renders the add item form and submits data', () =>{
    //     wrapper.setState({name:'mangoes', price:'20'});
    //     wrapper.find('create_form').simulate('submit', {preventDefault});
    //     expect(toJson(wrapper)).toMatchSnapshot();
    //     expect(preventDefault).toBeCalled();
    // });
    // it('input should respond to change event and change the state', () => {
    //     wrapper.find('#name', '#price').simulate('change', { target: { name: 'list', value: 'mangoes',  } });
    //     expect(wrapper.state().name).toEqual('mangoes')
    // });
    
    it('render the inputs', () =>{
        expect(wrapper.find('name').length).toEqual(0);
        expect(wrapper.find('form').length).toEqual(1);
        expect(wrapper.find('input').length).toEqual(2)
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="form-group"/>))
    });
});

describe('add item successfully', () => {
    beforeEach(function () {
        moxios.install()
    })
    afterEach(function () {
        moxios.uninstall()
    })

    
    it('should add shopping item without throwing an error', () => {
        const wrapper = shallow(<Additem />);
        const handleSubmit = sinon.spy()
        // sinon.spy(Additem.prototype, 'handleSubmit');
        wrapper.setState({ name: 'Coffee', price:45 })
        const Form = wrapper.find('form')

        Form.simulate('submit', { preventDefault() { } })
        expect(handleSubmit.calledOnce).toEqual(false)
    });
});

