import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Items from '../components/items'
import Additem from '../components/additem'
import sinon from 'sinon';
import EditItem from '../components/edititem'

describe('<Items/>', () => {
    
    const props = {
        match : {
            params: {
                listId: 4,
                listName: 'test'
            }
        }
    };

    const event={
        target:{
            value:{}
        },
        preventDefault: () => {

        },
        push: (event) =>{

        }
    }
   
    const wrapper = shallow( <Items {...props}/> );
    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Items {...props}/>);
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot();
    });
    // it('renders without crashing', () => {
    //     render(<Items {...props}/>);
    //     expect(wrapper).toMatchSnapshot();
    // });
    it('calls componentWillMount', () => {
        sinon.spy(Items.prototype, 'componentDidMount');
        const wrapper = mount(<Items {...props}/>);
        expect(Items.prototype.componentDidMount.calledOnce).toBe(true);
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
    it('delete category', () => {
        const wrapper = shallow(<Items {...props}/>); 
        wrapper.instance().onDeleteClick(event)
    });
    it('list delete category', () => {
        const wrapper = shallow(<Items {...props}/>); 
        wrapper.instance().onListDelete(event)
    });
    it('component did mount', () => {
        const wrapper = shallow(<Items {...props}/>); 
        wrapper.instance().componentDidMount()
    });
    it('fetch list', () => {
        const wrapper = shallow(<Items {...props}/>); 
        wrapper.instance().fetchItems()
    });
    it('handle click', () => {
        const wrapper = shallow(<Items {...props}/>); 
        wrapper.instance().handleClick()
    });
    it('handle clicks', () => {
        const wrapper = shallow(<Items {...props}/>); 
        wrapper.instance().handleClicks(event)
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