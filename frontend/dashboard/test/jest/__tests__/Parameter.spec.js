import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import Parameter from "components/Parameter";

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


const components = allComponents.push(Parameter);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});


const SelectValue = {
  name: 'PaulLeCamé',
  possible_values: [
    {value: 'value1', label: 'label1'},
    {value: 'value2', label: 'label2'},
  ]
};

describe('Parameter', () => {
  it('select behavior', () => {
    const wrapper = shallowMount(Parameter, {
      props: {
        value: SelectValue
      }
    });
    const select = wrapper.find('q-select');

    expect(select.exists()).toBeTruthy();
  });

  it('input behavior', () => {
    const InputValue = {name: '', possible_values: []};

    const wrapper = shallowMount(Parameter, {
      props: {
        value: InputValue
      }
    });
    const input = wrapper.find('q-input');

    expect(input.exists()).toBeTruthy();
  });

  it('init value is given', async () => {
    const wrapper = shallowMount(Parameter, {
      props: {
        value: SelectValue
      }
    });
    const { vm } = wrapper;

    expect(vm.requiredAndPossibleValues).toBe(true);
    expect(vm.optionChoosen).toStrictEqual(SelectValue.possible_values[0]);
  });

  it('default behavior', async () => {
    const wrapper = shallowMount(Parameter, {
      props: {
        value: SelectValue
      }
    });
    const { vm } = wrapper;

    expect(vm.newValue()).toEqual(0);

    vm.forceSearch();
    expect(wrapper.emitted()['change-parameter'][0][0]).toEqual({name: SelectValue.name, value: 'value1'});
  });

  it('can change value', async () => {
    const wrapper = shallowMount(Parameter, {
      props: {
        value: SelectValue
      },
    });
    const { vm } = wrapper;

    vm.optionChoosen = SelectValue.possible_values[1];
    expect(wrapper.emitted()['change-parameter'][0]).toEqual(SelectValue.possible_values[1]);
  });
});
