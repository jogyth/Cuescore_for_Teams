<template>
  <div>
    <h1 class="title">Generalens Biljardklubb</h1>
    <p><em>Tester Cuescore API</em></p>
    <p>Henter alle registrerte matcher og viser dem i en tabell med siste match øverst. Dessverre kan man ikke hente alle matchene fra APIet (foreløpig), så disse må eventuel manuelt registreres i denne appen (Firebase eller noe sånt).</p>
    <br/><br/>
    <div v-if="!this.$store.state.loading">
        <table class="table is-bordered is-hoverable">
            <thead>
                <th>Tid</th>
                <th>Disiplin</th>
                <th>Challenge</th>
                <th>Først til</th>
                <th>Resultat</th>                
            </thead>
            <tr v-for="(item, index) in this.$store.state.csChallenges" :key="index">
                <td><small>{{ moment(item.starttime).format('LLL') }}</small></td>
                <td>{{ item.disciplineName }}</td>
                <td>{{ item.name }}</td>
                <td align="center">{{ item.match.raceTo }}</td>
                <td align="center">{{ item.match.scoreA }} - {{ item.match.scoreB }}</td>                
            </tr>
        </table>
        <hr>
        <p>Hadde vært kult å regne ut total spilletid for hver match. Klikkbare spillernavn som leder til cs-profil. Formatere adressen til 03.02.20 - 19:30. Hvorfor er ikke tabellen hoverable?</p>
        <br/>
        <p>Slik ser JSON av en match ut:</p>
        <p>{{ this.$store.state.csChallenges[0] }}</p>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment' 
moment.locale('nb');

export default {
  name: 'Challenges',
  components: {
  },
  data() {
    return {
        moment: moment
    }
  }
}
</script>

<style scoped>

</style>
