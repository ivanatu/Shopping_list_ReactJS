import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Header from '../components/header';
import '../setupTests';
import {MemoryRouter} from 'react-router-dom'


describe('<Header/>', () => {
     const wrapper = shallow( <Header/> );
    
    it('renders without crashing', () => {
        shallow(<Header/>);
    });
    it('has a valid snapshot', () => { 
        const component = renderer.create(
            <MemoryRouter><Header/></MemoryRouter>); 
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with a snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render nav without throwing an error', () => {
        expect(wrapper.exists(<nav className="nav bar"/>)).toBe(true)
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="container" />)).toBe(true)
    });
    it('should render <h1> without throwing an error', () => {
        expect(wrapper.exists(<h1 className="navbar-brand m-o align-content-end mr-auto"/>)).toBe(true)
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div className="navbar-nav" />)).toBe(true)
    });
    it('should render a link', () =>{
        expect(wrapper.find('Link').length).toEqual(2)
    })
});

// describe('Header.OnLogout', () => {
//     const props = {
//         history : {
//             push: {
//                 listId: 4,
//             }
//         }
//     };
//     it('returns true when called', () => {
//         const wrapper = shallow(<Header />);
//         const instance = wrapper.instance();

//         // spy on the instance instead of the component
//         spyOn(instance, 'OnLogout').and.callThrough();

//         expect(instance.OnLogout()).toBe(true);
//         expect(instance.OnLogout).toHaveBeenCalled();
//     });
// });

