import { defineStore } from 'pinia';
import { useTableStore } from './table';

export interface PlayerInfo {
  id: number;
  name: string;
  points: number;
}

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      playrCount: 2,
      players: [] as PlayerInfo[],
      currentPlayer: {} as PlayerInfo,
      winner: {} as PlayerInfo,
      haveWinner: false,
    };
  },
  actions: {
    preparePlayers() {
      for (let i = 0; i < this.playrCount; i++) {
        this.players.push({ id: i + 1, name: 'Player' + (i + 1), points: 0 });
      }
      this.currentPlayer = this.players[0];
    },

    setCurrentPlayer(player: PlayerInfo) {
      this.currentPlayer = player;
    },

    alternatNextPlayer() {
      const nextPlayer: PlayerInfo[] = this.players.filter(
        (player) => player.id === this.currentPlayer.id + 1
      );
      if (nextPlayer.length > 0) {
        this.setCurrentPlayer(nextPlayer[0]);
      } else {
        this.setCurrentPlayer(this.players[0]);
      }
    },
    playerMove(row: number, col: number) {
      const table = useTableStore();
      if (!this.winner.id) {
        if (table.map[row][col] === table.default) {
          table.updateMap(row, col, this.currentPlayer.id);
          const playerId = table.checkTheWinnerForMap();
          if (playerId) {
            this.players[playerId - 1].points += 1;
            this.winner = this.players[playerId - 1];
            this.haveWinner = true;
          } else {
            this.alternatNextPlayer();
          }
        }
      }
    },
    playerReset() {
      const table = useTableStore();
      this.winner = {} as PlayerInfo;
      this.players.map((p) => (p.points = 0));
      table.mountMap();
    },
    nextGame() {
      const table = useTableStore();
      table.mountMap();
      this.haveWinner = false;
      this.winner = {} as PlayerInfo;
    },
  },
});
