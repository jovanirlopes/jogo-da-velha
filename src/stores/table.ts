import { defineStore } from 'pinia';

export const useTableStore = defineStore('table', {
  state: () => {
    return {
      size: 3,
      map: [] as number[][],
      default: 0,
      result: [] as number[][],
    };
  },
  actions: {
    mounteCols() {
      const cols: number[] = [];
      for (let i = 0; i < this.size; i++) {
        cols.push(this.default);
      }
      return cols;
    },

    mountMap() {
      this.map = [];
      for (let i = 0; i < this.size; i++) {
        this.map.push(this.mounteCols());
      }
    },

    updateMap(row: number, col: number, playerId: number) {
      this.map[row][col] = playerId;
    },

    organizeDiag(): number[][] {
      const organizedDiag1: number[] = [];
      const organizedDiag2: number[] = [];
      for (let row = 0; row < this.size; row++) {
        organizedDiag1.push(this.map[row][row]);
        organizedDiag2.push(this.map[row][this.size - row - 1]);
      }
      return [organizedDiag1, organizedDiag2];
    },

    organizeCols() {
      let organizedCols: number[] = [];
      const organizeArray: number[][] = [];
      for (let col = 0; col < this.size; col++) {
        for (let row = 0; row < this.size; row++) {
          organizedCols.push(this.map[row][col]);
        }
        organizeArray.push(organizedCols);
        organizedCols = [];
      }
      return organizeArray;
    },

    checkMapDefault(arr: number[]) {
      return arr.every((element) => element !== this.default);
    },

    checkMapPlayerId(arr: number[]) {
      return arr.every((element) => element === arr[0]);
    },

    checkPlayerIDWinner() {
      for (let i = 0; i < this.result.length; i++) {
        if (this.checkMapDefault(this.result[i])) {
          if (this.checkMapPlayerId(this.result[i])) {
            return this.result[i][0];
          }
        }
      }
    },

    checkTheWinnerForMap() {
      this.result = this.map
        .concat(this.organizeCols())
        .concat(this.organizeDiag());
      return this.checkPlayerIDWinner();
    },
  },
});
