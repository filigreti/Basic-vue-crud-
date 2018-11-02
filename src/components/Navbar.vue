<template>
    <div class="navbar">
        <nav class="nav-extended deep-purple darken-4">
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <span class="nav-title">Anime List</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{ name : 'addAnime' }">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>


        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return{

        }
    }
}
</script>


<style>
.navbar nav{
    padding:0 30px;
}
</style>

