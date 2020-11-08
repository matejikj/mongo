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
      <b-table striped hover :items="users" :fields="fields">
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
      this.addUserList(val)
    },
    userUpdated: function (val) {
      console.log('up')
      this.updateUserList(val)
    },
    userDeleted: function (val) {
      console.log('del')
      this.removeUserList(val)
    }
  },
  mounted () {
    this.getUsers()
  },
  data: () => ({
    users: [],
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
    updateUserList (payload) {
      const i = this.users.findIndex(element => element._id === payload._id)
      this.users[i].Password = payload.Password
      this.users[i].Username = payload.Username
      this.users[i].Archiv = payload.Archiv
      this.users[i].Dokonceni = payload.Dokonceni
      this.users[i].Dvere = payload.Dvere
      this.users[i].Expedice = payload.Expedice
      this.users[i].IsAdmin = payload.IsAdmin
      this.users[i].Klapacka = payload.Klapacka
      this.users[i].Kompletace = payload.Kompletace
      this.users[i].Obchod = payload.Obchod
      this.users[i].Oblozky = payload.Oblozky
      this.users[i].Posuv = payload.Posuv
      this.users[i].PrepisCisloZakazky = payload.PrepisCisloZakazky
      this.users[i].PresunDoArchivu = payload.PresunDoArchivu
      this.users[i].PresunDoExpedice = payload.PresunDoExpedice
      this.users[i].PresunDoVyroby = payload.PresunDoVyroby
      this.users[i].Priprava = payload.Priprava
      this.users[i].PripravarVyroby = payload.PripravarVyroby
      this.users[i].PristupDrevo = payload.PristupDrevo
      this.users[i].PristupHlinik = payload.PristupHlinik
      this.users[i].PristupOcel = payload.PristupOcel
      this.users[i].Ramecek = payload.Ramecek
      this.users[i].Sklad = payload.Sklad
      this.users[i].Stredove = payload.Stredove
    },
    removeUserList (payload) {
      const i = this.users.findIndex(element => element._id === payload.documentKey._id)
      this.users.splice(i, 1)
    },
    addUserList (payload) {
      this.users.push(payload)
    },
    async getUsers () {
      const { data } = await Axios.get('http://localhost:5000/user')
      this.users = data
    },
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
