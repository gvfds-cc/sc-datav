import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore("config", () => {
  const mapPlayComplete = ref(false);
  const cloud = ref(true);
  const bar = ref(true);
  const rotation = ref(true);
  const mode = ref(true);

  const toggle = (key: "cloud" | "bar" | "rotation" | "mode") => {
    switch (key) {
      case "cloud":
        cloud.value = !cloud.value;
        break;
      case "bar":
        bar.value = !bar.value;
        break;
      case "rotation":
        rotation.value = !rotation.value;
        break;
      case "mode":
        mode.value = !mode.value;
        break;
    }
  };

  const reset = () => {
    mapPlayComplete.value = false;
    cloud.value = true;
    bar.value = true;
    rotation.value = true;
    mode.value = true;
  };

  return {
    mapPlayComplete,
    cloud,
    bar,
    rotation,
    mode,
    toggle,
    reset,
  };
});