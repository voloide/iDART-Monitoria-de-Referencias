<template>
  <div ref="filterDrugStoreSection">
    <Bar
      :addVisible="false"
      :mainContainer="true"
      :closeVisible="true"
      @closeSection="closeSection"
      bgColor="bg-orange-5"
    >
      {{ title }}
    </Bar>
    <div class="param-container">
      <q-item>
        <q-item-section class="col">
          <FiltersInput @generateReport="generateReport" />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup>
/*
  Imports
  */
// import reportService from 'src/services/ReportServices/reportService';
import { ref } from 'vue';
import FiltersInput from 'src/components/Reports/Shared/FiltersInput.vue';
import Bar from 'src/components/Shared/Bar.vue';
import reportDispenseDrugRegimen from 'src/services/ReportServices/dispenseDrugRegimen/reportDispenseDrugRegimen';
import moment from 'moment'

const title = ref('Lista de Dispensas por Frasco e Regime');

const generateReport = (params) => {
  reportDispenseDrugRegimen.downloadPDF(
    null,
    params.value.province.name,
    moment(params.value.startDate,'DD-MM-YYYY').format('DD/MM/YYYY'),
    moment(params.value.endDate,'DD-MM-YYYY').format('DD/MM/YYYY'),
    params
  );
};

const filterDrugStoreSection = ref(null);
const closeSection = () => {
  filterDrugStoreSection.value.remove();
};
</script>

<style lang="scss" scoped>
.param-container {
  border-bottom: 1px dashed $grey-13;
  border-left: 1px dashed $grey-13;
  border-right: 1px dashed $grey-13;
  border-radius: 0px 0px 5px 5px;
}
</style>
