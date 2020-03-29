<template>   
    <div v-if="loaded">
        <div v-if="this.tournaments[velgTurnering].matcher.qualifiers[0]">
            <h3 class="title is-size-6" style="margin-bottom:15px;">Kvalifiseringsrunder</h3>
            <div 
                v-for="(matcher, index) in this.tournaments[velgTurnering].matcher.qualifiers"
                :key="index"
                class="box"
                style="width:20%; position:relative; float:left; margin-right:10px;"
            >
                <p class="is-size-7">{{ getSpiller(matcher.spillerA)}} vs {{ getSpiller(matcher.spillerB)}}</p>
                <div v-if="matcher.cuescore != 0" style="margin-top:5px;">
                    <a 
                        class="button is-small is-size-7"
                    >
                        {{ getResult(matcher.cuescore, "A") }}
                    </a>
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    <a
                        class="button is-small is-size-7"
                    >
                        {{ getResult(matcher.cuescore, "B") }}
                    </a>
                    <a 
                        class="button is-warning is-size-7"
                        :href="getUrl(matcher.cuescore)"
                        target="_blank"
                        @click="getUrl(matcher.cuescore)"
                        style="margin-left:10px;"
                    >
                        Se i CueScore
                    </a>
                </div>
                <div v-else>
                    <a
                        class="button is-size-7 is-warning"
                        style="margin-top:10px;"
                        @click="enterCuescoreID(tournaments[velgTurnering].navn, 'kvartfinaler', index)"
                    >
                        <span class="icon is-small" >
                            <i class="fas fa-plus-circle"></i>
                        </span>
                        <span>Challenge ID</span>
                    </a>                
                </div>
            </div>

        </div>
        <!-- KVARTFINALER -->
        <hr style="clear:left;">
        <div class="columns">      
            <div class="column is-one-third">
                <h3 class="title is-size-6">Kvartfinaler</h3>
                <div 
                    v-for="(matcher,index) in this.tournaments[velgTurnering].matcher.kvartfinaler"
                    :key="index"
                    class="box"
                > 
                    <div class="field is-grouped" style="margin-bottom:0px;">
                        <a 
                            class="button is-dark is-size-7" 
                            style="width:40%;"
                        >
                            {{ getSpiller(matcher.spillerA) }}
                        </a>
                        <div v-if="matcher.cuescore != 0">
                            <a 
                                class="button is-size-7" style="margin-left:10px;"
                            >
                                {{ getResult(matcher.cuescore, "A") }}
                            </a>
                        </div>
                        <div v-else>
                            <a
                                class="button is-size-7 is-warning"
                                style="margin-left:10px;"
                                @click="enterCuescoreID(tournaments[velgTurnering].navn, 'kvartfinaler', index)"
                            >
                                <span class="icon is-small" >
                                    <i class="fas fa-plus-circle"></i>
                                </span>
                                <span>Challenge ID</span>
                            </a>
                        </div>
                    </div>
                    <span 
                        class="has-text-weight-bold is-size-6"
                        style="margin-left:18%;margin-top:0px;"    
                        >
                            vs
                    </span>
                    <div class="field is-grouped">
                        <a 
                            class="button is-dark is-size-7" 
                            style="width:40%;"
                        >
                            {{ getSpiller(matcher.spillerB) }}
                        </a>
                        <div v-if="matcher.cuescore != 0">
                            <a class="button is-size-7" style="margin-left:10px;">
                                {{ getResult(matcher.cuescore, "B") }}
                            </a>
                            <a 
                                class="button is-warning is-size-7"
                                :href="getUrl(matcher.cuescore)"
                                target="_blank"
                                @click="getUrl(matcher.cuescore)"
                                style="margin-left:10px;"
                            >
                                Se i CueScore
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <div class="column is-one-third">
                <h3 class="title is-size-6">Semifinaler</h3>
                <div 
                    v-for="(matcher,index) in this.tournaments[velgTurnering].matcher.semifinaler"
                    :key="index"
                    class="box"
                > 
                    <div class="field is-grouped" style="margin-bottom:0px;">
                        <a 
                            class="button is-dark is-size-7" 
                            style="width:40%;"
                        >
                            {{ getSpiller(matcher.spillerA) }}
                        </a>
                        <div v-if="matcher.cuescore != 0">
                            <a 
                                class="button is-size-7" style="margin-left:10px;"
                            >
                                {{ getResult(matcher.cuescore, "A") }}
                            </a>
                        </div>
                        <div v-else>
                            <a
                                class="button is-size-7 is-warning"
                                style="margin-left:10px;"
                                @click="enterCuescoreID(tournaments[velgTurnering].navn, 'semifinaler', index)"
                            >
                                <span class="icon is-small" >
                                    <i class="fas fa-plus-circle"></i>
                                </span>
                                <span>Challenge ID</span>
                            </a>
                        </div>
                    </div>
                    <span 
                        class="has-text-weight-bold is-size-6"
                        style="margin-left:18%;margin-top:0px;"    
                        >
                            vs
                    </span>
                    <div class="field is-grouped">
                        <a 
                            class="button is-dark is-size-7" 
                            style="width:40%;"
                        >
                            {{ getSpiller(matcher.spillerB) }}
                        </a>
                        <div v-if="matcher.cuescore != 0">
                            <a class="button is-size-7" style="margin-left:10px;">
                                {{ getResult(matcher.cuescore, "B") }}
                            </a>
                            <a 
                                class="button is-warning is-size-7"
                                :href="getUrl(matcher.cuescore)"
                                target="_blank"
                                @click="getUrl(matcher.cuescore)"
                                style="margin-left:10px;"
                            >
                                Se i CueScore
                            </a>
                        </div>

                    </div>
                </div>
            </div>                    
            <div class="column is-one-third">
                <h3 class="title is-size-6">Finale</h3>
                <div 
                    v-for="(matcher,index) in this.tournaments[velgTurnering].matcher.finaler"
                    :key="index"
                    class="box"
                > 
                    <div class="field is-grouped" style="margin-bottom:0px;">
                        <a 
                            class="button is-dark is-size-7" 
                            style="width:40%;"
                        >
                            {{ getSpiller(matcher.spillerA) }}
                        </a>
                        <div v-if="matcher.cuescore != 0">
                            <a 
                                class="button is-size-7" style="margin-left:10px;"
                            >
                                {{ getResult(matcher.cuescore, "A") }}
                            </a>
                        </div>
                        <div v-else>
                            <a
                                class="button is-size-7 is-warning"
                                style="margin-left:10px;"
                                @click="enterCuescoreID(tournaments[velgTurnering].navn, 'finaler', index)"
                            >
                                <span class="icon is-small" >
                                    <i class="fas fa-plus-circle"></i>
                                </span>
                                <span>Challenge ID</span>
                            </a>
                        </div>
                    </div>
                    <span 
                        class="has-text-weight-bold is-size-6"
                        style="margin-left:18%;margin-top:0px;"    
                        >
                            vs
                    </span>
                    <div class="field is-grouped">
                        <a 
                            class="button is-dark is-size-7" 
                            style="width:40%;"
                        >
                            {{ getSpiller(matcher.spillerB) }}
                        </a>
                        <div v-if="matcher.cuescore != 0">
                            <a class="button is-size-7" style="margin-left:10px;">
                                {{ getResult(matcher.cuescore, "B") }}
                            </a>
                            <a 
                                class="button is-warning is-size-7"
                                :href="getUrl(matcher.cuescore)"
                                target="_blank"
                                @click="getUrl(matcher.cuescore)"
                                style="margin-left:10px;"
                            >
                                Se i CueScore
                            </a>
                        </div>

                    </div>
                </div>
            </div>                    
        </div>
    </div>
</template>

<script>
import Firebase from 'firebase/app'
const db = Firebase.firestore();

export default {
    name: 'Eight',
    components: {
    },
    data() {
        return {
            tournaments: [],
            loaded: false,
            //valgtTurnering: null,
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
        getSpiller(spiller){
            var i = 0;
            while(i < this.$store.state.csPlayers.length){
                if(this.$store.state.csPlayers[i].playerId == spiller) { 
                    var res = this.$store.state.csPlayers[i].name;
                }                
                i++;
            }
            if(spiller == 0) {
                res = "TBA";
            }    
            if(spiller == 1) {
                res = "walkover";
            }               
            return res;
        },
        getRes(spiller){
            var i = 0;
            while(i < this.$store.state.csPlayers.length){
                var res;
                if(this.$store.state.csPlayers[i].playerId == spiller) { 
                    res = this.$store.state.csPlayers[i].name;
                }                                             
                i++;
            }
            return res;
        },
        getUrl(challenge){               
            var i = 0;
            while(i < this.$store.state.csChallenges.length){
                if(this.$store.state.csChallenges[i].challengeId === challenge){
                    var url = this.$store.state.csChallenges[i].url;
                }
                i++;
            }
            return url
        },
        getResult(match, spiller){
            var i = 0;
            var res;
            while(i < this.$store.state.csChallenges.length) {
                if(this.$store.state.csChallenges[i].challengeId === match) {
                    if(spiller == "A"){
                        res = this.$store.state.csChallenges[i].match.scoreA
                    }
                    if(spiller == "B"){
                        res = this.$store.state.csChallenges[i].match.scoreB
                    }
                }
                i++;
            }
            return res;
        },
        enterCuescoreID(navnet, matchTyper, index){
            this.$buefy.dialog.prompt({
                message: 'Legg inn CueScore ID for denne matchen: ',
                inputAttrs: {
                    maxlength: 8,
                    type: 'number'
                },
                trapFocus: true,
                onConfirm:(value) => 
                    db.collection("tournaments")
                        .where("navn", "==", navnet)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc){
                                var oppdatering = {};
                                if (matchTyper == "kvartfinaler") {
                                    oppdatering['matcher.kvartfinaler.' + index + '.cuescore'] = parseInt(value);
                                    db.collection("tournaments").doc(doc.id).update( oppdatering)
                                    db.collection("challenges").add({ challengeID: parseInt(value) })
                                    console.log(oppdatering)
                                } 
                                if (matchTyper == "semifinaler") {
                                    oppdatering['matcher.semifinaler.' + index + '.cuescore'] = parseInt(value);
                                    db.collection("tournaments").doc(doc.id).update( oppdatering)
                                    db.collection("challenges").add({ challengeID: parseInt(value) })
                                }            
                                if (matchTyper == "finaler") {
                                    oppdatering['matcher.finaler.' + index + '.cuescore'] = parseInt(value);
                                    db.collection("tournaments").doc(doc.id).update( oppdatering)
                                    db.collection("challenges").add({ challengeID: parseInt(value) })
                                }             
                                if (matchTyper == "qualifiers") {
                                    oppdatering['matcher.qualifiers.' + index + '.cuescore'] = parseInt(value);
                                    db.collection("tournaments").doc(doc.id).update( oppdatering)
                                    db.collection("challenges").add({ challengeID: parseInt(value) })
                                }                                                        
                            });
                        })
                        .then(
                            this.$buefy.toast.open('IDen er lagt inn:' + value)
                        )
            })
        }        
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