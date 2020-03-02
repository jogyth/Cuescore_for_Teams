<template>
  <div id="app" class="section">
    <!-- Lag navigering her -->
    <div v-if="this.$store.state.home">
      <my-challenges></my-challenges>
    </div>
    <my-footer></my-footer>
    
  </div>
</template>

<script>
import moment from 'moment' 
import axios from 'axios'
import data from './assets/data.js';
moment.locale('nb');

export default {
  data() {
    return {
    players: data.players,
    challenges: data.challenges,
    }
  },
  mounted (){    
    this.$store.state.loading = true;
    let promises = [];
    //let otherPromises = [];
    let arr1 = [];
    //let arr2 = [];

    // Challenges
    for (var i = 0; i < this.challenges.length; i++) {
      promises.push(
        axios     
          .get('https://api.cuescore.com/challenge/?id=' + this.challenges[i])
          .then(res => {
            console.log(res.data.challengeId);
            arr1.push(res.data); 
            })
      )
    }

    Promise.all(promises)      
      .then(() => {
        this.$store.state.csChallenges = arr1;
        this.$store.state.loading = false; 
        });

    // Players
/*     for (var y = 0; y < this.players.length; y++) {
      otherPromises.push(
        axios
          .get('https://api.cuescore.com/participant/?id=' + this.players[y])
          .then(res => {
            console.log(res.data);
            arr2.push(res.data);
          })
      )
    }

    Promise.all(otherPromises)
      .then(() => {
        this.$store.state.csPlayers = arr2;
      }); */
      
  }
}
</script>

<style>

</style>
