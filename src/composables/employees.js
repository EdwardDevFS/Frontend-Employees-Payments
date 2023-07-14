import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"
export default function useEmployee(){
    
    const employees = ref([]);
    const employee = ref([]);
    const errors = ref({});
    const router = useRouter();
    
    const getEmployees = async () =>{
        const response = await axios.get("employees");
        console.log(response)
        employees.value = response.data.data;
    };
    const getEmployee = async (id) =>{
        const response = await axios.get("employees/"+id);
        employee.value = response.data.data;
    };
    const storeEmployee = async (data) =>{
        try {
            await axios.post("employees",data);
            await router.push({name:"EmployeeIndex"});
        } catch (error) {
            if(error.response.status === 422){
                errors.value = error.response.data.errors;
            }
        }
    };
    const updateEmployee = async (id) =>{
        try {
            await axios.put("employees/"+id, employee.value);
            await router.push({name:"EmployeeIndex"});
        } catch (error) {
            if(error.response.status === 422){
                errors.value = error.response.data.errors;
            }
        }
    };

    const destroyEmployee = async (id) =>{
        if(!window.confirm("Are you sure?")){
            return;
        }
        await axios.delete("employee/"+id);
        await getEmployees();
    };
    return {
        employee,
        employees,
        getEmployees,
        getEmployee,
        storeEmployee,
        updateEmployee,
        destroyEmployee,
        errors
    };
}