<template>
  <b-container fluid>
    <b-button style="margin: 10px;" v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <b-form>
            <b-form-group label="Jmeno:" label-for="input-2">
              <b-form-input
                v-model="newName"
                required
                placeholder="Jmeno"
              ></b-form-input>
            </b-form-group>
            <b-button @click="addWood" variant="primary">Submit</b-button>
          </b-form>
        </b-card>
      </b-collapse>
    <b-row>
      <b-table striped hover :items="WOODS" :fields="fields">
        <template #head(Name)="data">
          <div style="width: 140px; height: 120px; transform: translateX(15px)">{{ data.label }}</div>
        </template>
        <template #cell(Name)="data">
          <b-form-input @blur="updateUser(data.item)" v-model="data.item.name"></b-form-input>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Axios from 'axios'

export default {
  name: 'Wood',
  components: {},
  computed: {
    ...mapGetters(['WOODS'])
  },
  sockets: {
    wood: function (val) {
      console.log('PODARIOLO SEEEE')
      this.$store.dispatch('ADD_WOOD', val)
    }
  },
  mounted () {
    this.$store.dispatch('SET_WOOD')
  },
  data: () => ({
    newName: '',
    pridat: false,
    orders: null,
    fields: [
      { label: 'Name', key: 'Name' }
    ]
  }),
  methods: {
    async addWood () {
      await Axios.post('http://localhost:5000/wood', { name: this.newName, age: 20 })
    }
  }
}

</script>

<style>

.table td {
  width: 32px;
}

th {
transform: rotate(0deg) translateY(0px) translateX(0px);
}

</style>
