import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import Error404 from "pages/Error404";

config.global.mocks.$q = {
  loading: {
    hide: () => {
    }
  },
  cookies: {
    set: () => {
    }
  },
  notify: () => {
  }
}

config.global.mocks.$api = {};

config.global.mocks.Cookies = {
  set: () => {
  }
};


const components = allComponents.push(Error404);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});


describe('Error404', () => {

  it('default behavior', async () => {
    const wrapper = shallowMount(Error404);

    expect(0).toEqual(0);
  });

});
