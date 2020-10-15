<template>
  <div class=&quot;set-name&quot;>
    <input type=&quot;text&quot; ref=&quot;input&quot;
      placeholder=&quot;Enter your name here&quot;
      :value=&quot;name&quot;
      @input=&quot;onInput&quot;
      @keydown=&quot;onKeyDown&quot; />
  </div>
</template>

<script>
export default {
  name: 'set-name',

  props: ['name'],

  methods: {
    onInput({ target: { value } }) {
      this.$emit('set-name', value.trim());
    },

    onKeyDown({ keyCode }) {
      if (keyCode === 13) {
        this.$emit('accept-name');
      }
    }
  },

  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<style scoped>
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
</style>