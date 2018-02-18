import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import List from '../components/lists'
import Addlist from '../components/addlist'
import EditList from '../components/editlist'
import sinon from 'sinon';
import '../setupTests';


describe('<List/>', () => {
    
    const wrapper = mount( <List/> );


    it('has a valid snapshot', () => {
        const component = renderer.create(
        <List/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        shallow(<List/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('calls componentWillMount', () => {
        sinon.spy(List.prototype, 'componentDidMount');
        const wrapper = mount(<List />);
        expect(List.prototype.componentDidMount.calledOnce).toBe(true);
    });
    it('renders the Items class', () => {
        expect(wrapper.find(".List")).toHaveLength(0);
    });
    it('should render <i> without throwing an error', () => {
        expect(wrapper.exists(<i className="fa fa-edit"  />)).toBe(true)
    });
    it('should render <i> without throwing an error', () => {
        expect(wrapper.exists(<i className="fa fa-trash"  />)).toBe(true)
    });
    it('should render <i> without throwing an error', () => {
        expect(wrapper.exists(<i className="fa fa-bars"  />)).toBe(true)
    });
    it('renders three div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(10);        
    });
    it('should render a button', () =>{
        expect(wrapper.find('button').length).toEqual(4)
    });
    it('should render <table> without throwing an error', () => {
        expect(wrapper.exists(<table className="table table-hover table-striped"/>))
    });
    it('should render <thead> without throwing an error', () => {
        expect(wrapper.exists(<thead/>))
    });
    it('should render <tr> without throwing an error', () => {
        expect(wrapper.exists(<tr/>))
    });
    it('should render <td> without throwing an error', () => {
        expect(wrapper.exists(<td/>))
    });
    it('should render <tbody> without throwing an error', () => {
        expect(wrapper.exists(<tbody/>))
    });
    it('should render <ul> without throwing an error', () => {
        expect(wrapper.exists(<ul className="pagination justify-content-center"/>))
    });
    
});

describe('<List/> component contains child componenets', () => {
    
        it('should render <Addlist/> component', () => {
            const wrapper = shallow(<Addlist />)
            expect(wrapper.length).toEqual(1)
        });
        it('should render <EditList/> component', () => {
            const wrapper = shallow(<EditList />)
            expect(wrapper.length).toEqual(1)
        });    
});