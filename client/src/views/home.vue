<template>
  <div class="home">
    <div class="set-name">
      <form @submit.prevent="playGame">
        <input type="text" ref="input"
          placeholder="Enter your name here"
          v-model="name"
          autofocus
        />
        <div :class="{ 'large-button': true }">
          <button type="submit" :disabled="name.length ? false : true">Enter Game</button>
        </div>
        <div class="d-flex align-items-center justify-content-center" >
            <img src="./assets/50937245_60x60.gif" style="max-width: 30%" alt="img" class="img-fluid">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    players () {
      return this.$store.state.players
    }
  },
  methods: {
    playGame () {
      console.log(this.name)
      this.$socket.emit('userConnect', this.name)
      localStorage.setItem('name', this.name)
      this.$router.push('/game')
    }
  }
}
</script>

<style>
.set-name {
  display: block;
}
input {
  border: none;
  outline: none;
  text-align: center;
  line-height: 36px;
  color: #f7f7f7;
  background-color: rgba(0, 0, 0, 0.2);
}
input::placeholder {
  color: #e7e7e7;
}
input:focus::placeholder {
  color: rgba(255, 255, 255, 0.15);
}

button {
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  font-weight: 500;
  outline: none;
  color: #f7f7f7;
  background-color: #73021B;
}
.large-button {
  margin-top: 40px;
}
.large-button button[disabled] {
  color: #27627F;
  background-color: #003D50;
  opacity: 0.5;
}
.large-button button:not([disabled]) {
  cursor: pointer;
}
.large-button button:not([disabled]):hover {
  color: #FEC500;
}
.large-button button:not([disabled]):active {
  color: #001824;
  background-color: #FEC500;
}
</style>
