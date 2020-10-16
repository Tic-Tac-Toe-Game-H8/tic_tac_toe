<template>
  <div class="game">
    <div class="game__board" v-if="turn !== null">
      <div class="game__other-player-name">Your Name: {{currentPlayer.name}}</div>
      <GameBoard :isActive="isMyTurn" />
      <div class="game__turn">{{ currentTurn }}</div>
    </div>
    <div class="game__waiting" v-else>
      <div class="game__waiting-message" v-if="players.length === 1">Waiting for an opponent...</div>
    </div>
      <div class="d-flex align-items-center justify-content-center" >
            <img src="../assets/g2olbqf.gif" style="max-width: 30%" alt="img" class="img-fluid">
        </div>
  </div>
</template>

<script>
import GameBoard from '../components/game-board'
import Swal from 'sweetalert2'
export default {
  name: 'game',
  components: {
    GameBoard
  },
  computed: {
    isMyTurn () {
      if (this.$store.state.turn) return this.$store.state.turn.name === localStorage.name
      else return false
    },
    players () {
      return this.$store.state.players
    },
    turn () {
      return this.$store.state.turn
    },
    currentPlayer () {
      return this.$store.state.players.filter((player) => player.name === localStorage.name)[0]
    },
    otherPlayer () {
      return this.$store.state.players.filter((player) => player.name !== localStorage.name)[0]
    },
    winner () {
      return this.$store.state.winner
    },
    currentTurn () {
      return this.isMyTurn ? 'It\'s your turn' : `Waiting for ${this.otherPlayer.name} to make a move`
    },
    draw () {
      return this.$store.state.draw
    }
  },
  watch: {
    winner (winner) {
      if (this.currentPlayer.name === winner.name) {
        Swal.fire({
          title: 'YOU WIN!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.commit('RESET_GAME')
            this.$router.push('/')
          }
        })
      } else {
        Swal.fire({
          title: 'YOU LOSE NOOB!',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.commit('RESET_GAME')
            this.$router.push('/')
          }
        })
      }
    },
    draw() {
      if (this.draw) {
        Swal.fire({
          title: 'DRAW!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.commit('RESET_GAME')
            this.$router.push('/')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.game {
  display: flex;
  justify-content: center;
}
.game__turn {
  margin-top: 40px;
}
.game__waiting-message {
  margin: 20px;
  color: #27627F;
}
.game__other-player-name {
  margin-bottom: 40px;
}
</style>
