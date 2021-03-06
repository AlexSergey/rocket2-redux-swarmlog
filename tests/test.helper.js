import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../src/store';

function renderComponent(ComponentClass, props = {}) {
    const componentInstance =  <Provider store={store} key="provider">
        <ComponentClass {...props} />
    </Provider>;

    return mount(componentInstance);
}

export {renderComponent, expect};