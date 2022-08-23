import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import WidgetData from "components/WidgetData";

config.global.stubs = allComponents;
config.global.mocks.$q = {
  loading: {
    hide: () => {
    }
  },
  cookies: {
    set: () => {
    },
    get: () => {
    }
  },
  notify: () => {
  }
}

config.global.mocks.$api = {
  get: () => {
  }
};

config.global.mocks.Cookies = {
  set: () => {
  }
};


const components = allComponents.push(WidgetData);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});


const Data = {
  routeName: "",
  refreshRate: 100_000,
  id: 'a1',
  parameters: [{param: {required: true, name: '', value: ''}, possible_values: [{name: '', value: ''}]}]
};

describe('WidgetData', () => {
  it('loading at init', () => {
    const wrapper = shallowMount(WidgetData, {
      props: Data
    });
    const loading = wrapper.find('q-spinner');

    expect(loading.exists()).toBeTruthy();
  });

  it('dummies', async () => {
    const wrapper = shallowMount(WidgetData, {
      props: Data
    });
    const { vm } = wrapper;

    expect(vm.blockBottomBar()).toEqual(0);
    await vm.addParameter({name: 'paul', value: 'value1'});
    vm.removeWidget();
    await vm.addParameter();
    console.log('vm.options', vm.options);
    expect(vm.options['paul']).toEqual('value1');
    vm.removeWidget();
  });

  it('api gets', async () => {
    const wrapper = shallowMount(WidgetData, {
      props: Data
    });
    const { vm } = wrapper;

    vm.getWidgetData();
  });
});
