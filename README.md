# my-vue-full
En pakke med Vuex og VueRouter good to go. Bulma og Buefy er også standard. Og så Moment da. 

## Project setup
Last ned fra Github, endre navnet i package.json og kjør:
```
npm install
```
Du kan også vurdere om enkelte pakker nå skal oppdateres med 
```
npm update <package>
```
Få i gang git for ditt nye prosjekt ved å lage et nytt repo på Github og pushe dit. 

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Typiske pakker
```
npm install axios
```
Spørringer mot APIer
```
npm install lodash
```
Gjør magi med arrays
```
npm install vue-gtag
```
Når ting må regges på Google Analytics
```
npm install node-sass
```
Sass - stiler. Trenger også de to neste. Kan litt lite om disse.
```
npm install sass
```
```
npm install sass-loader
```

## Om package.json
Merk at regelen "no-console": "off" gjør at man kan bruke console.log. 

## Annet merkverdig
Filen vue.config.js i rota er knytta til VueRouter og gjør det mulig å hoste dette i en undermappe. 