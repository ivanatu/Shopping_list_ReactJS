import React from 'react';
import { shallow, render, mount } from 'enzyme';
import ReactDOM from 'react-dom' 
import renderer from 'react-test-renderer'
import Footer from '../components/footer'
import '../setupTests';

describe('<Footer/>', () => {
    const wrapper = shallow( <Footer/> );
    it('has a valid snapshot', () => {
        const component = renderer.create(
        <Footer />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        shallow(<Footer/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render <div> without throwing an error', () => {
        expect(wrapper.exists(<div/>))
    });
    it('should render <footer> tag without throwing an error', () => {
        expect(wrapper.exists(<footer className="fixed-bottom"/>))
    });
    it('should render <div> tag without throwing an error', () => {
        expect(wrapper.exists(<div className="container"/>))
    });
    it('should render <span> tag without throwing an error', () => {
        expect(wrapper.exists(<span className="navbar-text ml-auto"/>))
    });
});