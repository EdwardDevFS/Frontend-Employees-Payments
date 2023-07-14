<template>
    <div class="container-form">
        <router-link to="/" >
          <b-button variant="success" class="mb-2">
              <b-icon icon="arrow-left" aria-hidden="true"></b-icon> Back
          </b-button>
        </router-link>
        <h4 style="margin-top: 40px;"><b>PERSONAL INFORMATION</b></h4>
        <b-form @submit.prevent="storeEmployee(form)" v-if="show">
            <div class="form-display">
                <div style="width: 100%; display: flex; gap:24px">
                    <b-form-group
                        id="input-group-1"
                        label="First name:"
                        label-for="input-1"
                        class="w-35">
                        <b-form-input
                            id="input-1"
                            v-model="form.first_name"
                            placeholder="Enter first name"
                            required
                        ></b-form-input>
                    </b-form-group>
        
                    <b-form-group id="input-group-2" class="w-35" label="Last Name:" label-for="input-2">
                        <b-form-input
                            id="input-2"
                            v-model="form.second_name"
                            placeholder="Enter last name"
                            required>
                        </b-form-input>
                    </b-form-group>
            
                    <b-form-group id="input-group-3" label="DOB:" class="w-35" label-for="input-3">
                        <b-form-datepicker id="example-datepicker" v-model="form.dob" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </div>
                <div style="width: 100%; display: flex; gap:24px">
                    <b-form-group id="input-group-2" class="w-35" label="Phone:" label-for="input-2">
                        <b-form-input
                            id="input-2"
                            type="number"
                            v-model="form.phone"
                            placeholder="Enter phone number"
                            required>
                        </b-form-input>
                    </b-form-group>
                    
                    <b-form-group id="input-group-2" class="w-35" label="Email:" label-for="input-2">
                        <b-form-input
                            id="input-2"
                            v-model="form.email"
                            placeholder="Enter email"
                            required>
                        </b-form-input>
                    </b-form-group>
    
                    <b-form-group id="input-group-2" class="w-35" label="Address:" label-for="input-2">
                        <b-form-input
                            id="input-2"
                            v-model="form.address"
                            placeholder="Enter Address"
                            required>
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>
            
            <div class="form-display" style="margin-top: 40px;">
                <div style="display: flex; justify-content: space-between;">
                    <h4><b>PAYMENTS</b></h4>
                    <div style="display:flex; gap: 24px;">
                        <b-icon @click="deleteOne" class="h1 mb-2 delete_button"  variant="danger" icon="bookmark-x-fill"></b-icon>
                        <b-icon @click="addInputSet" class="h1 mb-2 plus-icon" variant="primary" icon="plus-circle-fill"></b-icon>
                    </div>
                </div>
                <div 
                    v-for="(payment, index) in form.payments" 
                    :key="index" 
                    style="
                        width: 100%;
                        display: flex;
                        gap:24px"
                    >
                    <b-form-group
                        id="input-group-1"
                        label="Transaction ID:"
                        label-for="input-1"
                        class="w-35">
                        <b-form-input
                            id="input-1"
                            v-model="payment.id_transaction"
                            placeholder="E-11110"
                            required
                        ></b-form-input>
                    </b-form-group>
        
                    <b-form-group id="input-group-2" class="w-35" label="Amount:" label-for="input-2">
                        <b-form-input
                            id="input-2"
                            type="number"
                            v-model="payment.amount"
                            placeholder="Enter amount"
                            required>
                        </b-form-input>
                    </b-form-group>
            
                    <b-form-group id="input-group-3" label="Date:" class="w-35" >
                        <b-form-datepicker  v-model="payment.date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                </div>
            </div>
            <div style="margin-top: 40px;">
                <b-button type="submit" block variant="primary">SAVE</b-button>
            </div>
        </b-form>
    </div>
    
  </template>
  
  <script>
    import axios from 'axios';
    import swal from 'sweetalert';

    
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"
    export default {
        data() {
            return {
                form: {
                    first_name: '',
                    second_name: '',
                    dob: '',
                    phone: '',
                    email: '',
                    address: '',
                    payments: [
                        {id_transaction: '', amount: '', date: ''}
                    ],
                },
                show: true
            }
        },
        async mounted(){
            const id = this.$route.params.id;
            if(!id){
                return;
            }
            let data = await axios.get("employees/"+id);
            this.form = data.data.data
        },
        methods: {
            
        async storeEmployee(form) {
            const id = this.$route.params.id;
            if(id){
                try {
                    await axios.put("employees/"+id, form);
                    swal({
                        title: "employee has been updated successfully",
                        icon: "success",
                    });
                    this.$router.push('/');
                    
                } catch (error) {
                    alert(error)
                }
            }
            else{
                try {
                    await axios.post("employees", form);
                    this.$router.push('/');
                    await swal({
                        title: "employee has been added successfully",
                        icon: "success",
                    });
    
                } catch (error) {
                    alert(error)
                }
            }

        },
        deleteOne(){
            if(this.form.payments.length != 1){
                this.form.payments.pop();
            }
            let data = JSON.stringify(this.form);
            data = JSON.parse(data);
            console.log(data)
        },  
        addInputSet() {
            if(this.form.payments.length == 5){
                return ;
            }
            const lastInputSet = this.form.payments[this.form.payments.length - 1];
            const newInputSet = { ...lastInputSet };
            newInputSet.id = null;
            newInputSet.id_transaction = '';   
            newInputSet.amount = '';
            newInputSet.date = '';
            this.form.payments.push(newInputSet);
        },
      }
      
    }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-form{
    width: 100%;
    padding: 24px 48px;
}
.form-display{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
}
.w-35{
    width: 33.3% !important;
}
.plus-icon{
    cursor: pointer;
}
.delete_button{
    cursor: pointer;
}

</style>
