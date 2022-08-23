import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import loginCard from '../../../src/components/LoginCard';
import {allComponents, allDirectives} from "app/test/utils";

config.global.mocks.$q = {
  loading: {
    hide: () => {},
    show: () => {}
  },
  cookies: {
    set: () => {}
  },
  notify: () => {}
}

config.global.mocks.$api = {
  post: () => {}
};

config.global.mocks.Cookies = {
  set: () => {
  }
};


const components = allComponents.push(loginCard);

// Specify here Quasar config you'll need to test your component
installQuasarPlugin({components: components, directives: allDirectives});


describe('LoginCard', () => {
  it('has 2 login methods, google and ours', () => {
    const wrapper = shallowMount(loginCard);
    const {vm} = wrapper;

    expect(typeof vm.loginWithGoogle).toBe('function');
    expect(typeof vm.auth).toBe('function');
  });

  it('can auth', async () => {
    const wrapper = shallowMount(loginCard);
    const {vm} = wrapper;

    const req = {
      status: 200,
      data: 'PaulLeCamé'
    }

    await vm.auth(req);

    expect(wrapper.emitted().login).toBeTruthy();
    expect(wrapper.emitted().login[0]).toEqual(['PaulLeCamé']);
    await vm.auth(undefined);
    await vm.auth(null);
    req.status = 500;
    await vm.auth(req);
  });

  it('can logout', async () => {
    const wrapper = mount(loginCard);
    const loginWithGoogle = wrapper.find('.sign-with-google');
    const loginWithUs = wrapper.find('.login_submit');

    expect(loginWithGoogle.exists()).toBeTruthy();
    expect(loginWithUs.exists()).toBeTruthy();
  });

  it('on form submit signup', async () => {
    const wrapper = shallowMount(loginCard);
    const {vm} = wrapper;

    vm.usernameRef = {
      resetValidation: () => {},
      validate: () => {}
    }
    vm.passwordRef = {
      resetValidation: () => {},
      validate: () => {}
    }

    vm.emailRef = {
      resetValidation: () => {},
      validate: () => {}
    }
    vm.tab = "signup";
    vm.onSubmit();

  })

  it('on form submit other', async () => {
    const wrapper = shallowMount(loginCard);
    const {vm} = wrapper;

    vm.usernameRef = {
      resetValidation: () => {},
      validate: () => {}
    }
    vm.passwordRef = {
      resetValidation: () => {},
      validate: () => {}
    }

    vm.emailRef = {
      resetValidation: () => {},
      validate: () => {}
    }

    vm.tab = ""
    vm.onSubmit();
  })
});
