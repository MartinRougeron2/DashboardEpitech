import {describe, expect, it} from '@jest/globals';
import {installQuasarPlugin} from '@quasar/quasar-app-extension-testing-unit-jest';
import {mount, shallowMount, config} from '@vue/test-utils';
import {allComponents, allDirectives} from "app/test/utils";
import pageIndex from '../../../src/pages/Index.vue';

config.global.mocks.$q = {
  loading: {
    show: () => {
    },
    hide: () => {
    }
  },
  cookies: {
    set: () => {
    },
    get: () => {
    },
    remove: () => {
    }
  },
  notify: () => {
  }
}

async function a() {
  return null;
}

config.global.mocks.$api = {
  get: a,
  post: a
};

config.global.mocks.Cookies = {
  set: () => {
  },
  get: () => {
  }
};

const components = allComponents.push(pageIndex);

installQuasarPlugin({components: components, directives: allDirectives});


describe('index', () => {

  it('dummy', async () => {
    const wrapper = shallowMount(pageIndex);
    const { vm } = wrapper;

    vm.widgetAdd({}, '');
    vm.removeWidget();
    vm.sendUsernameToLayout({name: 'Paul', id: 'id', widgets: []});
    expect(vm.id).toEqual('id');
    expect(vm.needToBeLogged).toBeFalsy();
  })

  it('loginAuto', async () => {
      const wrapper = shallowMount(pageIndex);
      const { vm } = wrapper;

      vm.loginAuto();
  })


  it('widget add', async () => {
    const wrapper = shallowMount(pageIndex);
    const {vm} = wrapper;

    vm.widgetAdd();
  })

  it('widget remove', async () => {
    const wrapper = shallowMount(pageIndex);
    const {vm} = wrapper;

    vm.removeWidget();
  })

  it('username to layout', async () => {
    const wrapper = shallowMount(pageIndex);
    const {vm} = wrapper;

    const mockInfo = {
      name: "PaulLeCamé",
      id: "PaulLeCaméID",
      widgets: [
        {
          _id: "1",
          widget: {
            _id: "widget1",
            service: []
          },
          service: []
        },
        {
          _id: "2",
          widget: {
            _id: "widget2",
            service: []
          },
          service: []
        }
      ]
    }
    await vm.sendUsernameToLayout(mockInfo);


    expect(vm.id).toEqual("PaulLeCaméID");
    expect(vm.needToBeLogged).toBeFalsy();
    vm.showBottomBar();
    expect(vm.widgets).toEqual([{"_id": "1", "service": []}, {"_id": "2", "service": []}]);
  })

  // it('send emit', async () => {
  //     const wrapper = shallowMount(pageIndex);
  //     const { vm } = wrapper;

  //     vm.$emit('displayLoginForm', false);

  //     await wrapper.vm.$nextTick();

  //     expect(wrapper.emitted().displayLoginForm).toBeTruthy();
  //     expect(vm.needToBeLogged).toBeFalsy();


  // vm.$emit('addWidget', { service: { widgets: [] } });
  // vm.$emit('removeWidget', { service: { widgets: [] } });

  // })
})
