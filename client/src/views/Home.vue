<template>
  <div class=&quot;home&quot;>
    <set-name :name=&quot;name&quot; @set-name=&quot;onSetName&quot; @accept-name=&quot;onAcceptName&quot; />
    <large-button @click=&quot;onAcceptName&quot; text=&quot;Enter Lobby&quot; :is-disabled=&quot;!name&quot; />
  </div>
</template>

<script>
import LargeButton from './large-button';
import SetName from './set-name';


import { storeUserName, retrieveUserName } from '../state';

export default {
  name: 'home',

  data() {
    return {
      name: retrieveUserName()
    }
  },

  components: {
    SetName,
    LargeButton,
  },

  methods: {
    onSetName(name) {
      this.preventCreate = name.length === 0;
      this.name = name;
    },

    onAcceptName() {
      storeUserName(this.name);
      this.$router.push(`/lobby`);
    }
  }
};
</script>