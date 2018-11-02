<template>
    <div v-if="anime" class="edit-anime container">
<h2>Edit {{ anime.title }} Anime</h2>
<form @submit.prevent="EditAnime">
           <div class="field title">

               <label for="title">Anime Title:</label>
                <input type="text" name="title" v-model="anime.title">
           </div>
           <div v-for="(ani, index) in anime.characters" :key="index" class="field">
               <label for="character">Character:</label>
       
               <input type="text" name="character" v-model="anime.characters[index]">
    <i class="material-icons prefix delete" @click='deleteAni(ani)'>delete</i>
           </div>
           <div class="field add-characters">
<label for="add-characters">Add a Character</label>
<input type="text" name="add-character" @keydown.tab.prevent="addAni" v-model="another">
           </div>
           <div class="field center-align">
               <p v-if="feedback" class="red-text">{{ feedback }} </p>
               <button class="btn pink">Update Anime</button>
           </div>
       </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'



export default {
    name: 'editAnime',
    data(){
        return{
            anime: null,
            another: null,
            feedback: null

        }
    },
    methods: {
        EditAnime(){
            if(this.anime.title){
          this.feedback = null
          this.animeslug = slugify(this.anime.title, {
                replacement: '-',
                remove: /[$*_+~.()'"!:@]/g,
                lower: true

          })
          db.collection('animes').doc(this.anime.id).update({
              title: this.anime.title,
              characters: this.anime.characters,
              slug: this.anime.slug
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
            this.anime.characters.push(this.another)
            this.another = null
            this.feedback = null
        } else {
            this.feedback = "Enter Something "
        }
    },
    deleteAni(ani){
        this.anime.characters = this.anime.characters.filter(character => {
            return character != ani
        })
    }
    },
    created(){
        let ref = db.collection('animes').where('slug', '==', this.$route.params.anime_slug )
        ref.get().then(snapshot => {
            snapshot.forEach(doc =>{
                this.anime = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-anime{
    margin-top:60px;
    padding:20px;
    max-width: 500px;
}
.edit-anime h2{
font-size: 2rem;
margin: 20px auto;
font-weight: 400;

}
.btn {
    margin-top: 30px;
}

.edit-anime .field {
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
