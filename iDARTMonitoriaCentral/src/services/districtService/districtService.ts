import { useRepo } from 'pinia-orm';
import District from 'src/stores/models/district/district';
import api from '../apiService/apiService';

const district = useRepo(District);

export default {
  // Axios API call
  post(params: string) {
    return api()
      .post('district', params)
      .then((resp) => {
        district.save(resp.data);
      });
  },
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('district?offset=' + offset + '&limit=100')
        .then((resp) => {
          district.save(resp.data);
          offset = offset + 100;
          if (resp.data.length > 0) {
            this.get(offset);
          }
        });
    }
  },
  getByProvinceId(offset: number) {
    if (offset >= 0) {
      return api()
        .get('district?offset=' + offset + '&limit=100')
        .then((resp) => {
          district.save(resp.data);
          offset = offset + 100;
          if (resp.data.length > 0) {
            setTimeout(this.get, 2);
          }
        });
    }
  },
  patch(id: number, params: string) {
    return api()
      .patch('district/' + id, params)
      .then((resp) => {
        district.save(resp.data);
      });
  },
  delete(id: number) {
    return api()
      .delete('district/' + id)
      .then(() => {
        district.destroy(id);
      });
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return district.getModel().$newInstance();
  },
  getAllFromStorage() {
    return district.all();
  },
  getAllProvinceFromStorage() {
    console.log(Number(localStorage.getItem('province_id')))
    return district
      .query()
      .where('province', Number(localStorage.getItem('province_id')))
      .get();
  },
  getDistrictFromStorage(id :number) {
   return district.query().whereId(id).first()
  }
};
