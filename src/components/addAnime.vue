<template>
    <div class="add-anime container">
       <h2 class="center-align indigo-text"> Add New Anime</h2> 
       <form @submit.prevent="addAnime">
           <div class="field title">

               <label for="title">Anime Title:</label>
                <input type="text" name="title" v-model="title">
           </div>
           <div v-for="(ani, index) in characters" :key="index" class="field">
               <label for="character">Character:</label>
       <i class="material-icons prefix delete" @click='deleteAni(ani)'>delete</i>
               <input type="text" name="character" v-model="characters[index]">
    
           </div>
           <div class="field add-characters">
<label for="add-characters">Add a Character</label>
<input type="text" name="add-character" @keydown.tab.prevent="addAni" v-model="another">
           </div>
           <div class="field center-align">
               <p v-if="feedback" class="red-text">{{ feedback }} </p>
               <button class="btn pink">Add Anime</button>
           </div>
       </form>

    </div>
</template>
<script> 
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'addAnime',
    data(){
        return {
            title: null,
            another: null,
            characters: [],
            feedback: null,
            slug: null


        }
    },
    methods: {
        addAnime(){
      if(this.title){
          this.feedback = null
          this.slug = slugify(this.title, {
                replacement: '-',
                remove: /[$*_+~.()'"!:@]/g,
                lower: true

          })
          db.collection('animes').add({
              title: this.title,
              characters: this.characters,
              slug: this.slug
          }).then(() => {
              this.$router.push({ name: 'Index' })
          }).catch(err => {
              console.log(err)
          })
      } else {
          this.feedback = 'Enter an anime title'
      }
        
    },
    addAni(){
        if(this.another){
            this.characters.push(this.another)
            this.another = null
            this.feedback = null
        } else {
            this.feedback = "Enter Something "
        }
    },
    deleteAni(ani){
        this.characters = this.characters.filter(character => {
            return character != ani
        })
    }
}
}
</script>
<style>
.add-anime{
    margin-top:60px;
    padding:20px;
    max-width: 500px;
}
.add-anime h2{
font-size: 2rem;
margin: 20px auto;
font-weight: 400;

}
.btn {
    margin-top: 30px;
}

.add-anime .field {
margin: 20px auto;
position: relative;

}
.delete {
    position: absolute;
    right:0;
    bottom: 16px;
    color:grey;
    cursor: pointer;
}


</style>

