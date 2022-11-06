<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Footer -->
    <!-- <q-footer class="bg-white" bordered>
      <q-tabs switch-indicator class="text-primary">
        <q-route-tab to="/" replace exact>
          <q-icon name="o_sports_esports" size="md" />
        </q-route-tab>
        <q-route-tab to="/ranking" replace exact>
          <q-icon name="o_stars" size="md" />
        </q-route-tab>
        <q-route-tab to="/profile" replace exact>
          <q-icon name="o_person" size="md" />
        </q-route-tab>
      </q-tabs>
    </q-footer> -->

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  // name: 'LayoutName',

  setup() {
    const leftDrawer = ref(false);
    return { leftDrawer };
  },
});
</script>
