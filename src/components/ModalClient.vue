<script>
    export default{
        name: 'modal-client',
        props:{
            clientName: String,
            show: Boolean 
        },
        data(){
            return{
                isActive: false,
            }
        },
        methods:{
            handleHidden(){
                this.isActive = false;
                this.$emit('closing');
            }
        },
        watch:{
            show(value, lastValue){
                if(value){
                    this.isActive = true
                }
            }
        }
    }
</script>
<template>
    <b-modal id="bv-modal-example" v-model="isActive" @hidden="handleHidden" hide-footer>
        <template #modal-title>
        <span>{{ clientName }}</span>
    </template>
    <div class="d-block text-center">
        <h3>Hello From This Modal!</h3>
    </div>
    </b-modal>
</template>