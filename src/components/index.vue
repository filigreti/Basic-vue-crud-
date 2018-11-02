<template>
  <div class="index container">
<div class="card" v-for="anime in animes" :key="anime.id">
<div class="card-content">
  <i class="material-icons delete" @click="deleteAnime(anime.id)">delete</i>
  <h2 class="indigo-text">{{ anime.title }}</h2>
  <ul class="characters">
    <li v-for="(ani, index) in anime.characters" :key="index">
    <span class="chip"> {{ ani }} </span></li>
  </ul>
</div>
 <span class="btn-floating btn-large halfway-fab pink">
   <router-link :to="{ name: 'editanime', params: {anime_slug: anime.slug}}">
     <i class="material-icons edit">edit</i>
   </router-link>
 </span>
</div>

  </div>
  <!-- bulma -->
      
       
 
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      animes: []
      
    }
  
},
methods: {
  deleteAnime(id){
    db.collection('animes').doc(id).delete()
    .then(() => {
      this.animes = this.animes.filter(anime => {
      return anime.id != id
    })
    

    })
}
  },
  created(){
    db.collection('animes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let anime = doc.data()
        anime.id = doc.id
        this.animes.push(anime)
      })

    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index{
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap:20px;
margin-top: 30px;

}
.indigo-text{
font-size: 2rem;
font-weight: 550;
text-align: center;
text-transform: uppercase;
margin-top: 0%;

}
.characters {
margin: 30px auto;
}
.characters li{
  display: inline-block;
}
.delete{
  display:grid;
  justify-content:right;
  cursor: pointer;
  color: #aaa;
  font-size: 30px;
}

</style>


