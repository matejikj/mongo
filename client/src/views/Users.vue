<template>
  <b-container fluid>
    <b-button style="margin: 10px" v-b-toggle.collapse-1 variant="primary"
      >Toggle Collapse</b-button
    >
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

          <b-form-group label="Heslo:" label-for="input-2">
            <b-form-input
              v-model="newPassword"
              required
              placeholder="Heslo"
            ></b-form-input>
          </b-form-group>

          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Archiv"
                  >Archiv</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Dokonceni"
                  >Dokonceni</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Dvere"
                  >Dvere</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Expedice"
                  >Expedice</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.IsAdmin"
                  >IsAdmin</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Klapacka"
                  >Klapacka</b-form-checkbox
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Kompletace"
                  >Kompletace</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Obchod"
                  >Obchod</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Oblozky"
                  >Oblozky</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Posuv"
                  >Posuv</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PrepisCisloZakazky"
                  >PrepisCisloZakazky</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PresunDoArchivu"
                  >PresunDoArchivu</b-form-checkbox
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PresunDoExpedice"
                  >PresunDoExpedice</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PresunDoVyroby"
                  >PresunDoVyroby</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Priprava"
                  >Priprava</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PripravarVyroby"
                  >PripravarVyroby</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PristupDrevo"
                  >PristupDrevo</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PristupHlinik"
                  >PristupHlinik</b-form-checkbox
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-checkbox v-model="checkboxes.PristupOcel"
                  >PristupOcel</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Ramecek"
                  >Ramecek</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Sklad"
                  >Sklad</b-form-checkbox
                >
              </b-col>
              <b-col>
                <b-form-checkbox v-model="checkboxes.Stredove"
                  >Stredove</b-form-checkbox
                >
              </b-col>
              <b-col> </b-col>
              <b-col> </b-col>
            </b-row>
          </b-container>
          <b-button @click="addUser" variant="primary">Submit</b-button>
        </b-form>
      </b-card>
    </b-collapse>
    <b-row style="overflow: scroll">
      <b-table striped hover :items="USERS" :fields="fields">
        <template #head(Delete)="data">
          <div style="width: 10px; height: 120px; transform: translateX(15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Delete)="data">
          <b-button @click="removeUser(data.item)" variant="outline-light" pill
            ><b-icon icon="trash" variant="danger"></b-icon
          ></b-button>
        </template>
        <template #head(Username)="data">
          <div style="width: 140px; height: 120px; transform: translateX(15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Username)="data">
          <b-form-input
            @blur="updateUser(data.item)"
            v-model="data.item.Username"
          ></b-form-input>
        </template>
        <template #head(Password)="data">
          <div style="width: 120px; height: 120px; transform: translateX(15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Password)="data">
          <b-form-input
            @blur="updateUser(data.item)"
            v-model="data.item.Password"
          ></b-form-input>
        </template>
        <template #head(Archiv)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Archiv)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Archiv"
          ></b-form-checkbox>
        </template>

        <template #head(Dokonceni)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Dokonceni)="data">
          <b-form-checkbox
            @change="updateUser(data.item)"
            size="lg"
            v-model="data.item.Dokonceni"
          ></b-form-checkbox>
        </template>

        <template #head(Dvere)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Dvere)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Dvere"
          ></b-form-checkbox>
        </template>

        <template #head(Expedice)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Expedice)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Expedice"
          ></b-form-checkbox>
        </template>
        <template #head(IsAdmin)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(IsAdmin)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.IsAdmin"
          ></b-form-checkbox>
        </template>
        <template #head(Klapacka)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Klapacka)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Klapacka"
          ></b-form-checkbox>
        </template>
        <template #head(Kompletace)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Kompletace)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Kompletace"
          ></b-form-checkbox>
        </template>
        <template #head(Obchod)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Obchod)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Obchod"
          ></b-form-checkbox>
        </template>
        <template #head(Oblozky)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Oblozky)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Oblozky"
          ></b-form-checkbox>
        </template>
        <template #head(Posuv)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Posuv)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Posuv"
          ></b-form-checkbox>
        </template>
        <template #head(PrepisCisloZakazky)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PrepisCisloZakazky)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PrepisCisloZakazky"
          ></b-form-checkbox>
        </template>
        <template #head(PresunDoArchivu)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PresunDoArchivu)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PresunDoArchivu"
          ></b-form-checkbox>
        </template>
        <template #head(PresunDoExpedice)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PresunDoExpedice)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PresunDoExpedice"
          ></b-form-checkbox>
        </template>
        <template #head(PresunDoVyroby)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PresunDoVyroby)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PresunDoVyroby"
          ></b-form-checkbox>
        </template>
        <template #head(Priprava)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Priprava)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Priprava"
          ></b-form-checkbox>
        </template>
        <template #head(PripravarVyroby)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PripravarVyroby)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PripravarVyroby"
          ></b-form-checkbox>
        </template>
        <template #head(PristupDrevo)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PristupDrevo)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PristupDrevo"
          ></b-form-checkbox>
        </template>
        <template #head(PristupHlinik)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PristupHlinik)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PristupHlinik"
          ></b-form-checkbox>
        </template>
        <template #head(PristupOcel)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PristupOcel)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.PristupOcel"
          ></b-form-checkbox>
        </template>
        <template #head(Ramecek)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Ramecek)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Ramecek"
          ></b-form-checkbox>
        </template>
        <template #head(Sklad)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Sklad)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Sklad"
          ></b-form-checkbox>
        </template>
        <template #head(Stredove)="data">
          <div style="width: 25px; height: 120px; transform: translateX(-15px)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Stredove)="data">
          <b-form-checkbox
            @input="updateUser(data.item)"
            size="lg"
            v-model="data.item.Stredove"
          ></b-form-checkbox>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Axios from 'axios'

export default {
  name: 'User',
  components: {},
  sockets: {
    userAdded: function (val) {
      console.log('add')
      this.$store.dispatch('ADD_USER', val)
      // this.addUserList(val)
    },
    userUpdated: function (val) {
      console.log('up')
      this.$store.dispatch('PUT_USER', val)
      // this.updateUserList(val)
    },
    userDeleted: function (val) {
      console.log('del')
      this.$store.dispatch('DELETE_USER', val)
      // this.removeUserList(val)
    }
  },
  computed: {
    ...mapGetters(['USERS'])
  },
  mounted () {
    this.$store.dispatch('SET_USER')
  },
  data: () => ({
    newName: '',
    newPassword: '',
    pridat: false,
    checkboxes: {
      Archiv: false,
      Dokonceni: false,
      Dvere: false,
      Expedice: false,
      IsAdmin: false,
      Klapacka: false,
      Kompletace: false,
      Obchod: false,
      Oblozky: false,
      Posuv: false,
      PrepisCisloZakazky: false,
      PresunDoArchivu: false,
      PresunDoExpedice: false,
      PresunDoVyroby: false,
      Priprava: false,
      PripravarVyroby: false,
      PristupDrevo: false,
      PristupHlinik: false,
      PristupOcel: false,
      Ramecek: false,
      Sklad: false,
      Stredove: false
    },
    fields: [
      { label: '', key: 'Delete' },
      { label: 'Username', key: 'Username' },
      { label: 'Password', key: 'Password' },
      { label: 'Archiv', key: 'Archiv' },
      { label: 'Dokonceni', key: 'Dokonceni' },
      { label: 'Dvere', key: 'Dvere' },
      { label: 'Expedice', key: 'Expedice' },
      { label: 'IsAdmin', key: 'IsAdmin' },
      { label: 'Klapacka', key: 'Klapacka' },
      { label: 'Kompletace', key: 'Kompletace' },
      { label: 'Obchod', key: 'Obchod' },
      { label: 'Oblozky', key: 'Oblozky' },
      { label: 'Posuv', key: 'Posuv' },
      { label: 'PrepisCisloZakazky', key: 'PrepisCisloZakazky' },
      { label: 'PresunDoArchivu', key: 'PresunDoArchivu' },
      { label: 'PresunDoExpedice', key: 'PresunDoExpedice' },
      { label: 'PresunDoVyroby', key: 'PresunDoVyroby' },
      { label: 'Priprava', key: 'Priprava' },
      { label: 'PripravarVyroby', key: 'PripravarVyroby' },
      { label: 'PristupDrevo', key: 'PristupDrevo' },
      { label: 'PristupHlinik', key: 'PristupHlinik' },
      { label: 'PristupOcel', key: 'PristupOcel' },
      { label: 'Ramecek', key: 'Ramecek' },
      { label: 'Sklad', key: 'Sklad' },
      { label: 'Stredove', key: 'Stredove' }
    ]
  }),
  methods: {
    async updateUser (item) {
      await Axios.put('http://localhost:5000/user', item)
    },
    async removeUser (item) {
      await Axios.delete('http://localhost:5000/user/' + item._id)
    },
    async addUser () {
      await Axios.post('http://localhost:5000/user', {
        Password: this.newPassword,
        Username: this.newName,
        Archiv: false,
        Dokonceni: false,
        Dvere: false,
        Expedice: false,
        IsAdmin: false,
        Klapacka: false,
        Kompletace: false,
        Obchod: false,
        Oblozky: false,
        Posuv: false,
        PrepisCisloZakazky: false,
        PresunDoArchivu: false,
        PresunDoExpedice: false,
        PresunDoVyroby: false,
        Priprava: false,
        PripravarVyroby: false,
        PristupDrevo: false,
        PristupHlinik: false,
        PristupOcel: false,
        Ramecek: false,
        Sklad: false,
        Stredove: false
      })
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
