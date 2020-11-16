<template>
  <div class="home">
    <!-- <b-btn @click="addOrders">Nahraj</b-btn> -->
  </div>
</template>

<script>
import { datasets } from '../../data'
import Axios from 'axios'

export default {
  name: 'Home',
  components: {
  },
  methods: {
    // async addOrders (item) {
    //   datasets.orders.forEach(async (element) => {
    //     await Axios.post('http://localhost:5000/order', element)
    //     console.log('PRIDANO')
    //   })
    // }
  }
}
</script>
