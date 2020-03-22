<template>
<nav class="navbar is-success" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <img src="../assets/images/logo.png" width="400px">

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" @click="setPage('home')">
        Challenges
      </a>

      <a class="navbar-item" @click="setPage('ranking')">
        Ranking
      </a>

      <a class="navbar-item" @click="setPage('tournament')">
        Turneringer
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
            <a class="button is-warning" href="https://www.facebook.com/groups/1006341226433510/">
                <strong>Facebook</strong>
            </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Nav',
  components: {
  },
  data() {
    return {
      
    }
  }, 
  methods: {
    setPage(side){
      switch(side){
        case 'ranking':
          this.$store.state.home = false;
          this.$store.state.tournaments = false;
          this.$store.state.ranking = true;
          break;
        case 'home':
          this.$store.state.home = true;
          this.$store.state.tournaments = false;
          this.$store.state.ranking = false;  
          break;
        case 'tournament':
          this.$store.state.home = false;
          this.$store.state.tournaments = true;
          this.$store.state.ranking = false; 
          break;         
      }
    }
  }
}
</script>

