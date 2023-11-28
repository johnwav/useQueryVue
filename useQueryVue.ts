// useQueryVue.ts

import { ref, onMounted, watch } from 'vue';

export const useQueryVue = (paramName: string, initialValue: string) => {
  const value = ref<string>('');

  onMounted(() => {
    // Initialize the value when the component is mounted
    const params = new URLSearchParams(window.location.search);
    value.value = params.get(paramName) || initialValue;
  });

  // Watch for changes in the value
  watch(value, (newVal) => {
    // Update the query parameter with the current value
    const params = new URLSearchParams(window.location.search);
    params.set(paramName, newVal);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  });

  return value;
};
