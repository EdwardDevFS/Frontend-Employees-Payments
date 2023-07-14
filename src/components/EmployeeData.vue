<script >
  import ModalClient from './ModalClient.vue';
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"
  export default {
    name: 'ListClients',
    data(){
      return {
        friend:'',
        employees: [],
        modalControl: false,
      }
    },
    components:{
      ModalClient,
    },
    computed:{
      ...mapGetters([
        'title',
        'username'
      ])
    },
    mounted(){
      this.getEmployees();
    },
    methods:
    {
      addFriend(){
        this.$store.state.friend = this.friend;
        this.$store.dispatch('addFriendAction');
        this.friend = ''

      },
      async getEmployees()
      {
        const employees = await axios.get("employees");
        this.employees = employees.data;
      },
      async DestroyEmployee(id)
      {
        await axios.delete("employees/"+id);
        await this.getEmployees();
      },
      deleteEmployeeModal(client_name,id) {
        swal(`Estas seguro de eliminar los datos de ${client_name}`, {
          dangerMode: true,
          buttons: true,
        }).then((res)=>{
          if(res){
            this.DestroyEmployee(id).then(()=>{
              swal({
                title: "Employee Deleted Successfuly",
                icon: "success",
              });
            })
          }
          else { return }
        })
      }
    }
  }

</script>
<template>
    <div class="hello container-fluid">
      <div class="header">
        <h1>CLIENTS</h1>
        <router-link to="/create">
          <b-button variant="primary">ADD CLIENT</b-button>
        </router-link>
      </div>
      <table  class="my-table">
        <blog-post></blog-post>
        <thead>
          <tr >
            <th>Client Name</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Payments</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="index">
            <td>{{employee.client_name}}</td>
            <td>{{employee.dob}}</td>
            <td>{{employee.phone}}</td>
            <td>{{employee.email}}</td>
            <td>{{employee.address}}</td>
            <td style="text-align: center;">{{employee.Payments}}</td>
            <td>$ {{employee.Total}}</td>
            <td class="actions">
              <router-link :to="`/edit/${employee.id}`" style="color:blue">Edit</router-link>
              <a @click="deleteEmployeeModal(employee.client_name,employee.id)" style="color: red;" >Delete</a>
            </td>
          </tr> 
          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>
</template>


<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
}
.hello{
  width: 100%;
  padding: 24px 24px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-table {
  border-collapse: collapse;
  width: 100%;
}

.my-table th, .my-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.my-table th {
  background-color: #f2f2f2;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions{
  display: flex;
  gap: 8px;
}
</style>