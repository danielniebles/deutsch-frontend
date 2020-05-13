<template>
    <div id="view-all-verbs">    
        <ul class="collection with-header">
            <li class="collection-header"><h4>Verbs</h4></li>
            <li v-for="verb in verbs" v-bind:key="verb.docId" class="collection-item">{{verb.value}}
                
                <router-link class="secondary-content" v-bind:to="{name: 'view-verb', 
                params: {docId: verb.docId}}">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>
        <div class="fixed-action-btn">
            <router-link to="/verbs/addverb" class="btn-floating btn-large blue">
             <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
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