<template>
  <div class="inline-flex items-center justify-center gap-2">
    <button
      type="button"
      :disabled="disable"
      class="select-none rounded-md border px-2 flex items-center hover:opacity-70 active:text-blue-600 transition-all duration-300 py-1 h-[30px]"
      @click="minus"
    >
      <MinusIcon class="w-4 h-4" />
    </button>
    <InputNumber
      :disabled="disable"
      class="w-12"
      :value="number"
      type="number"
      :controls="false"
      @change="handleChange"
    ></InputNumber>

    <button
      type="button"
      :disabled="disable"
      class="select-none rounded-md border px-2 flex items-center hover:opacity-70 active:text-blue-600 transition-all duration-300 py-1 h-[30px]"
      @click="plus"
    >
      <PlusIcon class="w-4 h-4" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { InputNumber } from "ant-design-vue";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";
import { ValueType } from "ant-design-vue/es/input-number/src/utils/MiniDecimal";
import { defineProps } from "vue";

const props = defineProps<{
  number: ValueType;
  handleChange: (value: ValueType) => void;
  disable?: boolean;
}>();

function minus() {
  if (props.disable || props.number == 0) return;
  const valueMinus = Number.parseInt(props.number.toString()) - 1;
  props.handleChange(valueMinus);
}

function plus() {
  if (props.disable || Number.parseInt(props.number.toString()) >= 20) return;
  const valueMinus = Number.parseInt(props.number.toString()) + 1;
  props.handleChange(valueMinus);
}
</script>