import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import WidgetArea from "components/WidgetArea";

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
  get: () => {}
};

config.global.mocks.Cookies = {
  set: () => {
  }
};


const components = allComponents.push(WidgetArea);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});

describe('WidgetArea', () => {
  it('dummies', async () => {
    const wrapper = shallowMount(WidgetArea);
    const { vm } = wrapper;

    vm.getAllWidgets();
    expect(0).toEqual(0);
  });

});
