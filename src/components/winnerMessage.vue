<template>
  <q-dialog v-model="player.haveWinner" persisten seamless full-width>
    <q-card>
      <q-card-section
        :class="
          player.winner.id === 1
            ? 'bg-purple text-white text-center'
            : 'bg-yellow-9 text-white text-center'
        "
      >
        Vencedor
      </q-card-section>
      <q-card-section
        :class="
          player.winner.id === 1
            ? 'text-purple text-center'
            : 'text-yellow-9 text-center'
        "
      >
        <q-icon name="workspace_premium" size="xl" />{{ player.winner.name }}
        você venceu!!!
      </q-card-section>
      <q-card-section class="text-grey text-center">
        Proxima partida começa em {{ timeCountdown }}...
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { usePlayerStore } from 'src/stores/player';

export default defineComponent({
  // name: 'ComponentName'
  setup(props, ctx) {
    const player = usePlayerStore();
    let timeCountdown = ref(3);
    const countdown = () => {
      if (timeCountdown.value > 0) {
        setTimeout(() => timeCountdown.value--, 1000);
      } else {
        player.nextGame();
        timeCountdown.value = 3;
      }
    };
    watchEffect(() => {
      if (player.haveWinner) {
        countdown();
      }
    });
    return {
      player,
      timeCountdown,
    };
  },
});
</script>
