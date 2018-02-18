import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Items from '../components/items'
import Additem from '../components/additem'
import EditItem from '../components/edititem'
import '../setupTests';

describe('<Items/>', () => {
    const props = {
        match : {
            params: {
                listId: 4,
                listName: 'test'
            }
        }
    };

    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Items {...props}/>);
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        shallow(<Items {...props}/>);
    });
    const wrapper = shallow( <Items {...props}/> );
    
    it('renders without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('renders the Items class', () => {
        expect(wrapper.find(".Item")).toHaveLength(0);
    });
    it('renders nine div jsx elements', () => {
        expect(wrapper.find("div")).toHaveLength(4);        
    });
    it('should render a button', () =>{
        expect(wrapper.find('button').length).toEqual(2)
    });
    it('should render <table> without throwing an error', () => {
        expect(wrapper.exists(<table className="table table-hover table-striped"/>))
    });
    it('should render <i> without throwing an error', () => {
        expect(wrapper.exists(<i className="fa"  />)).toBe(true)
    });
    it('should render <form> without throwing an error', () => {
        expect(wrapper.exists(<form className="form-inline"  />)).toBe(true)
    });
    it('should render <thead> without throwing an error', () => {
        expect(wrapper.exists(<thead/>))
    });
    it('should render <tr> without throwing an error', () => {
        expect(wrapper.exists(<tr/>))
    });
    it('should render <li> without throwing an error', () => {
        expect(wrapper.exists(<li className="page-item"/>))
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

describe('<Items /> component contains child componenets', () => {
    
        it('should render <Additem/> component', () => {
            const wrapper = shallow(<Additem />)
            expect(wrapper.length).toEqual(1)
        });
        it('should render <EditItem/> component', () => {
            const wrapper = shallow(<EditItem />)
            expect(wrapper.length).toEqual(1)
        });    
});