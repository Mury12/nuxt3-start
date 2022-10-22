<template>
  <div class="selector-wrapper d-flex justify-content-around">
    <div @click="toggle">
      <slot>
        <BButton variant="outline-info">Select an Item</BButton>
      </slot>
    </div>
    <transition name="fade" mode="out-in">
      <div
        class="options-wrap py-3 px-4 rounded shadow bg-white"
        :class="{ show: isOpen }"
        v-if="isOpen"
        :key="String(isOpen)"
      >
        <CloseButton @click="toggle" />

        <div class="pb-3 pt-2">
          <h5>{{ title }}</h5>
          <input v-model="search" />
        </div>
        <BRow class="row-gap-md options-body" @scroll="onScrollLoadMore">
          <BCol
            class="option-item"
            cols="12"
            v-for="(item, index) in showing"
            :key="index"
          >
            <DynamicSelectItem
              @click="emitOption(item.id)"
              :active="selected.includes(item.id)"
              :item="item"
              :fields="fields"
            />
          </BCol>
          <BCol
            cols="12"
            class="option-item text-center"
            v-if="showing.length < filtered.length"
          >
            <Loading />
          </BCol>
        </BRow>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { DynamicSelectorField } from "~~/types";
import { debounce } from "@/util/debounce";

const { options, fields, title, selected } = defineProps<{
  options: any[];
  fields: DynamicSelectorField<any>;
  title: string;
  selected: number[];
}>();
function sort(opts: typeof options) {
  return opts.sort((a, b) => (a[fields.label] < b[fields.label] ? -1 : 1));
}

const { isOpen, toggle } = useDisclosure();

const search = ref<string>("");
const filtered = ref<typeof options>(sort(options));
const showing = ref<typeof options>([]);
const currentPage = ref(0);
const perPage = 10;

const setShowing = (array?: typeof options) => {
  const [la, lb] = [showing.value.length, filtered.value.length];
  const toGet = array ?? filtered.value;
  if (la < lb) {
    showing.value.push(
      ...toGet.slice(perPage * currentPage.value, perPage + la)
    );
    currentPage.value++;
  }
};

function onScrollLoadMore(e) {
  const { scrollTop, scrollHeight } = e.target;
  const threshold = scrollHeight - scrollHeight / 4;
  if (scrollTop >= threshold) {
    debounce(setShowing, 250);
  }
}

onMounted(() => {
  nextTick(() => {
    setShowing();
  });
});

function filter() {
  filtered.value = sort(
    options.filter((o) =>
      o[fields.label].toLowerCase().includes(search.value.toLowerCase())
    )
  );
}

watch(filtered, (n) => {
  showing.value = [];
  currentPage.value = 0;
  setShowing(n);
});

watch(search, (n) => {
  if (n.length) debounce(filter, 50);
  else filtered.value = sort(options);
});

const emit = defineEmits<{
  (e: "select", idx: number): void;
  (e: "remove", idx: number): void;
}>();

function emitOption(idx: number) {
  const hasIdx = selected.indexOf(idx);
  if (~hasIdx) {
    emit("remove", idx);
  } else {
    emit("select", idx);
  }
}
</script>

<style scoped>
.options-wrap {
  position: fixed;
  top: 4em;
  display: none;
  width: 480px;
}
.options-body {
  overflow-y: auto;
  max-height: 40vh;
}
.option {
  min-height: 100px;
}

.selector-wrapper {
  transition: 200ms ease-in-out;
  top: 0;
  left: 0;
}
.show {
  display: initial;
}

.option-item {
  height: fit-content;
}
</style>
