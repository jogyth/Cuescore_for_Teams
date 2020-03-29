    <template>
    <div class="section">
        <h1 class="title">Turneringer</h1>    
        <p>Oversikt over alle turneringer spilt i klubben. Her registreres også matcher etterhvert som de spilles. Alle turneringsmatcher registreres i CueScore på vanlig måte og registreres både på siden "Challenges" og på denne siden.</p>
        <hr>
        <div class="columns">
            <div class="column is-four-fifths is-full-mobile">
                <div v-if="velgTurnering !== null">
                    <h2 class="title is-size-5">{{ tournaments[velgTurnering].navn }} 
                        <!-- - {{ moment.unix(tournaments[this.$store.state.valgtTurnering].dato.seconds).format('YYYY') }} --></h2>        
                    <!-- ***** MAL HVIS 8 DELTAGERE --->
                    <div v-if="tournaments[velgTurnering].mal === 8">
                        <Eight></eight>
                    </div>
                    <hr>         
                </div>
            </div>
            <div class="column is-one-fifth is-full-mobile">
                <div v-if="loaded">    
                    <b-select 
                        placeholder="Velg turnering" 
                        size="is-medium"
                        v-model="velgTurnering"
                        class="has-text-centered"
                        >
                            <option 
                                v-for="(turnering, index) in this.tournaments"
                                :key="index"
                                :value="index"
                                >
                                    {{turnering.navn}}
                            </option>
                    </b-select>
                </div>    
                <div v-if="velgTurnering !== null" class="box" style="margin-top:20px;">
                    <h3 class="title is-size-5">Detaljer</h3>
                    <p><strong>Avsluttet:</strong> 
                        <span v-if="tournaments[velgTurnering].aktiv" class="has-text-danger"> Nei</span>
                        <span v-else class="has-text-success"> Ja</span>
                    </p>
                    <p><strong>Opprettet:</strong> {{ moment.unix(tournaments[velgTurnering].dato.seconds).format('L') }}</p>       
                    <p><strong>Turneringsleder:</strong> {{ tournaments[velgTurnering].forfatter }}</p>
                    <p><strong>Race to:</strong> {{ tournaments[velgTurnering].raceTo }}</p>
                    <p><strong>Disiplin:</strong> {{ tournaments[velgTurnering].disiplin }}</p>
                    <p><strong>Deltagere:</strong> {{ tournaments[velgTurnering].deltagere.length }}</p> 
                    <p><strong>Deltageravgift:</strong> {{ tournaments[velgTurnering].avgift }}</p>
                    <p><strong>Vipps-oppgjørsnummer:</strong> {{ tournaments[velgTurnering].vipps }}</p>           
                    <p><strong>Premier:</strong> {{ getPremier(tournaments[velgTurnering].premier, tournaments[velgTurnering].avgift, tournaments[velgTurnering].deltagere.length) }}<br/><span v-html="premier"></span></p>
                    <p><strong>Kommentarer:</strong><br/> {{ tournaments[velgTurnering].kommentarer }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
//import axios from 'axios'
import moment from 'moment' 
moment.locale('nb');
import Firebase from 'firebase/app'
const db = Firebase.firestore();
import Eight from './maler/Eight.vue'

export default {
    name: 'Tournaments',
    components: {
        Eight             
    },
    data() {
        return {
            moment: moment,
            tournaments: [],
            loaded: false,
            //valgtTurnering: null,
            premier: null,
            modalActive: false,
            activeMatch: [],
            resA: null,
            resB: null
        }
    },
    firestore: {
        tournaments: db.collection('tournaments'),
        //db_players: db.collection('players')
    }, 
    created() {
        this.$bind('tournaments', db.collection('tournaments')).then(tournaments => {
        this.tournaments === tournaments;       
        //this.$unbind('todos')
        })         
    },
    methods: {
        loading(){
            this.loaded = true;
        },
        getPremier(arr, avgift, antall){
            var i=0;
            var res ="";
            while(i < arr.length){
                var tall = i+1;
                var verdi = arr[i];
                var prosent = parseInt(verdi)/100;
                res += tall+".premie (" + verdi + " %) - kr." + Math.round((avgift*antall)*prosent) + ",- <br/>";
                i++;                
            }
            this.premier = res;
        },        
    },
    mounted(){
        this.loading();

    },
    computed: {
        velgTurnering: {
            get() {
                console.log("mutation get: " + this.$store.state.valgtTurnering)
                return this.$store.state.valgtTurnering;
            },
            set(value) {
                this.$store.commit('updateValgtTurnering', value);
            }
        }
    }
}
</script> 

<style scoped>
.vs {
    margin-left: 20%;
}

</style>
