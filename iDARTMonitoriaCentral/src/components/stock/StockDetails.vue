<template>
  <q-page class="q-pa-sm q-gutter-sm q-mx-xl">
  <div class="row q-my-md">
    <q-btn color="primary" icon="arrow_back" @click="$emit('goBack')" label="Voltar" />
  </div>
  <div class="row q-mx-xl">
    <div class="col-3 q-mx-md">
      <q-input readonly v-model="selectRecord.fnm" label="Código FNM" />
    </div>
    <div class="col q-mx-md">
      <q-input readonly v-model="selectRecord.drugname" label="Nome do Medicamento" />
    </div>
    <div class="col-3 q-mx-md">
      <q-input readonly v-model="selectRecord.balance" label="Saldo Actual" />
    </div>
  </div>
  <div class="q-mx-xl q-mt-lg">
    <stockTable
      :columns="columns"
      :mode="mode"
      :with_downloadButton="false"
      :with_actionDetailButton="false"
      :with_actionEditButton="false"
      :with_actionRemoveButton="false"
      :rows="stockDetails"
      title="Detalhes do Stock do Medicamento"
    />
  </div>
  </q-page>
</template>

<script setup>
  /*
    imports
  */
  import { computed, onMounted, inject, ref } from 'vue';
  import { useQuasar, QSpinnerBall } from 'quasar';
  import stockReportService from 'src/services/ReportServices/stock/stockReportService';
  import stockTable from 'src/components/Shared/CRUD/TableList.vue';
  import moment from 'moment'

  /*
    Declarations
  */
 const $q = new useQuasar();
 const columns = [
    { name: 'entranceDate', required: true, label: 'Data Entrada', align: 'left', field: (row) => moment(row.datereceived).format('DD-MM-YYYY'), format: (val) => `${val}`, sortable: true },
    { name: 'lote', align: 'left', label: 'Lote', field: (row) => row.lote, format: (val) => `${val}`, sortable: true },
    { name: 'guia', align: 'left', label: 'N do Guia de Entrega', field: (row) => row.lote, format: (val) => `${val}`, sortable: true },
    { name: 'startBalance', align: 'left', label: 'Saldo Inicial', field: (row) => row.initbalance, format: (val) => `${val}`, sortable: true },
    { name: 'balance', align: 'left', label: 'Saldo Actual', field: (row) => row.curbalance, format: (val) => `${val}`, sortable: true },
    { name: 'validade', align: 'left', label: 'Data Validade', field: (row) => moment(row.expirydate).format('DD-MM-YYYY'), format: (val) => `${val}`, sortable: true }
  ];
  const selectRecord = inject('selectRecord')

  /*
    emits
  */
 const emit = defineEmits(['goBack'])

/*
    Mounted Hooks
  */
  onMounted(() => {
    $q.loading.show({
      message: 'Carregando ...',
      spinnerColor: 'grey-4',
      spinner: QSpinnerBall,
    });
    setTimeout(() => {
      $q.loading.hide();
    }, 600);
      getStockDetailsFromAPI();
  });

  /*
    Computed
  */
  const stockDetails = computed(() => {
    const list =  stockReportService.getAllDetailsOfDrugFromStorage(selectRecord.value.drugid , selectRecord.value.clinicuuid);
    if (list.length <= 0) return []
    return list
  });

  /*
    Methods
  */
 const getStockDetailsFromAPI = () => {
    stockReportService.getDetails(selectRecord.value.drugid , selectRecord.value.clinicuuid);
  };
</script>

<style>

</style>
