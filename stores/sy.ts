import { defineStore } from 'pinia'
import axios from 'axios'

export const useMySyStore = defineStore({
  id: 'mySyStore',
  state: () => ({ 
    activeSY: []
  }),
  getters: {
    getActiveSY(state) {
      return state.activeSY
    }
  },
  actions: {
    async getActiveSchoolYear() {
      try {
        const result = await axios.get('/api/school-year/getActiveSchoolYear')
        if (result) {
          this.activeSY = result.data[0];
          localStorage.setItem("active-sy", JSON.stringify(result.data[0]))
          //return this.activeSY
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
})
