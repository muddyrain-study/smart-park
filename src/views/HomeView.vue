<template>
  <div class="home">
    <Scene :eventList="eventList" />
    <!-- <BigScreen :dataInfo="dataInfo" :eventList="eventList" /> -->
  </div>
</template>

<script setup>
import Scene from "@/components/scene.vue";
import BigScreen from "@/components/BigScreen.vue";
import { onMounted, reactive, ref } from "vue";
import gsap from "gsap";
import { getSmartCityList, getSmartCityInfo } from "@/api/api";

const dataInfo = reactive({
  iot: { number: 0 },
  event: { number: 0 },
  power: { number: 0 },
  test: { number: 0 },
});

onMounted(() => {
  changeInfo();
  getEventList();
  setInterval(() => {
    changeInfo();
    getEventList();
  }, 10000);
});
const changeInfo = async () => {
  const res = await getSmartCityInfo();
  for (let key in dataInfo) {
    const { number, ...after } = res.data.data[key];
    dataInfo[key] = { ...dataInfo[key], ...after };
    gsap.to(dataInfo[key], {
      number,
      duration: 2,
    });
  }
};

const eventList = ref([]);
const getEventList = async () => {
  let result = await getSmartCityList();
  eventList.value = result.data.list;
  // console.log(result.data.list);
};
</script>
