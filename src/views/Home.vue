<template>
  <div>
    <h1 class="title">Hjem</h1>
    <p>Vuex {{ $store.state.test }} </p>
    <p>{{ jonas }}</p>
    <p>{{ this.$store.state.dato }} = {{ moment(this.$store.state.dato).format('LLL') }}</p>
    <p>{{ this.$store.state.dato2 }} = {{ moment(this.$store.state.dato2).format('LLL') }}</p>
    <p> </p>
  </div>
</template>

<script>
import moment from 'moment' 
moment.locale('nb');

// @ is an alias to /src

export default {
  name: 'Hjem',
  components: {
    
  },
  data() {
    return {
      jonas: "... og vi returnerer data fra komponenten",
      moment: moment
    }
  }
}
</script>

<style scoped>

</style>
