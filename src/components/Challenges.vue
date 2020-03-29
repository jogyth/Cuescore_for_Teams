<template>
  <div class="section">
    <h1 class="title">Challenges</h1>
    <p class="is-size-5">Oversikt over "challenges" spilt av klubbmedlemmer og registrert på denne siden - nyeste øverst. Challenges må manuelt registreres her. Summen av challenges danner grunnlag for rankingen. </p>
    <hr>
    <div class="columns">
      <div class="column is-two-thirds is-full-mobile">
<!--         <div v-if="!loaded">
          <p>Loading></p>
        </div> -->
        <b-loading :is-full-page="true" :active.sync="!this.loaded" :can-cancel="true"></b-loading>

        <div v-if="loaded">
          <h2 class="title is-size-4">2020</h2>
          <div class="table-container">
            <table class="table is-bordered is-hoverable is-narrow-mobile is-large">
                <thead>
                    <th class="is-warning">Tid</th>
                    <th class="is-warning">Disiplin</th>
                    <th class="is-warning">Challenge</th>
                    <th class="is-warning">Først til</th>
                    <th class="is-warning">Resultat</th>   
                    <th class="is-warning">Lenke</th>             
                </thead>
                <tr v-for="(item, index) in this.$store.state.csChallenges"  :key="index">                
                    <td><small>{{ moment(item.starttime).format('DoMM - H:mm') }}</small></td>
                    <td>{{ item.disciplineName }}</td>
                    <td><a v-bind:href="item.match.playerA.url" target="_blank">{{ item.match.playerA.name }}</a> - <a v-bind:href="item.match.playerB.url" target="_blank">{{ item.match.playerB.name }}</a> </td>
                    <td align="center">{{ item.match.raceTo }}</td>
                    <td align="center">{{ item.match.scoreA }} - {{ item.match.scoreB }}</td>     
                    <td><a v-bind:href="item.url" target="_blank">Detaljer</a></td>
                </tr>
            </table>
          </div>
        </div>
        <div class="image">
          <img src="../assets/images/cue.png" style="margin-top:50px;width:420px;" />
        </div>
      </div>
        <div class="column is-one-third is-full-mobile">
          <h2 class="title is-size-4" style="margin-left:75px;">
            Oppdater
          </h2>         
          <input 
            type="number"
            class="input" 
            placeholder="Challenge ID"
            v-model="newChallenge"
            style="width:173px;margin-bottom:5px;margin-left:50px;"
          >
          <br/>
          <b-button 
            type="is-success"             
            @click="addChallenge()"
            style="margin-left: 50px;"
            >Legg til en challenge
          </b-button>
          <br/><br/>          
          <div class="box" style="width:285px;">
            <img src="../assets/images/screenshot.gif" />
            <p class="is-size-7">Challenge ID'en finner du i CueScore. Gå inn på selve matchen og så klipper du ut de tallene som står i URL'en (nettadressen) - og limer dem inn her.</p>
          </div>
          

        </div>
    </div>
    <hr>
  </div>    
</template>

<script>
import moment from 'moment' 
moment.locale('nb');
import axios from 'axios'
import Firebase from 'firebase/app'
const db = Firebase.firestore();

export default {
  name: 'Challenges',
  components: {
  },
  data() {
    return {
      moment: moment,
      challenges: [],
      db_challenges: [],
      newChallenge: null,
      db_players: [],
      players: [],
      loaded: false    
    }
  },
  firestore: {
    db_challenges: db.collection('challenges'),
    db_players: db.collection('players')
  }, 
  created() {
    this.$bind('challenges', db.collection('challenges')).then(challenges => {
    this.db_challenges === challenges;
    this.$store.state.csChallenges === challenges;
    //this.$unbind('todos')
    })  

/*     this.$bind('players', db.collection('players')).then(players => {
    this.db_players === players;
    this.$store.state.csPlayers === players;
    //this.$unbind('todos')
    })   */

    setTimeout(this.setData, 2000);
    setTimeout(this.clearRanking, 1000);
 
  },    
  methods: {
    setData(){
      this.$store.state.players = this.db_players;
      let promises = [];
      let arr1 = [];
      let promises2 = [];
      let arr2 = [];
      
      // Challenges
      for (var i = 0; i < this.db_challenges.length; i++) {
        promises.push(
          axios     
            .get('https://api.cuescore.com/challenge/?id=' + this.db_challenges[i].challengeID)
            .then(res => {
              arr1.push(res.data);             
              })
        )
      }

      Promise.all(promises)      
        .then(() => {
          this.$store.state.csChallenges = arr1; 
          this.loaded = true;       
        });    

      // Players
      for (var y = 0; y < this.db_players.length; y++) {
        promises2.push(
          axios
            .get('https://api.cuescore.com/participant/?id=' + this.db_players[y].playerID)
            .then(res => {
                arr2.push(res.data);
            })
        )
      }

      Promise.all(promises2)
      .then(() => {
          this.$store.state.csPlayers = arr2;
      });           
    },
    addChallenge() {
      if (this.newChallenge.length === 7) {
        var id = parseInt(this.newChallenge);
        db.collection("challenges").add({
          challengeID: id
        })
        this.$buefy.dialog.alert({
          title: 'Suksess',
          message: 'Challengen er lagt inn i klubbdatabasen.',
          type: 'is-success'
        })
      } else {
        this.$buefy.dialog.alert({
          title: 'Feil',
          message: 'Tallet skal kun inneholde 7 siffer. <br/>Ikke noe ble lagt inn i databasen.<br/>.Prøv på nytt.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertDialog',
          ariaModal: true
        })
      }
      this.newChallenge = null
    }
  },
  clearRanking(){
    // Legg til ranking i csPlayers
    var x = 0;
    while(x < this.$store.state.csPlayers.length) {
      this.$store.state.csPlayers[x].ranking = 0;
      x++;
    }    
  } 
}
</script>

<style scoped>

</style>
