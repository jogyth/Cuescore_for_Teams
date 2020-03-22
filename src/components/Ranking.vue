<template>
    <div class="section">
        <h1 class="title">Ranking</h1>
        <p>Rankingen er basert på <a href="http://www.biljardforbundet.no/2020/03/norgesrating/" target="_blank">Norges Biljardforbunds rankingsystem</a>. Spillere kommer i utgangspunktet inn i rankingen med en startverdi på 1150, men det er skjønnsmessig delt ut 1 ekstra poeng til de antatt beste spillerne slik at vi har en relevant seeding fra start. <br>Se kolonnen til høyre på siden for mer info om poenggivning.</p>
        <hr>
        <div class="columns">
            <div class="column is-one-third is-full-mobile">
              <h2 class="title is-size-4" style="margin-left:5%">Rankingtabell</h2>
                <div v-if="loaded">
                    <table class="table is-bordered is-hoverable" style="margin-left:5%;">
                        <tr>
                          <th class="is-warning">#</th>
                          <th class="is-warning">Poeng</th>
                          <th class="is-warning">Seed</th>
                          <th class="is-warning">Bilde</th>
                          <th class="is-warning">Navn</th>
                         </tr> 
                        <tr v-for="(item, index) in this.rankedSpellere" :key="index">
                          <td><span class="has-text-weight-bold is-size-4">{{ item.rank }}</span></td>
                          <td align="center">{{ item.ranking }}</td>
                          <td align="center">{{ item.seed }}</td>
                          <td><img :src="item.image" width="60px"></td>
                          <td><a :href="item.url">{{item.name}}</a></td>
                        </tr>                 
                    </table>
                </div>  
              <div class="image">
                <img src="../assets/images/cue.png" style="margin-top:50px;width:70%;" />
              </div>                              

            </div>
            <div class="column is-two-thirds is-full-mobile">
              <h2 class="title is-size-4">Poengberegning</h2>
              <p class="pe"><strong>Poengdifferanse:</strong> Forskjellen i poengsum mellom to utøvere som møtes, basert på siste oppdaterte rating.</p>
              <p class="pe"><strong>Uventet resultat:</strong> Seier over spiller med mer poeng, eller tap for spiller med mindre poeng.</p>
              <p class="pe"><strong>Forventet resultat:</strong> Seier over spiller med mindre poeng, eller tap for spiller med mer poeng.</p>
              <table class="table is-bordered senter">
                <tr>
                  <th rowspan="2" class="is-warning"> Poengdifferanse</th>
                  <th colspan="2" class="is-warning">Uventet resultat</th>
                  <th colspan="2" class="is-warning">Forventet resultat</th>
                </tr>
                <tr>
                  <th class="is-success" align="center">Seier</th>
                  <th class="is-success" align="center">Tap</th>
                  <th class="is-success" align="center">Seier</th>
                  <th class="is-success" align="center">Tap</th>
                </tr>
                <tr>
                  <td align="center">0</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center">8</td>
                  <td align="center">-7</td>
                </tr>
                <tr>
                  <td align="center">1-49</td>
                  <td align="center">8</td>
                  <td align="center">-8</td>
                  <td align="center">8</td>
                  <td align="center">-6</td>
                </tr>
                <tr>
                  <td align="center">50-99</td>
                  <td align="center">10</td>
                  <td align="center">-10</td>
                  <td align="center">7</td>
                  <td align="center">-5</td>
                </tr>   
                <tr>
                  <td align="center">100-149</td>
                  <td align="center">12</td>
                  <td align="center">-12</td>
                  <td align="center">6</td>
                  <td align="center">-4</td>
                </tr>   
                <tr>
                  <td align="center">150-199</td>
                  <td align="center">14</td>
                  <td align="center">-14</td>
                  <td align="center">5</td>
                  <td align="center">-3</td>
                </tr>   
                <tr>
                  <td align="center">200-299</td>
                  <td align="center">16</td>
                  <td align="center">-16</td>
                  <td align="center">4</td>
                  <td align="center">-2</td>
                </tr>   
                <tr>
                  <td align="center">300-399</td>
                  <td align="center">18</td>
                  <td align="center">-18</td>
                  <td align="center">3</td>
                  <td align="center">-2</td>
                </tr>   
                <tr>
                  <td align="center">400-599</td>
                  <td align="center">20</td>
                  <td align="center">-20</td>
                  <td align="center">2</td>
                  <td align="center">-1</td>
                </tr>   
                <tr>
                  <td align="center">600 +</td>
                  <td align="center">25</td>
                  <td align="center">-25</td>
                  <td align="center">1</td>
                  <td align="center">-1</td>
                </tr>                                                                                              
              </table>              
            
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment' 
moment.locale('nb');
import Firebase from 'firebase/app'
const db = Firebase.firestore();
import _ from 'lodash'


export default {
  name: 'Ranking',
  components: {
  },
  data() {
    return {
      moment: moment,
      players: [],
      db_players: [], 
      spellere:[],    
      sorterteSpellere: [],
      loaded: false,
      rankNum: 0 
    }
  },
  firestore: {
    db_players: db.collection('players')
  }, 
  mounted() {
    var i = 0;
    while(i < this.$store.state.csPlayers.length) {
      this.spellere[i] = {
        playerId: this.$store.state.csPlayers[i].playerId,
        name: this.$store.state.csPlayers[i].name,
        url: this.$store.state.csPlayers[i].url,
        image: this.$store.state.csPlayers[i].image,
        startScore:  this.getScore(this.$store.state.csPlayers[i].playerId),
        ranking: this.getScore(this.$store.state.csPlayers[i].playerId)
      }   
      i++;
    }

    this.getRealScore();
  }, 
  methods: {
    getScore(verdi){  
      var i = 0;      
      while(i < this.$store.state.players.length) {
        if(verdi === this.$store.state.players[i].playerID) {
          return this.$store.state.players[i].startScore;
        }
        i++
      }
    },
    getRealScore(){
      // Henter eldste match først og tar utgangspunkt i startScore
      var i = this.$store.state.csChallenges.length;
      while(i--){
        // Resetter vinnere
        var vinnerA = false;
        var vinnerB = false;
        var ventetVinner = false
        var tilfelle;
        // Finn spillere fra match
        var spillerA = this.$store.state.csChallenges[i].match.playerA.playerId;
        var spillerB = this.$store.state.csChallenges[i].match.playerB.playerId;
        console.log("----------------")
        console.log(spillerA + " vs " + spillerB)
        // Finn ut hvem som vant
        if (this.$store.state.csChallenges[i].match.scoreA > this.$store.state.csChallenges[i].match.scoreB) {
          vinnerA = true;
        } else {
          vinnerB = true;
        }
        // Finn ut hvor mange rankingpoeng de hadde fra før. 
        var preRankingA = this.getRanking(spillerA);
        var preRankingB = this.getRanking(spillerB);
        // Finn ut hvilke startscore de hadde
        var startScoreA = this.getScore(spillerA);
        var startScoreB = this.getScore(spillerB);
        // Legg sammen preRanking og startScore
        var rankingA = preRankingA + startScoreA;
        var rankingB = preRankingB + startScoreB;
        console.log("ranking " + rankingA + " | " + rankingB);
        // Finn ut differansen mellom de to
        var diff = rankingA - rankingB;
        // Finn ventet vinner
        // Hvis diffen er positiv var A høyest ranket. Hvis negativ var B høyest ranket. 
        switch(Math.sign(diff)) {
          case -1:
            ventetVinner = spillerB;
            break;
          case 0:
            ventetVinner = false;
            break;
          case +1:
            ventetVinner = spillerA;
            break  
        }
        console.log("ventetVinner " + ventetVinner)

        // TILFELLER FOR SPILLER A
        // Finn spillers poengsum hvis han vant og resultat var ventet
        if((vinnerA == true) && (ventetVinner == spillerA)) {
          console.log("Spiller A vant som ventet")
          tilfelle = 0;
        }
        // Finn spillers poengsum hvis han vant og resultat var uventet
        if((vinnerA == true) && (ventetVinner == spillerB)) {
          console.log("Spiller A vant uventet")
          tilfelle = 1;
        }
        // Finn spillers poengsum hvis han vant men ventetVinner er false
        if((vinnerA == true) && (ventetVinner == false)){
          console.log("Spiller A vant, men de har lik ranking")
          tilfelle = 0; //1 orginalt
        }
        // Finn spillers poengsum hvis han tapte men var ventet å vinne
        if((vinnerA == false) && (ventetVinner == spillerA)){
          console.log("Spiller A tapte, men det var ventet at han skulle vinne")
          tilfelle = 3;
        }
        // Finn spillers poengsum hvis han tapte og resultatet var ventet
        if((vinnerA == false) && (ventetVinner == spillerB)) {
          console.log("Spiller A tapte og resultatet var ventet")
          tilfelle = 4;
        }
        // Finn spillers poengsum hvis han tapte og ventetVinner er false
        if((vinnerA == false) && (ventetVinner == false)) {
          console.log("Spiller A tapte men de har lik ranking")
          tilfelle = 4; // 3 orginalt
        }
        console.log("Tilfelle " + tilfelle)
        console.log("Rankingjustering spiller A: " + this.kalkuler(diff, tilfelle));
        var rettRankingA = this.kalkuler(diff, tilfelle);
        this.enterRanking(spillerA, rettRankingA);
 
        // TILFELLER FOR SPILLER B
        // Finn spillers poengsum hvis han vant og resultat var ventet
        if((vinnerB == true) && (ventetVinner == spillerB)) {
          console.log("Spiller B vant som ventet")
          tilfelle = 0;
        }
        // Finn spillers poengsum hvis han vant og resultat var uventet
        if((vinnerB == true) && (ventetVinner == spillerA)) {
          console.log("Spiller B vant uventet")
          tilfelle = 1; 
        }
        // Finn spillers poengsum hvis han vant men ventetVinner er false
        if((vinnerB == true) && (ventetVinner == false)){
          console.log("Spiller B vant, men de har lik ranking")
          tilfelle = 0; //1 orginalt
        }
        // Finn spillers poengsum hvis han tapte men var ventet å vinne
        if((vinnerB == false) && (ventetVinner == spillerB)){
          console.log("Spiller B tapte, men det var ventet at han skulle vinne")
          tilfelle = 3;
        }
        // Finn spillers poengsum hvis han tapte og resultatet var ventet
        if((vinnerB == false) && (ventetVinner == spillerA)) {
          console.log("Spiller B tapte og resultatet var ventet")
          tilfelle = 4;
        }
        // Finn spillers poengsum hvis han tapte og ventetVinner er false
        if((vinnerB == false) && (ventetVinner == false)) {
          console.log("Spiller B tapte men de har lik ranking")
          tilfelle = 4; // 3 orginalt
        }
        console.log("Tilfelle " + tilfelle)
        console.log("Rankingjustering spiller B: " + this.kalkuler(diff, tilfelle));
        var rettRankingB = this.kalkuler(diff, tilfelle);
        this.enterRanking(spillerB, rettRankingB);        
      }
      setTimeout(this.sorterSpellere(), 1000);
    },
    enterRanking(spiller, verdi){
      // Funker ikke fordi du ikke kan loope igjennom et objekt.       
      var i = 0;
      while(i < this.spellere.length) {
        if (this.spellere[i].playerId === spiller) {
          var gammelRanking = this.spellere[i].ranking;
          this.spellere[i].ranking = gammelRanking + verdi;
        }
        i++;
      }
    },
    kalkuler(differanse, tilfelle){
       // Finn verdi fra tabellen
      // Gjør diff til positivt tall
      var diff = Math.abs(differanse);
      var score;
      switch(tilfelle) {
        case 0:
          // Forventet seier
          if(diff == 0) { score = 8 }
          if (diff > 0 && diff < 50) { score = 8 }
          if (diff > 49 && diff < 100) { score = 7 }
          if (diff > 99 && diff < 150)  { score = 6 }
          if (diff > 149 && diff < 200) { score = 5 }
          if (diff > 199 && diff < 300) { score = 4 }
          if (diff > 299 && diff < 400) { score = 3 }
          if (diff > 399 && diff < 600) { score = 2 }
          if (diff > 599 ) { score = 1 }
          break;
        case 1:
          // Uventet seier
          if(diff == 0) { score = 0 }
          if (diff > 0 && diff < 50) { score = 8 }
          if (diff > 49 && diff < 100) { score = 10 }
          if (diff > 99 && diff < 150)  { score = 12 }
          if (diff > 149 && diff < 200) { score = 14 }
          if (diff > 199 && diff < 300) { score = 16 }
          if (diff > 299 && diff < 400) { score = 18 }
          if (diff > 399 && diff < 600) { score = 20 }
          if (diff > 599 ) { score = 25 }
          break;          
        case 3:
          // Uventet tap
          if(diff == 0) { score = 0 }
          if (diff > 0 && diff < 50) { score = -8 }
          if (diff > 49 && diff < 100) { score = -10 }
          if (diff > 99 && diff < 150)  { score = -12 }
          if (diff > 149 && diff < 200) { score = -14 }
          if (diff > 199 && diff < 300) { score = -16 }
          if (diff > 299 && diff < 400) { score = -18 }
          if (diff > 399 && diff < 600) { score = -20 }
          if (diff > 599 ) { score = -25 }
          break;          
        case 4:
          // Forventet tap
          if(diff == 0) { score = -7 }
          if (diff > 0 && diff < 50) { score = -6 }
          if (diff > 49 && diff < 100) { score = -5 }
          if (diff > 99 && diff < 150)  { score = -4 }
          if (diff > 149 && diff < 200) { score = -3 }
          if (diff > 199 && diff < 300) { score = -2 }
          if (diff > 299 && diff < 400) { score = -2 }
          if (diff > 399 && diff < 600) { score = -1 }
          if (diff > 599 ) { score = -1 }
          break;          
      }
      return score;
    },
    getRanking(spiller){
      // Loop igjennom players og hent ranking
      var i = 0;
      var tall = 0;
      while(i < this.spellere.length) {
        if (this.spellere[i].playerID === spiller){
          tall = this.spellere[i].ranking;
        }
        i++;        
      }
      return tall;
    },
    sorterSpellere(){
      this.sorterteSpellere = _.orderBy(this.spellere, ['ranking'], ['desc']);
      this.loaded = true;
    }        
  },
  computed: {
    rankedSpellere() {
        const items = [];
        let nummer = 1;

        if (this.sorterteSpellere.length > 0) {
          items[0] = this.sorterteSpellere[0];
          items[0].rank = nummer;
          items[0].seed = 1;
          for (let index = 1; index < this.sorterteSpellere.length; index++) {
            items[index] = this.sorterteSpellere[index];
            if (items[index].ranking === items[index - 1].ranking) {
                items[index].rank = "";                    
            } else {
                items[index].rank = nummer +1;
                nummer++
            }
            if (index > (this.sorterteSpellere.length/2)) {
              items[index].seed = 2; 
            } else {
              items[index].seed = 1;
            }
          }
        }
        return items;
    }    
  }
}
</script>

<style scoped>
.pe {
  margin-bottom:20px;
}

</style>
