<template>
    <v-container wrap>
        <v-row>
            <v-col cols="12">
                {{getRandomQuestion()}}
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p>{{}}</p>
            </v-col>
        </v-row>
       
        <v-row >
            <v-col align="end">
                <h1 class="display-1">Lorem, ipsum dolor.</h1>
                <h1 class="display-2">Lorem, ipsum dolor.</h1>
            </v-col>
        </v-row>
         <v-btn class="mx-2" fab fixed right bottom>
                        <v-icon dark>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
    </v-container>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex';


export default {

    computed: mapState(['exercise']),
    methods: {
        ...mapGetters(['getRandomQuestion']),
        ...mapActions(['getExercise'])
    },
    mounted(){
        this.getExercise()
        this.getRandomQuestion()
    }
    
}
</script>