<template>
  <Tabs tab-position="top">
    <TabPane key="NEW" tab="Doanh thu">
      <Revenue />
    </TabPane>
  </Tabs>
</template>
<script setup lang="ts">
import { TabPane, Tabs } from "ant-design-vue";
import Revenue from "@comp/Revenue.vue";
</script>
