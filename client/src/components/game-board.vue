<template>
  <div class="game-board">
    <div class="cell" v-for="(board, index) in boards" :key="index" @click="onClickCell(index)">{{board}}</div>
  </div>
</template>

<script>
export default {
  name: 'game-board',
  props: ['isActive'],
  computed: {
    currentPlayer () {
      return this.$store.state.players.filter((player) => player.name === localStorage.name)[0]
    },
    otherPlayer () {
      return this.$store.state.players.filter((player) => player.name !== localStorage.name)[0]
    },
    position () {
      return this.$store.state.position
    }
  },
  data () {
    return {
      boards: ['', '', '', '', '', '', '', '', '']
    }
  },
  watch: {
    position () {
      let value = ''
      if (this.isActive) value = this.currentPlayer.symbol
      else value = this.otherPlayer.symbol
      const newBoard = [...this.boards]
      newBoard[this.position] = value
      this.boards = newBoard
    }
  },
  methods: {
    onClickCell (position) {
      if (this.isActive && this.boards[position] === '') {
        this.$socket.emit('setPosition', position)
      }
    }
  }
}
</script>

<style>
.game-board {
  display: inline-grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  width: 200px;
  height: 200px;
  font-size: 48px;
}

.cell {
  border: 2px solid white;
}
</style>
