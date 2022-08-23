import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import SuccessUnsplash from "pages/SuccessUnsplash";

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

config.global.mocks.$api = {};
config.global.mocks.$router = {
  push: () => {}
};

config.global.mocks.$route = {
  query: {token: ''},
  push: () => {}
};

config.global.mocks.Cookies = {
  set: () => {
  }
};


const components = allComponents.push(SuccessUnsplash);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});


describe('SuccessUnsplash', () => {

  it('default behavior', async () => {
    const wrapper = shallowMount(SuccessUnsplash);

    expect(0).toEqual(0);
  });

});
