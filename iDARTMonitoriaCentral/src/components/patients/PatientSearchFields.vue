<template>
  <div class="q-mt-lg">
    <div class="text-center">
     <div class="q-my-md text-subtitle1 14"> Procurar Pacientes</div> 
     <q-separator color="grey-13" size="1px"/>
     </div>
    <div class="q-mx-xl">
      <div class="row items-center q-my-md">
          <q-icon name="person_outline" size="sm"/>
          <span class="q-pl-sm text-subtitle2">Informação inicial</span>
      </div>
      <div class="row">
          <q-input
             outlined
             label="Nr. Identificador"
             dense
             ref="identifier"
             class="col"
              lazy-rules
            :rules="[]"
              v-model="currPatient.patientid"
            />
          <textField
            dense
            class="col q-ml-md"
            label="Nome"
            :rules="[]"
              v-model="currPatient.firstnames"
            />
          <textField
          dense
            class="col q-ml-md"
            label="Apelido"
            :rules="[]"
              v-model="currPatient.lastname"
            />
      </div>
      <div class="q-mt-lg q-mb-md">
          <div class="row items-center q-mb-md">
              <q-icon name="search" size="sm"/>
              <span class="q-pl-sm text-subtitle2">Resultado da Pesquisa</span>
          </div>
          <q-separator color="grey-13" size="1px"/>
      </div>
  </div>
  </div>
</template>

<script setup>
import { useQuasar, QSpinnerBall } from 'quasar';
import { computed, inject, onMounted, reactive, ref, watch } from 'vue';
import textField from 'src/components/Shared/Input/TextField.vue';
//import PatientSearchFields from 'src/pages/patients/PatientSearchFields.vue';
import { useI18n } from 'vue-i18n';
import Patient from 'src/stores/models/patient/patient';

const currPatient = inject('currPatient');

let allPatients = reactive(inject('allPatients'));

console.log(allPatients)
/*
const search = () => allPatients.length > 0 ? allPatients.filter((patient) => {
          return this.filterPatient(patient)
        }) : allPatients;
*/
/*
let search = () => {
   allPatients.value.filter((patient) => {
         console.log(filterPatient(patient))
          return filterPatient(patient)
        })
       // console.log(search)
}

let filterPatient= (patient) => {
   console.log(stringContains(patient.patientid, currPatient.patientid) || stringContains(patient.firstnames, currPatient.firstnames)  || stringContains(patient.lastname, currPatient.lastname))
        return stringContains(patient.patientid, currPatient.patientid) || stringContains(patient.firstnames, currPatient.firstnames)  || stringContains(patient.lastname, currPatient.lastname)
      };     

 let stringContains= (stringToCheck,stringText) => {
        if (stringToCheck === '' || stringToCheck === null || stringToCheck === undefined) return false
        if (stringText === '' || stringText === null || stringText === undefined) return false
        console.log('1111'+stringToCheck.toLowerCase().includes(stringText.toLowerCase()))
        return stringToCheck.toLowerCase().includes(stringText.toLowerCase())
 }   


 watch(currPatient, () => {
   console.log(currPatient.firstnames)
   const patientsFilter = allPatients.value
   console.log(patientsFilter)
const patientsFilter1 = patientsFilter.filter((patient) => {
         console.log(filterPatient(patient))
          return filterPatient(patient)
        })
        console.log(patientsFilter1)
        allPatients.value = []
        allPatients.value.push(patientsFilter1)
         console.log(allPatients)
});
*/
</script>
<style>

</style>

