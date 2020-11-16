<template>
  <b-container fluid>
    <b-row style="padding: 10px;">
      <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mx-1">
          <b-button>Odstranit</b-button>
          <b-button>Přesun řádku</b-button>
          <b-button>Archiv</b-button>
          <b-button>Expedice</b-button>
          <b-button>Obnovit</b-button>
          <b-button>Vrátit do obchodu</b-button>
          <b-button>Vytisknout</b-button>
          <b-button>Prázdný řádek</b-button>
        </b-button-group>
        <b-button-group right class="ml-auto">
          <b-form-input v-model="finder" placeholder="Co hledat..."></b-form-input>
          <b-button @click="onSubmit">Hledej</b-button>
        </b-button-group>
      </b-button-toolbar>
      <!-- <b-col cols="6"></b-col>
      <b-col cols="3"></b-col>
      <b-col cols="2">
        <b-form-input id="finder" placeholder="Co hledat..."></b-form-input>
      </b-col>
      <b-col cols="1">
        <b-btn>Vyhledej</b-btn>
      </b-col> -->
    </b-row>
    <b-row>
      <b-table
        style="height: 55vh"
        responsive bordered hover
        sortable :filter="filter"
        :items="orders" :fields="fields"
        selectable
        :select-mode="selectMode"
        @row-selected="onRowSelected"
      >
        <template #head(SortNr)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(SortNr)="data">
          {{ data.item.SortNr }}
        </template>
        <template #head(ZahajeniDatum)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(ZahajeniDatum)="data">
          <div style="width: 140px; height: 20px;">
            <b-form-datepicker
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              right id="example-datepicker" size="sm" locale="cs"
              v-model="data.item.ZahajeniDatum"
            ></b-form-datepicker>
          </div>
        </template>
        <template #head(Technik)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Technik)="data">
          {{ data.item.Technik }}
        </template>

        <template #head(Zakazka)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(Zakazka)="data">
          <div style="height:100%; padding: 1em; width: 100%;" :style="{background: data.item.ZakazkaColor}" v-on:dblclick="doubleClick">
            {{ data.item.Zakazka }}
          </div>
        </template>

        <template #head(Poznamky)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Poznamky)="data">
          <b-form-input
            :id="'poznamky' + data.item.SortNr"
            @blur="updateOrder(data.item)"
            v-model="data.item.Poznamky"
          ></b-form-input>
          <b-tooltip :target="'poznamky' + data.item.SortNr" :title="data.item.Poznamky">
            {{ data.item.Poznamky }}
          </b-tooltip>
        </template>

        <template #cell(Material)="data">
          <div :id="'material' + data.item.SortNr" style="white-space:nowrap; overflow: hidden; width: 140px;">
            {{ data.item.Material }}
          </div>
          <b-tooltip :target="'material' + data.item.SortNr" :title="data.item.Material">
            {{ data.item.Material }}
          </b-tooltip>
        </template>
        <template #head(Material)="data">
          <div>
            {{ data.label }}
          </div>
        </template>

        <template #head(ZakazkaNr)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(ZakazkaNr)="data">
          <div>
            {{ data.item.ZakazkaNr }}
          </div>
        </template>

        <template #head(VyrobniNr)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(VyrobniNr)="data">
          <div>
            {{ data.item.VyrobniNr }}
          </div>
        </template>

        <template #head(Priprava)="data">
          <div @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(Priprava)="data">
          <div style="height:100%; padding: 1em; width: 100%;" :style="{background: data.item.PripravaC}">
            {{ data.item.Priprava }}
          </div>
        </template>

        <template #head(InDoca)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(InDoca)="data">
          <div style="height:100%; width: 100%;" :style="{background: data.item.InDocaC}">
            {{ data.item.InDoca }}
          </div>
        </template>

        <template #head(Dokumentace)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(Dokumentace)="data">
          <div style="height:100%; padding: 1em; width: 100%;" :style="{background: data.item.DokumentaceC}">
            {{ data.item.Dokumentace }}
          </div>
        </template>

        <template #head(PozadovanyDatum)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(PozadovanyDatum)="data">
          <div style="width: 140px; height: 20px;">
            <b-form-datepicker
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              right id="example-datepicker" size="sm" locale="cs"
              v-model="data.item.PozadovanyDatum"
            ></b-form-datepicker>
          </div>
        </template>

        <template #head(DokonceniDatum)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(DokonceniDatum)="data">
          <div style="width: 140px; height: 20px;">
            <b-form-datepicker
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              right id="example-datepicker" size="sm" locale="cs"
              v-model="data.item.DokonceniDatum"
            ></b-form-datepicker>
          </div>
        </template>
      </b-table>
    </b-row>
    <b-row>
      <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mx-1">
          <b-button>Otevřít obchod</b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-row>
    <b-row>
      <b-table
        responsive bordered hover
        sortable :filter="filter"
        :items="newOrders" :fields="fields"
        selectable style="height: 30vh"
        :select-mode="selectMode"
        @row-selected="onRowSelected"
      >
        <template #head(SortNr)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(SortNr)="data">
          {{ data.item.SortNr }}
        </template>
        <template #head(ZahajeniDatum)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(ZahajeniDatum)="data">
          <div style="width: 140px; height: 20px;">
            <b-form-datepicker
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              right id="example-datepicker" size="sm" locale="cs"
              v-model="data.item.ZahajeniDatum"
            ></b-form-datepicker>
          </div>
        </template>
        <template #head(Technik)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Technik)="data">
          {{ data.item.Technik }}
        </template>

        <template #head(Zakazka)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(Zakazka)="data">
          <div style="height:100%; padding: 1em; width: 100%;" :style="{background: data.item.ZakazkaColor}" v-on:dblclick="doubleClick">
            {{ data.item.Zakazka }}
          </div>
        </template>

        <template #head(Poznamky)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Poznamky)="data">
          <b-form-input
            :id="'poznamky' + data.item.SortNr"
            @blur="updateOrder(data.item)"
            v-model="data.item.Poznamky"
          ></b-form-input>
          <b-tooltip :target="'poznamky' + data.item.SortNr" :title="data.item.Poznamky">
            {{ data.item.Poznamky }}
          </b-tooltip>
        </template>

        <template #cell(Material)="data">
          <div :id="'material' + data.item.SortNr" style="white-space:nowrap; overflow: hidden; width: 140px;">
            {{ data.item.Material }}
          </div>
          <b-tooltip :target="'material' + data.item.SortNr" :title="data.item.Material">
            {{ data.item.Material }}
          </b-tooltip>
        </template>
        <template #head(Material)="data">
          <div>
            {{ data.label }}
          </div>
        </template>

        <template #head(ZakazkaNr)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(ZakazkaNr)="data">
          <div>
            {{ data.item.ZakazkaNr }}
          </div>
        </template>

        <template #head(VyrobniNr)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(VyrobniNr)="data">
          <div>
            {{ data.item.VyrobniNr }}
          </div>
        </template>

        <template #head(Priprava)="data">
          <div @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(Priprava)="data">
          <div style="height:100%; padding: 1em; width: 100%;" :style="{background: data.item.PripravaC}">
            {{ data.item.Priprava }}
          </div>
        </template>

        <template #head(InDoca)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(InDoca)="data">
          <div style="height:100%; width: 100%;" :style="{background: data.item.InDocaC}">
            {{ data.item.InDoca }}
          </div>
        </template>

        <template #head(Dokumentace)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template style="padding: 1em;" #cell(Dokumentace)="data">
          <div style="height:100%; padding: 1em; width: 100%;" :style="{background: data.item.DokumentaceC}">
            {{ data.item.Dokumentace }}
          </div>
        </template>

        <template #head(PozadovanyDatum)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(PozadovanyDatum)="data">
          <div style="width: 140px; height: 20px;">
            <b-form-datepicker
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              right id="example-datepicker" size="sm" locale="cs"
              v-model="data.item.PozadovanyDatum"
            ></b-form-datepicker>
          </div>
        </template>

        <template #head(DokonceniDatum)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(DokonceniDatum)="data">
          <div style="width: 140px; height: 20px;">
            <b-form-datepicker
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              right id="example-datepicker" size="sm" locale="cs"
              v-model="data.item.DokonceniDatum"
            ></b-form-datepicker>
          </div>
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
  sockets: {
    orderAdded: function (val) {
      console.log('add')
      this.$store.dispatch('ADD_ORDER', val)
      // this.addUserList(val)
    },
    orderUpdated: function (val) {
      console.log('up')
      this.$store.dispatch('PUT_ORDER', val)
      // this.updateUserList(val)
    },
    orderDeleted: function (val) {
      console.log('del')
      this.$store.dispatch('DELETE_ORDER', val)
      // this.removeUserList(val)
    }
  },
  computed: {
    orders () {
      return this.$store.state.orders.filter(todo => todo.Department === 1 && todo.IsInProccess).sort((a, b) => a.SortNr - b.SortNr)
    },
    newOrders () {
      return this.$store.state.orders.filter(todo => todo.Department === 1 && !todo.IsInProccess).sort((a, b) => a.SortNr - b.SortNr)
    }
  },
  mounted () {
    this.$store.dispatch('SET_ORDER')
  },
  data: () => ({
    selectMode: 'multi',
    selected: [],
    filter: '',
    finder: '',
    Priprava: false,
    Oblozky: false,
    Stredove: false,
    Ramecek: false,
    Klapacka: false,
    Posuv: false,
    Dvere: false,
    Dokonceni: false,
    Kompletace: false,
    Sklad: false,
    cellHeight: '100%',
    newName: '',
    newPassword: '',
    fields: [
      { label: ' ', key: 'SortNr' },
      { label: 'ZahajeniDatum', key: 'ZahajeniDatum' },
      { label: 'Technik', key: 'Technik' },
      {
        label: 'Zakazka',
        filterByFormatted: true,
        key: 'Zakazka',
        sortable: true,
        formatter: (value, key, item) => {
          return item.first_name + ' ' + item.last_name
        }
      },
      { label: 'Poznamky', key: 'Poznamky' },
      { label: 'Material', key: 'Material' },
      { label: 'ZakazkaNr', key: 'ZakazkaNr' },
      { label: 'VyrobniNr', key: 'VyrobniNr' },
      { label: 'Doc', key: 'Doc' },
      { label: 'EditDocPath', key: 'EditDocPath' },
      { label: 'KridlaText', key: 'KridlaText' },
      { label: 'ZarubneText', key: 'ZarubneText' },
      { label: 'PlosnyMaterial', key: 'PlosnyMaterial' },
      { label: 'Priprava', group: 'Priprava', key: 'Priprava' },
      { label: 'Dokumentace', group: 'Priprava', thClass: 'd-none', tdClass: 'd-none', key: 'Stredove' },
      { label: 'InDoca', group: 'Priprava', thClass: 'd-none', tdClass: 'd-none', key: 'InDoca' },
      { label: 'Oblozky', group: 'Oblozky', key: 'Oblozky' },
      { label: 'ObalovatOblozky', group: 'Oblozky', thClass: 'd-none', tdClass: 'd-none', key: 'ObalovatOblozky' },
      { label: 'RezatOblozky', group: 'Oblozky', thClass: 'd-none', tdClass: 'd-none', key: 'RezatOblozky' },
      { label: 'CncOblozky', group: 'Oblozky', thClass: 'd-none', tdClass: 'd-none', key: 'CncOblozky' },
      { label: 'Stredove', group: 'Stredove', key: 'Stredove' },
      { label: 'CentrumStredove', group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'CentrumStredove' },
      { label: 'LisStredove', group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'LisStredove' },
      { label: 'OlepovaniStredove', group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'OlepovaniStredove' },
      { label: 'FrezovaniStredove', group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'FrezovaniStredove' },
      { label: 'Ramecek', group: 'Ramecek', key: 'Ramecek' },
      { label: 'TypRamecek', group: 'Ramecek', thClass: 'd-none', tdClass: 'd-none', key: 'TypRamecek' },
      { label: 'ObalovaniRamecek', group: 'Ramecek', thClass: 'd-none', tdClass: 'd-none', key: 'ObalovaniRamecek' },
      { label: 'RezaniRamecek', group: 'Ramecek', thClass: 'd-none', tdClass: 'd-none', key: 'RezaniRamecek' },
      { label: 'Klapacka', group: 'Klapacka', key: 'Klapacka' },
      { label: 'ObalovaniKlapacka', group: 'Klapacka', thClass: 'd-none', tdClass: 'd-none', key: 'ObalovaniKlapacka' },
      { label: 'RezaniKlapacka', group: 'Klapacka', thClass: 'd-none', tdClass: 'd-none', key: 'RezaniKlapacka' },
      { label: 'Posuv', group: 'Posuv', key: 'Posuv' },
      { label: 'HranolPosuv', group: 'Posuv', thClass: 'd-none', tdClass: 'd-none', key: 'HranolPosuv' },
      { label: 'GarnyzPosuv', group: 'Posuv', thClass: 'd-none', tdClass: 'd-none', key: 'GarnyzPosuv' },
      { label: 'DorazovaPosuv', group: 'Posuv', thClass: 'd-none', tdClass: 'd-none', key: 'DorazovaPosuv' },
      { label: 'Dvere', group: 'Dvere', key: 'Dvere' },
      { label: 'CentrumDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'CentrumDvere' },
      { label: 'KorpusyDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'KorpusyDvere' },
      { label: 'SesazenkyDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'SesazenkyDvere' },
      { label: 'LisDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'LisDvere' },
      { label: 'FormatkaDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'FormatkaDvere' },
      { label: 'OlepovackaDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'OlepovackaDvere' },
      { label: 'CncDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'CncDvere' },
      { label: 'PgmDvere', group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'PgmDvere' },
      { label: 'Dokonceni', group: 'Dokonceni', key: 'Dokonceni' },
      { label: 'BrouseniDyhaDokonceni', group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'BrouseniDyhaDokonceni' },
      { label: 'ZakladDokonceni', group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'ZakladDokonceni' },
      { label: 'BrouseniZakladDokonceni', group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'BrouseniZakladDokonceni' },
      { label: 'VrchDokonceni', group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'VrchDokonceni' },
      { label: 'Kompletace', group: 'Kompletace', key: 'Kompletace' },
      { label: 'DvereKompletace', group: 'Kompletace', thClass: 'd-none', tdClass: 'd-none', key: 'DvereKompletace' },
      { label: 'ZarubenKompletace', group: 'Kompletace', thClass: 'd-none', tdClass: 'd-none', key: 'ZarubenKompletace' },
      { label: 'Sklad', group: 'Sklad', key: 'Sklad' },
      { label: 'KovaniSklad', group: 'Sklad', thClass: 'd-none', tdClass: 'd-none', key: 'KovaniSklad' },
      { label: 'SkloSklad', group: 'Sklad', thClass: 'd-none', tdClass: 'd-none', key: 'SkloSklad' },
      { label: 'PozadovanyDatum', key: 'PozadovanyDatum' },
      { label: 'DokonceniDatum', key: 'DokonceniDatum' },
      { label: 'Mesto', key: 'Mesto' },
      { label: 'Map', key: 'Map' },
      { label: 'HotovoBloky', key: 'HotovoBloky' }
    ]
  }),
  methods: {
    onRowSelected (items) {
      console.log(items)
      this.selected = items
    },
    onSubmit (data) {
      this.filter = this.finder
    },
    updateColor () {
      console.log('AAA')
    },
    updateOrder (data) {
      /*
        v-on:dblclick="doubleClick(data.item)"
      */
      alert('UP')
    },
    doubleClick (data) {
      /*
        v-on:dblclick="doubleClick(data.item)"
      */
      alert('DBL')
    },
    toggleHeader (data) {
      const a = this.fields.filter(x => x.group === data)
      if (!this[data]) {
        for (let i = 1; i < a.length; i++) {
          a[i].thClass = ''
          a[i].tdClass = ''
        }
      } else {
        for (let i = 1; i < a.length; i++) {
          a[i].thClass = 'd-none'
          a[i].tdClass = 'd-none'
        }
      }
      this[data] = !this[data]
    },
    async updateUser (item) {
      await Axios.put('http://localhost:5000/order', item)
    },
    async removeUser (item) {
      await Axios.delete('http://localhost:5000/order/' + item._id)
    },
    async addUser () {
      await Axios.post('http://localhost:5000/order', {
      })
    }
  }
}

</script>

<style>

.table td {
  padding: 0px;
}

.table th {
}

</style>
