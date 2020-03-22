<template>
  <div>
    <!-- Lag navigering her -->
    <navigasjon></navigasjon>
    <div v-if="this.$store.state.home">
      <my-challenges></my-challenges>
    </div>
    <div v-if="this.$store.state.ranking">
      <my-ranking></my-ranking>
    </div>
    <div v-if="this.$store.state.tournaments">
      <my-tournaments></my-tournaments>
    </div>
    <my-footer></my-footer>
    
  </div>
</template>

<script>
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB4z2Rrh4O9Lp4k7iRdDViGHd_nJw41t5U",
  authDomain: "biljardapp.firebaseapp.com",
  databaseURL: "https://biljardapp.firebaseio.com",
  projectId: "biljardapp",
  storageBucket: "biljardapp.appspot.com",
  messagingSenderId: "369715482817",
  appId: "1:369715482817:web:0020aee677e733c1728440"
};

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);
import Firebase from 'firebase'
const db = Firebase.firestore();

import moment from 'moment' 
import axios from 'axios'
moment.locale('nb');

export default {
  data() {
    return {
    //players: data.players,
    db_players: [],
    loaded: false
    }
  },   
  firestore: {
    db_players: db.collection('players'),
    db_challenges: db.collection('challenges')
  }, 
  created() {
    // this unbinds any previously bound reference
    this.$bind('players', db.collection('players')).then(players => {
      this.db_players === players      
      //this.$unbind('todos')
    })   
  },  
  mounted (){    
    this.$store.state.loading = true;
    let otherPromises = [];
    let arr2 = [];
  
    // Players
    for (var y = 0; y < this.players.length; y++) {
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
      });

      
  },
}  
  
</script>

