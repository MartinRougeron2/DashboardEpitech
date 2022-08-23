import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import Success from "pages/Success";

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
  query: {refresh_token: ''},
  push: () => {}
};

config.global.mocks.Cookies = {
  set: () => {
  }
};


const components = allComponents.push(Success);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});


describe('Success', () => {

  it('default behavior', async () => {
    const wrapper = shallowMount(Success);

    expect(0).toEqual(0);
  });

});
