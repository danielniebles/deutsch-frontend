<template>
<div class="container">
    <div id="add-verb">
            <h3>Add Verb</h3>
            <div class="row">
                <form @submit.prevent="saveVerb" class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="text" v-model="value" required>
                            <label>Value</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="text" v-model="translation" required>
                            <label>Translation</label>
                        </div>
                    </div>
                    <button type="submit" class="btn">Submit</button>
                    <router-link to="/" class="btn grey">Back</router-link>
                </form>
            </div>
    </div>
</div>
    
</template>

<script>
import {Api} from '@/utilities/Api'
export default {
    name: 'add-verb',
    data(){
        return{
            value: null,
            translation: null
        }
    },
    methods: {
        async saveVerb(){
            const response = await Api().post('/verbs/write', {value:this.value, translation:this.translation})
            console.log(response.data)
            const path = '/'
            if(this.$route.path !== path) this.$router.push('/')
        }
    }
}
</script>