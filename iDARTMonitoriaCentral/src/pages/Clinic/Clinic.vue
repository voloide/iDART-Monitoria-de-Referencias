<template>
  <q-page class="q-pa-sm q-gutter-sm">
    <clinicHome :is="activeClinicHome" v-model:title="titleList" />
    <ClinicDetailsVue :is="activeDetails" v-model:title="titleDetails" />
    <CreateEditClinic
      :is="true"
      v-model:createOrUpdate="createOrUpdate"
      v-model:close="close"
      v-model:clinic="clinic"
    />
    <div class="absolute-bottom">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          size="xl"
          fab
          icon="add"
          @click="createClinic()"
          color="primary"
        />
      </q-page-sticky>
    </div>
  </q-page>
</template>
<script setup>
import ClinicHome from 'src/components/Clinic/ClinicHome.vue';
import ClinicDetailsVue from 'src/components/Clinic/ClinicDetails.vue';
import CreateEditClinic from 'src/components/Clinic/ClinicCreateEditModal.vue';
import { provide, reactive, ref } from 'vue';
import clinicService from 'src/services/clinicService/clinicService';
import { confirm } from 'src/components/Shared/Directives/Plugins/Dialog/dialog';
import { useI18n } from 'vue-i18n';

/*
Declarations
*/
const { t } = useI18n();
const titleList = reactive(ref(t('pharmacy')));
const titleAddEdit = reactive(ref(t('pharmacy')));
const titleDetails = reactive(ref(t('pharmacy')));
const show_dialog = reactive(ref(false));
const details_dialog = reactive(ref(false));
const submitting = reactive(ref(false));
const activeEditDialog = reactive(ref(false));
const activeDetails = reactive(ref(false));
const activeClinicHome = reactive(ref(true));
const clinic = reactive(ref([]));
const editedIndex = reactive(ref(0));

/*
  Methods
*/
const createClinic = () => {
  titleAddEdit.value = t('add').concat(' ').concat(t('pharmacy'));
  clinic.value = reactive(clinicService.newInstanceEntity());
  activeEditDialog.value = true;
  show_dialog.value = true;
  editedIndex.value = 1;
};

const createOrUpdate = () => {
  submitting.value = true;
  if (editedIndex.value != 1) {
    clinicService
      .patch(clinic.value.id, clinic.value)
      .then(() => {
        submitting.value = false;
        close();
      })
      .catch(() => {
        submitting.value = false;
      });
  } else {
    delete clinic.value['id'];
    clinic.value.province = localStorage.getItem('province_name');
    clinicService
      .post(clinic.value)
      .then(() => {
        submitting.value = false;
        close();
      })
      .catch(() => {
        submitting.value = false;
      });
  }
};

const deleteClinic = (clinicRow) => {
  confirm(t('confirmation'), t('confirmationMessage'))
    .onOk(() => {
      deleteService(clinicRow);
    })
    .onCancel(() => {
      close();
    })
    .onDismiss(() => {
      close();
    });
};

const deleteService = (clinicRow) => {
  clinicService
    .delete(clinicRow.id)
    .then(() => {
      submitting.value = false;
      close();
    })
    .catch(() => {
      submitting.value = false;
    });
};

const editClinic = (clinicRow) => {
  titleAddEdit.value = t('edit').concat(' ').concat(t('pharmacy'));
  clinic.value = clinicRow;
  activeEditDialog.value = true;
  show_dialog.value = true;
  editedIndex.value = 0;
};

const viewClinic = (clinicRow) => {
  titleDetails.value = t('view').concat(' ').concat(t('pharmacy'));
  clinic.value = clinicRow;
  activeDetails.value = true;
  details_dialog.value = true;
};

const close = () => {
  activeDetails.value = false;
  show_dialog.value = false;
  details_dialog.value = false;
  activeEditDialog.value = false;
  clinic.value = [];
  editedIndex.value = -1;
};

provide('title', titleAddEdit);
provide('titleList', titleList);
provide('titleDetails', titleDetails);
provide('show_dialog', show_dialog);
provide('details_dialog', details_dialog);
provide('submitting', submitting);
provide('editClinic', editClinic);
provide('viewClinic', viewClinic);
provide('deleteClinic', deleteClinic);
provide('clinic', clinic);
provide('close', close);
</script>
