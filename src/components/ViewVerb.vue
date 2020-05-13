<template>
    <div id="view-verb">
        <h3>Verbs</h3>
    </div>
</template>

<script>
import {Api} from '@/utilities/Api'
export default {
    name: "view-verb",
    date(){
        return{
            value: null,
            translation: null
        }
    },

    methods: {
        async getVerbById(){
            const url = `/verbs/getbyId?valuedb=docId&conditions=%3D%3D&docId=${this.$route.params.docId}`
            console.log(this.$route.query)
            const response = await Api().get(url)
            console.log(response)
        }
    },
    mounted(){
        this.getVerbById()
    }
}
</script>