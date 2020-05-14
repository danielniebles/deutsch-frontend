<template>
    <v-row>
        <v-col >
            <v-card class="mx-auto" tile elevation="8">
                <v-list tile>
                    <v-subheader>Verbs</v-subheader>
                    <template v-for="verb in verbs">
                        <v-divider v-if="true" :key="verb.docId" :inset="false"></v-divider>

                        <v-list-item else  :key="verb.docId">
                        
                            <v-list-item-content>
                                <v-list-item-title v-text="verb.value"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content>
                                <v-list-item-title v-text="verb.translation"></v-list-item-title>
                            </v-list-item-content>
                            
                            <v-list-item-icon >
                                <router-link style="text-decoration: none;" 
                                    v-bind:to="{name: 'view-verb', 
                                    params: {docId: verb.docId}}">
                                    <v-btn icon>
                                        <v-icon>mdi-information</v-icon>
                                    </v-btn>
                                </router-link>
                            </v-list-item-icon>
                        </v-list-item>    
                    </template>          
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {Api} from '@/utilities/Api'

export default {
    name: 'view-verbs',
    data() {
        return {
            verbs: []            
        }
    },
    methods: {
        async getVerbs(){
            const response = await Api().get('/verbs/all', {crossdomain: true})
            const dummyVar =  response.data.data
            console.log(dummyVar)
            dummyVar.forEach(element => {
                this.verbs.push(element)
            });
        }
    },
    mounted(){
        this.getVerbs()
    }
}
</script>