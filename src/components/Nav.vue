<template>
<nav class="navbar is-fixed is-success" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <img src="../assets/images/logo.png" width="330px">

    <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="navbar-menu" id="navMenu">
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

// Burger
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
</script>

