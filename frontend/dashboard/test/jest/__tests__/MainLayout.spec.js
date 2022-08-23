import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, shallowMount, config } from '@vue/test-utils';
import { allComponents, allDirectives } from "app/test/utils";
import MainLayout from '../../../src/layouts/MainLayout.vue';

config.global.mocks.$q = {
    loading: {
        hide: () => { }
    },
    cookies: {
        set: () => { },
        remove: () => { }
    },
    notify: () => { }
}

config.global.mocks.$api = {};

config.global.mocks.Cookies = {
    set: () => {
    }
};

const components = allComponents.push(MainLayout);

installQuasarPlugin({ components: components, directives: allDirectives });


describe('MainLayout', () => {

    it('display login button or email', async () => {
        const wrapper = shallowMount(MainLayout);
        const { vm } = wrapper;
        vm.logout();

        expect(vm.username).toEqual('');
    })


    it('hide bar', async () => {
        const wrapper = shallowMount(MainLayout);
        const { vm } = wrapper;

        vm.hideBar();
        expect(vm.selectWidgets).toBeFalsy();


        vm.selectWidgetsByGoogle = true
        vm.selectWidgets = true
        vm.hideBar();
        expect(vm.selectWidgets).toBeTruthy();

        vm.selectWidgetsByGoogle = false
        vm.selectWidgets = true
        vm.hideBar();
        expect(vm.selectWidgets).toBeFalsy();

        vm.displayLoginForm();
    })


})
