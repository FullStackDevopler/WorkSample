"use strict";
import axios from 'axios';
class globalHelper {
  constructor() {
  }
  async fetchData(url) {
    try {
      const response = await axios.get(url);
      const playerData = response.data;
      return playerData.epl_table
    } catch (error) {
      return error
    }
  }
}
export default globalHelper;