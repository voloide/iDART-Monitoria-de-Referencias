<template>
  <q-page class="q-pa-sm q-gutter-sm">
    <listClinic
      :columns="columns"
      :mode="mode"
      :with_downloadButton="true"
      :rows="allPrescription"
      :title="props.title"
      :with_actionRemoveButton="false"
      :with_actionEditButton="false"
      :with_actionDetailButton="false"
    />
    <prescriptionDetailsModal
      :is="true"
      :show_dialog="show_dialog"
      :prescription="prescription"
    />
  </q-page>
</template>
<script setup>
import { useQuasar, QSpinnerBall } from 'quasar';
import prescriptionService from 'src/services/prescriptionService/prescriptionService';
import { computed, onMounted, reactive, ref } from 'vue';
import listClinic from 'src/components/Shared/CRUD/TableListStatus.vue';
import prescriptionDetailsModal from 'src/components/prescription/PrescriptionDetailsModal.vue';
import moment from 'moment';

/*
Props
*/

const props = defineProps({
  title: {
    type: String,
  },
});

/*
Declarations
*/
const $q = new useQuasar();
const mode = reactive(ref('list'));
const prescription = ref({});
const show_dialog = reactive(ref(false));
const editedIndex = reactive(ref(0));
const columns = [
  {
    name: 'pickupdate',
    required: true,
    label: 'Data de levantamento',
    align: 'left',
    field: (row) => moment(row.pickupdate).format('DD-MM-YYYY'),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'drugname',
    align: 'left',
    label: 'Medicamento',
    field: (row) => row.drugname,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'qtyinhand',
    align: 'left',
    label: 'Quantidade (Frasco)',
    field: (row) => row.qtyinhand,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'duration',
    align: 'left',
    label: 'Duração (meses)',
    field: (row) => row.duration,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'dateexpectedstring',
    align: 'left',
    label: 'Data próximo levantamento',
    field: (row) => moment(row.dateexpectedstring).format('DD-MM-YYYY'),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'syncstatus',
    align: 'left',
    label: 'Estado',
    field: (row) => row.syncstatus,
    format: (val) => `${val}`,
    sortable: true,
  },
];
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
  getAllPrescriptionFromAPI(0);
});

/*
  Computed
*/

const allPrescription = computed(() => {
  return prescriptionService.getAllFromStorage();
});

/*
  Methods
*/

const getAllPrescriptionFromAPI = (offset) => {
  if (offset >= 0) {
    prescriptionService.get(offset);
  }
};
</script>
