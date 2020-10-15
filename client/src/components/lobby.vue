<template>
  <div class=&quot;lobby&quot;>
    <div class=&quot;games-list&quot;>
      <ul v-if=&quot;games.length > 0&quot;>
        <li v-for=&quot;game in games&quot;><a :href=&quot;`/${game.gameId}`&quot;>Enter game versus {{ game.name }}</a></li>
      </ul>
      <div v-if=&quot;games.length === 0&quot;>There are no other games to join at the moment.</div>
    </div>
    <large-button @click=&quot;onCreateGame&quot; text=&quot;Create Game&quot; :is-disabled=&quot;false&quot; />
  </div>
</template>

<script>
import LargeButton from './large-button';
import { enterLobby } from '../state';

// A handy npm package that lets us generate random a id when creating a game.
// The game id is appended to the URL, and matches the last route.
import generate from 'nanoid/generate';

export default {
  name: 'lobby',

  data() {
    return {
      games: []
    }
  },

  components: {
    LargeButton
  },

  methods: {
    onCreateGame() {
      const gameId = generate('0123456789abcdefghijklmnopqrstuvwxyz', 8);
      this.$router.push(`/${gameId}`);
    },

    onGamePending(clientId, game) {
      const index = this.games.findIndex(g => g.clientId === clientId);
      if (!game &amp; &amp; index !== -1) {
        this.games.splice(index, 1);
      }
      else if (game &amp;&amp; index === -1) {
        this.games.push({ clientId, ...game });
      }
    }
  },

  mounted() {
    enterLobby(this.onGamePending.bind(this));
  }
};
</script>

<style scoped>
.games-list {
  padding: 20px;
  color: #27627F;
  background-color: #011018;
}
ul {
  margin: 0;
  padding: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  list-style-type: none;
}
li a {
  display: block;
  color: #FEC500;
}
</style>