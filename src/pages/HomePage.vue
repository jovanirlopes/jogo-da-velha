<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-between q-my-lg">
      <div
        class="col text-center"
        v-for="p in player.players"
        v-bind:key="p.id"
      >
        <q-chip
          v-if="p.id === 1"
          color="purple"
          text-color="white"
          icon="person"
          size="lg"
          outline
        >
          {{ p.name }} - {{ p.points }}
        </q-chip>
        <q-chip
          v-else
          color="yellow-9"
          text-color="white"
          icon-right="person"
          size="lg"
          outline
        >
          {{ p.points }} - {{ p.name }}
        </q-chip>
      </div>
    </div>
    <div
      v-for="(row, rowIndex) in table.map"
      v-bind:key="rowIndex"
      class="row justify-center"
    >
      <div
        v-for="(col, colIndex) in row"
        v-bind:key="colIndex"
        class="col-xs-4 col-md-2 col-sm-2"
      >
        <q-card bordered @click="player.playerMove(rowIndex, colIndex)">
          <q-card-section style="height: 125px">
            <q-icon v-if="col === 1" name="o_circle" size="85px" />
            <q-icon v-if="col === 2" name="o_square" size="85px" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <winner-message />

    <q-btn
      rounded
      label="zerar"
      size="lg"
      color="grey-7"
      @click="player.playerReset()"
      class="q-mt-xl full-width justify-between"
      outline
    >
      <q-btn
        color="negative"
        icon="restart_alt"
        round
        size="sm"
        class="q-ml-sm"
      />
    </q-btn>
    <!-- <winner-message /> -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useTableStore } from '../stores/table';
import { usePlayerStore } from '../stores/player';
import winnerMessage from 'src/components/winnerMessage.vue';
export default defineComponent({
  name: 'HomePage',
  components: {
    winnerMessage,
  },
  setup() {
    const table = useTableStore();
    const player = usePlayerStore();
    onMounted(() => table.mountMap());
    onMounted(() => player.preparePlayers());
    const columns = [
      { name: 'name', label: 'Jogador', field: 'name' },
      { name: 'points', label: 'Pontuação', field: 'points' },
    ];
    return {
      table,
      player,
      columns,
    };
  },
});
</script>
