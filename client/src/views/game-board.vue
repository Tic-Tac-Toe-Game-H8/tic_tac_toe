<template>
  <div :class=&quot;{ 'game-board': true, 'game-board--interactive': interactive }&quot;>
    <template v-for=&quot;(state, position) in board&quot;>
      <game-board-cell
        :position=&quot;position&quot;
        :state=&quot;state&quot;
        :final=&quot;winningState &amp;&amp; winningState.includes(position) &amp;&amp; (isWinner ? 'win' : 'loss')&quot;
        :key=&quot;position&quot;
        @select-cell=&quot;onClickCell&quot; />
    </template>
  </div>
</template>

<script>
import GameBoardCell from './game-board-cell';

export default {
  name: 'game-board',
  props: ['board', 'winningState', 'interactive', 'isWinner'],

  components: {
    GameBoardCell,
  },

  methods: {
    onClickCell(position) {
      if(this.interactive) {
        this.$emit('select-position', position);
      }
    }
  }
};
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
</style>