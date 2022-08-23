import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import WidgetCard from "components/WidgetCard";

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


const components = allComponents.push(WidgetCard);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});


const Data = {
  widget: {
    loaded: true,
    description: "PaulLeCamé"
  }
};

describe('WidgetCard', () => {
  it('dummy', () => {
    const wrapper = shallowMount(WidgetCard, {
      props: Data
    });
    const { vm } = wrapper;
    vm.addWidgets();
    expect(vm.loading).toEqual(false);
    expect(vm.addMode).toEqual(false);
    vm.changeRefreshRateF();
    expect(vm.changeRefreshRate).toBeFalsy();
  });
});
