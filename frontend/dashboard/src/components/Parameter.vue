<template>
  <div>
    <q-select :options="value.possible_values"
              color="black" class="" bg-color="white" :label="value.name" standout
              @popup-show="blockBottomBar"
              @update:model-value="newValue" v-model="optionChoosen" v-if="requiredAndPossibleValues"/>

    <q-input v-else v-model="optionChoosen" debounce="1000" filled class="q-pa-md" bg-color="white">
      <template v-slot:append>
        <q-btn icon="search" flat color="secondary" @click="forceSearch" round/>
      </template>
    </q-input>
  </div>
</template>

<script>

import EventBus from "app/eventBus";
import {ref} from "vue";

export default {
  name: "parameter",
  props: {
    value: {
      type: Object,
      required: true
    },
  },

  methods: {
    blockBottomBar() {
      EventBus.$emit('blockDefaultBehavior');
      return 0;
    },
    newValue() {
      console.log(this.optionChoosen.value);
      return this.blockBottomBar();
    },
    forceSearch() {
      const value = this.requiredAndPossibleValues ? this.optionChoosen.value : this.optionChoosen;
      this.$emit('change-parameter', {name: this.value.name, value: value});
    }
  },

  watch: {
    optionChoosen(newVal) {
      const value = this.requiredAndPossibleValues ? newVal.value : newVal;
      console.log(value);
      this.$emit('change-parameter', {name: this.value.name, value: value});
    }
  },

  mounted() {
    this.optionChoosen = this.value.possible_values[0] ?? "";
    const value = this.requiredAndPossibleValues ? this.optionChoosen.value : this.optionChoosen;
    console.log('value', value, this.optionChoosen);
    this.$emit('change-parameter', {name: this.value.name, value: value});
  },

  computed: {
    requiredAndPossibleValues() {
      return !!this.value.possible_values[0]
    }
  },

  setup(props) {
    const optionChoosen = ref("");

    return {
      optionChoosen
    }
  }
}
</script>
