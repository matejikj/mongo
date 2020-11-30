<template>
  <b-container class="mujContainer" fluid>
    <b-modal id="pododdeleni-modal">
      <b-form-input v-model="pododdeleniText" placeholder="Co hledat"></b-form-input>
      <verte picker="square" model="rgb"></verte>
    </b-modal>
    <b-modal
      @ok="moveRow"
      id="presun-modal">
      <b-form-input v-model="presunText" placeholder=""></b-form-input>
    </b-modal>
    <b-modal
      @ok="createOrder"
      id="new-order-modal">
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
          <b-col sm="6">
            <div>Datum zahájení:</div>
            <b-form-input v-model="newOrder.datumZahajeni"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <b-row>
      <b-button-toolbar responsive aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group>
          <b-button style="margin: 2px;">Odstranit</b-button>
          <b-button @click="moveRowToggle" style="margin: 2px;">Přesun řádku</b-button>
          <b-button style="margin: 2px;">Archiv</b-button>
          <b-button style="margin: 2px;">Expedice</b-button>
        </b-button-group>
        <b-button-group>
          <b-button style="margin: 2px;">Obnovit</b-button>
          <b-button @click="orderUnprocess" style="margin: 2px;">Vrátit do obchodu</b-button>
          <b-button style="margin: 2px;">Vytisknout</b-button>
          <b-button style="margin: 2px;">Prázdný řádek</b-button>
        </b-button-group>
        <b-button-group>
          <b-form-input style="margin: 5px;" v-model="finder" placeholder="Co hledat..."></b-form-input>
          <b-button style="margin: 5px;" @click="onSubmit">Hledej</b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-row>
    <b-row>
      <b-table
        id="mojeTable"
        sticky-header
        v-bind:style="{ height: pripravaHeight + 'vh', padding: '0px', maxHeight: '84vh' }"
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
          <div style="width: 140px;">
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
        <template #cell(Zakazka)="data">
          <div :style="{background: data.item.ZakazkaColor}" v-on:dblclick="doubleClick">
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
          {{ data.label }}
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

        <template #head(Doc)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Doc)="data">
          <b-button @click="showDoc(data.item)" variant="outline-light" pill>
            <b-icon icon="file-earmark-text" variant="dark"></b-icon>
          </b-button>
        </template>

        <template #head(EditDocPath)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(EditDocPath)="data">
          <b-button @click="showEditDocPath(data.item)" variant="outline-light" pill>
            <b-icon icon="file-earmark-text" variant="dark"></b-icon>
          </b-button>
        </template>

        <template #cell(PlosnyMaterial)="data">
          <div :id="'plosnyMaterial' + data.item.SortNr" style="white-space:nowrap; overflow: hidden; width: 140px;">
            {{ data.item.PlosnyMaterial }}
          </div>
          <b-tooltip :target="'plosnyMaterial' + data.item.SortNr" :title="data.item.PlosnyMaterial">
            {{ data.item.PlosnyMaterial }}
          </b-tooltip>
        </template>
        <template #head(PlosnyMaterial)="data">
          <div>
            {{ data.label }}
          </div>
        </template>

        <template #head(Priprava)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Priprava)="data">
          <div :id="'Priprava' + data.item.SortNr"
            :style="{background: data.item.PripravaC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Priprava }}
          </div>
          <b-tooltip :target="'Priprava' + data.item.SortNr"
            :title="data.item.Priprava"
          >
            {{ data.item.Priprava }}
          </b-tooltip>
        </template>
        <template #head(Dokumentace)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Dokumentace)="data">
          <div :id="'Dokumentace' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.DokumentaceC}"
          >
            {{ data.item.Dokumentace }}
          </div>
          <b-tooltip :target="'Dokumentace' + data.item.SortNr"
            :title="data.item.Dokumentace"
          >
            {{ data.item.Dokumentace }}
          </b-tooltip>
        </template>
        <template #head(InDoca)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(InDoca)="data">
          <div :id="'InDoca' + data.item.SortNr" class="pododdeleni"
            @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.InDocaC}"
          >
            {{ data.item.InDoca }}
          </div>
          <b-tooltip :target="'InDoca' + data.item.SortNr"
            :title="data.item.InDoca">
            {{ data.item.InDoca }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->
        <template #head(Oblozky)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Oblozky)="data">
          <div :id="'Oblozky' + data.item.SortNr"
            :style="{background: data.item.OblozkyC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Oblozky }}
          </div>
          <b-tooltip :target="'Oblozky' + data.item.SortNr"
            :title="data.item.Oblozky"
          >
            {{ data.item.Oblozky }}
          </b-tooltip>
        </template>
        <template #head(ObalovatOblozky)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(ObalovatOblozky)="data">
          <div :id="'ObalovatOblozky' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.ObalovatOblozkyC}"
          >
            {{ data.item.ObalovatOblozky }}
          </div>
          <b-tooltip :target="'ObalovatOblozky' + data.item.SortNr"
            :title="data.item.ObalovatOblozky"
          >
            {{ data.item.ObalovatOblozky }}
          </b-tooltip>
        </template>
        <template #head(RezatOblozky)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(RezatOblozky)="data">
          <div :id="'RezatOblozky' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.RezatOblozkyC}"
          >
            {{ data.item.RezatOblozky }}
          </div>
          <b-tooltip :target="'RezatOblozky' + data.item.SortNr"
            :title="data.item.RezatOblozky"
          >
            {{ data.item.RezatOblozky }}
          </b-tooltip>
        </template>
        <template #head(CncOblozky)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(CncOblozky)="data">
          <div :id="'CncOblozky' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.CncOblozkyC}"
          >
            {{ data.item.CncOblozky }}
          </div>
          <b-tooltip :target="'CncOblozky' + data.item.SortNr"
            :title="data.item.CncOblozky"
          >
            {{ data.item.CncOblozky }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Stredove)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Stredove)="data">
          <div :id="'Stredove' + data.item.SortNr"
            :style="{background: data.item.StredoveC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Stredove }}
          </div>
          <b-tooltip :target="'Stredove' + data.item.SortNr"
            :title="data.item.Stredove"
          >
            {{ data.item.Stredove }}
          </b-tooltip>
        </template>
        <template #head(CentrumStredove)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(CentrumStredove)="data">
          <div :id="'CentrumStredove' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.CentrumStredoveC}"
          >
            {{ data.item.CentrumStredove }}
          </div>
          <b-tooltip :target="'CentrumStredove' + data.item.SortNr"
            :title="data.item.CentrumStredove"
          >
            {{ data.item.CentrumStredove }}
          </b-tooltip>
        </template>
        <template #head(LisStredove)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(LisStredove)="data">
          <div :id="'LisStredove' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.LisStredoveC}"
          >
            {{ data.item.LisStredove }}
          </div>
          <b-tooltip :target="'LisStredove' + data.item.SortNr"
            :title="data.item.LisStredove"
          >
            {{ data.item.LisStredove }}
          </b-tooltip>
        </template>
        <template #head(OlepovaniStredove)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(OlepovaniStredove)="data">
          <div :id="'OlepovaniStredove' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.OlepovaniStredoveC}"
          >
            {{ data.item.OlepovaniStredove }}
          </div>
          <b-tooltip :target="'OlepovaniStredove' + data.item.SortNr"
            :title="data.item.OlepovaniStredove"
          >
            {{ data.item.OlepovaniStredove }}
          </b-tooltip>
        </template>
        <template #head(FrezovaniStredove)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(FrezovaniStredove)="data">
          <div :id="'FrezovaniStredove' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.FrezovaniStredoveC}"
          >
            {{ data.item.FrezovaniStredove }}
          </div>
          <b-tooltip :target="'FrezovaniStredove' + data.item.SortNr"
            :title="data.item.FrezovaniStredove"
          >
            {{ data.item.FrezovaniStredove }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Ramecek)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Ramecek)="data">
          <div :id="'Ramecek' + data.item.SortNr"
            :style="{background: data.item.RamecekC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Ramecek }}
          </div>
          <b-tooltip :target="'Ramecek' + data.item.SortNr"
            :title="data.item.Ramecek"
          >
            {{ data.item.Ramecek }}
          </b-tooltip>
        </template>
        <template #head(TypRamecek)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(TypRamecek)="data">
          <div :id="'TypRamecek' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.TypRamecekC}"
          >
            {{ data.item.TypRamecek }}
          </div>
          <b-tooltip :target="'TypRamecek' + data.item.SortNr"
            :title="data.item.TypRamecek"
          >
            {{ data.item.TypRamecek }}
          </b-tooltip>
        </template>
        <template #head(ObalovaniRamecek)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(ObalovaniRamecek)="data">
          <div :id="'ObalovaniRamecek' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.ObalovaniRamecekC}"
          >
            {{ data.item.ObalovaniRamecek }}
          </div>
          <b-tooltip :target="'ObalovaniRamecek' + data.item.SortNr"
            :title="data.item.ObalovaniRamecek"
          >
            {{ data.item.ObalovaniRamecek }}
          </b-tooltip>
        </template>
        <template #head(RezaniRamecek)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(RezaniRamecek)="data">
          <div :id="'RezaniRamecek' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.RezaniRamecekC}"
          >
            {{ data.item.RezaniRamecek }}
          </div>
          <b-tooltip :target="'RezaniRamecek' + data.item.SortNr"
            :title="data.item.RezaniRamecek"
          >
            {{ data.item.RezaniRamecek }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Klapacka)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Klapacka)="data">
          <div :id="'Klapacka' + data.item.SortNr"
            :style="{background: data.item.KlapackaC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Klapacka }}
          </div>
          <b-tooltip :target="'Klapacka' + data.item.SortNr"
            :title="data.item.Klapacka"
          >
            {{ data.item.Klapacka }}
          </b-tooltip>
        </template>
        <template #head(ObalovaniKlapacka)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(ObalovaniKlapacka)="data">
          <div :id="'ObalovaniKlapacka' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.ObalovaniKlapackaC}"
          >
            {{ data.item.ObalovaniKlapacka }}
          </div>
          <b-tooltip :target="'ObalovaniKlapacka' + data.item.SortNr"
            :title="data.item.ObalovaniKlapacka"
          >
            {{ data.item.ObalovaniKlapacka }}
          </b-tooltip>
        </template>
        <template #head(RezaniKlapacka)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(RezaniKlapacka)="data">
          <div :id="'RezaniKlapacka' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.RezaniKlapackaC}"
          >
            {{ data.item.RezaniKlapacka }}
          </div>
          <b-tooltip :target="'RezaniKlapacka' + data.item.SortNr"
            :title="data.item.RezaniKlapacka"
          >
            {{ data.item.RezaniKlapacka }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Posuv)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Posuv)="data">
          <div :id="'Posuv' + data.item.SortNr"
            :style="{background: data.item.PosuvC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Posuv }}
          </div>
          <b-tooltip :target="'Posuv' + data.item.SortNr"
            :title="data.item.Posuv"
          >
            {{ data.item.Posuv }}
          </b-tooltip>
        </template>
        <template #head(HranolPosuv)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(HranolPosuv)="data">
          <div :id="'HranolPosuv' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.HranolPosuvC}"
          >
            {{ data.item.HranolPosuv }}
          </div>
          <b-tooltip :target="'HranolPosuv' + data.item.SortNr"
            :title="data.item.HranolPosuv"
          >
            {{ data.item.HranolPosuv }}
          </b-tooltip>
        </template>
        <template #head(GarnyzPosuv)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(GarnyzPosuv)="data">
          <div :id="'GarnyzPosuv' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.GarnyzPosuvC}"
          >
            {{ data.item.GarnyzPosuv }}
          </div>
          <b-tooltip :target="'GarnyzPosuv' + data.item.SortNr"
            :title="data.item.GarnyzPosuv"
          >
            {{ data.item.GarnyzPosuv }}
          </b-tooltip>
        </template>
        <template #head(DorazovaPosuv)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(DorazovaPosuv)="data">
          <div :id="'DorazovaPosuv' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.DorazovaPosuvC}"
          >
            {{ data.item.DorazovaPosuv }}
          </div>
          <b-tooltip :target="'DorazovaPosuv' + data.item.SortNr"
            :title="data.item.DorazovaPosuv"
          >
            {{ data.item.DorazovaPosuv }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Dvere)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Dvere)="data">
          <div :id="'Dvere' + data.item.SortNr"
            :style="{background: data.item.DvereC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Dvere }}
          </div>
          <b-tooltip :target="'Dvere' + data.item.SortNr"
            :title="data.item.Dvere"
          >
            {{ data.item.Dvere }}
          </b-tooltip>
        </template>
        <template #head(CentrumDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(CentrumDvere)="data">
          <div :id="'CentrumDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.CentrumDvereC}"
          >
            {{ data.item.CentrumDvere }}
          </div>
          <b-tooltip :target="'CentrumDvere' + data.item.SortNr"
            :title="data.item.CentrumDvere"
          >
            {{ data.item.CentrumDvere }}
          </b-tooltip>
        </template>
        <template #head(KorpusyDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(KorpusyDvere)="data">
          <div :id="'KorpusyDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.KorpusyDvereC}"
          >
            {{ data.item.KorpusyDvere }}
          </div>
          <b-tooltip :target="'KorpusyDvere' + data.item.SortNr"
            :title="data.item.KorpusyDvere"
          >
            {{ data.item.KorpusyDvere }}
          </b-tooltip>
        </template>
        <template #head(SesazenkyDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(SesazenkyDvere)="data">
          <div :id="'SesazenkyDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.SesazenkyDvereC}"
          >
            {{ data.item.SesazenkyDvere }}
          </div>
          <b-tooltip :target="'SesazenkyDvere' + data.item.SortNr"
            :title="data.item.SesazenkyDvere"
          >
            {{ data.item.SesazenkyDvere }}
          </b-tooltip>
        </template>
        <template #head(LisDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(LisDvere)="data">
          <div :id="'LisDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.LisDvereC}"
          >
            {{ data.item.LisDvere }}
          </div>
          <b-tooltip :target="'LisDvere' + data.item.SortNr"
            :title="data.item.LisDvere"
          >
            {{ data.item.LisDvere }}
          </b-tooltip>
        </template>
        <template #head(FormatkaDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(FormatkaDvere)="data">
          <div :id="'FormatkaDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.FormatkaDvereC}"
          >
            {{ data.item.FormatkaDvere }}
          </div>
          <b-tooltip :target="'FormatkaDvere' + data.item.SortNr"
            :title="data.item.FormatkaDvere"
          >
            {{ data.item.FormatkaDvere }}
          </b-tooltip>
        </template>
        <template #head(OlepovackaDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(OlepovackaDvere)="data">
          <div :id="'OlepovackaDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.OlepovackaDvereC}"
          >
            {{ data.item.OlepovackaDvere }}
          </div>
          <b-tooltip :target="'OlepovackaDvere' + data.item.SortNr"
            :title="data.item.OlepovackaDvere"
          >
            {{ data.item.OlepovackaDvere }}
          </b-tooltip>
        </template>
        <template #head(CncDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(CncDvere)="data">
          <div :id="'CncDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.CncDvereC}"
          >
            {{ data.item.CncDvere }}
          </div>
          <b-tooltip :target="'CncDvere' + data.item.SortNr"
            :title="data.item.CncDvere"
          >
            {{ data.item.CncDvere }}
          </b-tooltip>
        </template>
        <template #head(PgmDvere)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(PgmDvere)="data">
          <div :id="'PgmDvere' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.PgmDvereC}"
          >
            {{ data.item.PgmDvere }}
          </div>
          <b-tooltip :target="'PgmDvere' + data.item.SortNr"
            :title="data.item.PgmDvere"
          >
            {{ data.item.PgmDvere }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Dokonceni)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Dokonceni)="data">
          <div :id="'Dokonceni' + data.item.SortNr"
            :style="{background: data.item.DokonceniC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Dokonceni }}
          </div>
          <b-tooltip :target="'Dokonceni' + data.item.SortNr"
            :title="data.item.Dokonceni"
          >
            {{ data.item.Dokonceni }}
          </b-tooltip>
        </template>
        <template #head(BrouseniDyhaDokonceni)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(BrouseniDyhaDokonceni)="data">
          <div :id="'BrouseniDyhaDokonceni' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.BrouseniDyhaDokonceniC}"
          >
            {{ data.item.BrouseniDyhaDokonceni }}
          </div>
          <b-tooltip :target="'BrouseniDyhaDokonceni' + data.item.SortNr"
            :title="data.item.BrouseniDyhaDokonceni"
          >
            {{ data.item.BrouseniDyhaDokonceni }}
          </b-tooltip>
        </template>
        <template #head(ZakladDokonceni)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(ZakladDokonceni)="data">
          <div :id="'ZakladDokonceni' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.ZakladDokonceniC}"
          >
            {{ data.item.ZakladDokonceni }}
          </div>
          <b-tooltip :target="'ZakladDokonceni' + data.item.SortNr"
            :title="data.item.ZakladDokonceni"
          >
            {{ data.item.ZakladDokonceni }}
          </b-tooltip>
        </template>
        <template #head(BrouseniZakladDokonceni)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(BrouseniZakladDokonceni)="data">
          <div :id="'BrouseniZakladDokonceni' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.BrouseniZakladDokonceniC}"
          >
            {{ data.item.BrouseniZakladDokonceni }}
          </div>
          <b-tooltip :target="'BrouseniZakladDokonceni' + data.item.SortNr"
            :title="data.item.BrouseniZakladDokonceni"
          >
            {{ data.item.BrouseniZakladDokonceni }}
          </b-tooltip>
        </template>
        <template #head(VrchDokonceni)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(VrchDokonceni)="data">
          <div :id="'VrchDokonceni' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.VrchDokonceniC}"
          >
            {{ data.item.VrchDokonceni }}
          </div>
          <b-tooltip :target="'VrchDokonceni' + data.item.SortNr"
            :title="data.item.VrchDokonceni"
          >
            {{ data.item.VrchDokonceni }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Kompletace)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Kompletace)="data">
          <div :id="'Kompletace' + data.item.SortNr"
            :style="{background: data.item.KompletaceC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Kompletace }}
          </div>
          <b-tooltip :target="'Kompletace' + data.item.SortNr"
            :title="data.item.Kompletace"
          >
            {{ data.item.Kompletace }}
          </b-tooltip>
        </template>
        <template #head(DvereKompletace)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(DvereKompletace)="data">
          <div :id="'DvereKompletace' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.DvereKompletaceC}"
          >
            {{ data.item.DvereKompletace }}
          </div>
          <b-tooltip :target="'DvereKompletace' + data.item.SortNr"
            :title="data.item.DvereKompletace"
          >
            {{ data.item.DvereKompletace }}
          </b-tooltip>
        </template>
        <template #head(ZarubenKompletace)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(ZarubenKompletace)="data">
          <div :id="'ZarubenKompletace' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.ZarubenKompletaceC}"
          >
            {{ data.item.ZarubenKompletace }}
          </div>
          <b-tooltip :target="'ZarubenKompletace' + data.item.SortNr"
            :title="data.item.ZarubenKompletace"
          >
            {{ data.item.ZarubenKompletace }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Sklad)="data">
          <div class="oddeleniHeader" @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Sklad)="data">
          <div :id="'Sklad' + data.item.SortNr"
            :style="{background: data.item.SkladC}"
            class="oddeleni" @click="toggleModal(data.item, data.field.key, true)"
          >
            {{ data.item.Sklad }}
          </div>
          <b-tooltip :target="'Sklad' + data.item.SortNr"
            :title="data.item.Sklad"
          >
            {{ data.item.Sklad }}
          </b-tooltip>
        </template>
        <template #head(KovaniSklad)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(KovaniSklad)="data">
          <div :id="'KovaniSklad' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.KovaniSkladC}"
          >
            {{ data.item.KovaniSklad }}
          </div>
          <b-tooltip :target="'KovaniSklad' + data.item.SortNr"
            :title="data.item.KovaniSklad"
          >
            {{ data.item.KovaniSklad }}
          </b-tooltip>
        </template>
        <template #head(SkloSklad)="data">
          <div class="pododdeleniHeader">
            {{ data.label }}
          </div>
        </template>
        <template #cell(SkloSklad)="data">
          <div :id="'SkloSklad' + data.item.SortNr"
            class="pododdeleni" @click="toggleModal(data.item, data.field.key, false)"
            :style="{background: data.item.SkloSkladC}"
          >
            {{ data.item.SkloSklad }}
          </div>
          <b-tooltip :target="'SkloSklad' + data.item.SortNr"
            :title="data.item.SkloSklad"
          >
            {{ data.item.SkloSklad }}
          </b-tooltip>
        </template>
<!-- fsdafasdkjhkghjkhgkghjkghfdsa
fdsafjghhgjkghkjhfdsa
dgsa
gfad
fdsafjghhgjkghkjhfdsa -->

<!-- fasdfasdfa
gfds
gfdsgfds
gfdsgfdsgfds
gfdsgfdsdg
gfdsgfdsgfdsg
dsf -->
        <template #head(Adresa)="data">
          <div @click="toggleHeader(data.field.key)">
            {{ data.label }}
          </div>
        </template>
        <template #cell(Adresa)="data">
          <div :id="'Adresa' + data.item.SortNr"
            style="width: 80px; white-space: nowrap; overflow: hidden;"
          >
            {{ data.item.Adresa }}
          </div>
          <b-tooltip :target="'Adresa' + data.item.SortNr"
            :title="data.item.Adresa"
          >
            {{ data.item.Adresa }}
          </b-tooltip>
        </template>
        <template #head(Ulice)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Ulice)="data">
          <b-form-input
            style="width: 80px"
            :id="'Ulice' + data.item.SortNr"
            @blur="updateOrder(data.item)"
            v-model="data.item.Ulice"
          >
          </b-form-input>
          <b-tooltip :target="'Ulice' + data.item.SortNr"
            :title="data.item.Ulice"
          >
            {{ data.item.Ulice }}
          </b-tooltip>
        </template>
        <template #head(v)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Cislo)="data">
          <b-form-input
            style="width: 80px"
            :id="'Cislo' + data.item.SortNr"
            @blur="updateOrder(data.item)"
            v-model="data.item.Cislo"
          >
          </b-form-input>
          <b-tooltip :target="'Cislo' + data.item.SortNr"
            :title="data.item.Cislo"
          >
            {{ data.item.Cislo }}
          </b-tooltip>
        </template>
        <template #head(Mesto)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Mesto)="data">
          <b-form-input
            style="width: 80px"
            :id="'Mesto' + data.item.SortNr"
            @blur="updateOrder(data.item)"
            v-model="data.item.Mesto"
          >
          </b-form-input>
          <b-tooltip :target="'Mesto' + data.item.SortNr"
            :title="data.item.Mesto"
          >
            {{ data.item.Mesto }}
          </b-tooltip>
        </template>
        <template #head(PSC)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(PSC)="data">
          <b-form-input
            style="width: 80px"
            :id="'PSC' + data.item.SortNr"
            @blur="updateOrder(data.item)"
            v-model="data.item.PSC"
          >
          </b-form-input>          <b-tooltip :target="'PSC' + data.item.SortNr"
            :title="data.item.PSC"
          >
            {{ data.item.PSC }}
          </b-tooltip>
        </template>

        <template #head(Map)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Map)="data">
          <b-button @click="showMap(data.item)" variant="outline-light" pill>
            <b-icon icon="map" variant="success"></b-icon>
          </b-button>
        </template>

        <template #head(PozadovanyDatum)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(PozadovanyDatum)="data">
          <div style="width: 140px;">
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
          <div style="width: 140px;">
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
        <b-button-group>
          <b-button @click="obchodVisible = true; pripravaHeight = 55;" v-if="!obchodVisible">Otevřít obchod</b-button>
          <b-button @click="toggleNewOrder" v-b-modal="'my-modal'" v-if="obchodVisible">Vytvořit zakázku</b-button>
          <b-button v-if="obchodVisible">Odstranit</b-button>
          <b-button @click="newOrderProcess()" v-if="obchodVisible">Předat ke zpracování</b-button>
          <b-modal id="my-modal">Hello From My Modal!</b-modal>
        </b-button-group>
        <b-button-group>
          <b-button @click="obchodVisible = false; pripravaHeight = 84;" v-if="obchodVisible">Zavřít obchod</b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-row>
    <!-- /**
    afdasfnjgfjfghkhjk
    fdsafjghhgjkghkjh
    fsdafasdkjhkghjkhgkghjkgh
    afdasfnjgfjfghkhjk
    fdsafjghhgjkghkjh
    fsdafasdkjhkghjkhgkghjkgh
    afdasfnjgfjfghkhjk
    fdsafjghhgjkghkjh
    fsdafasdkjhkghjkhgkghjkgh
    afdasfnjgfjfghkhjk
    fdsafjghhgjkghkjh
    fsdafasdkjhkghjkhgkghjkgh
    afdasfnjgfjfghkhjk
    fdsafjghhgjkghkjh
    fsdafasdkjhkghjkhgkghjkgh
    afdasfnjgfjfghkhjk
    fdsafjghhgjkghkjh
    fsdafasdkjhkghjkhgkghjkgh
    afdasfnjgfjfghkhjk
    fdsafjghhgjkghkjh
    fsdafasdkjhkghjkhgkghjkgh
     */ -->
    <b-row v-if="obchodVisible">
      <b-table
        id="mojeTable"
        sticky-header
        v-bind:style="{ height: pripravaHeight + 'vh', padding: '0px', maxHeight: '28vh' }"
        responsive bordered hover
        sortable
        :items="newOrders" :fields="newFields"
        selectable
        :select-mode="selectMode"
        @row-selected="onNewRowSelected"
      >
        <template #head(ZahajeniDatum)="data">
          <div style="width: 140px;">
            {{ data.label }}
          </div>
        </template>
        <template #cell(ZahajeniDatum)="data">
          <div style="width: 140px;">
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
        <template #cell(Zakazka)="data">
          <div :style="{background: data.item.ZakazkaColor}" v-on:dblclick="doubleClick">
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
          {{ data.label }}
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

        <template #head(Doc)="data">
          <div>
            {{ data.label }}
          </div>
        </template>
        <template #cell(Doc)="data">
          <b-button @click="showDoc(data.item)" variant="outline-light" pill>
            <b-icon icon="file-earmark-text" variant="dark"></b-icon>
          </b-button>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Axios from 'axios'
import Verte from 'verte'
import 'verte/dist/verte.css'

export default {
  name: 'Wood',
  components: {
    Verte
  },
  sockets: {
    orderAdded: function (val) {
      console.log('add')
      this.$store.dispatch('ADD_ORDER', val)
      // this.addUserList(val)
    },
    orderUpdated: function (val) {
      console.log('up')
      console.log(val)
      this.$store.dispatch('PUT_ORDER', val)
      // this.updateUserList(val)
    },
    orderUnprocessed: function (val) {
      console.log('up')
      console.log(val)
      this.$store.dispatch('PUT_ORDER', val)
      this.$store.dispatch('UNPROCESS_ORDER', val)
      // this.updateUserList(val)
    },
    orderMovedDown: function (val) {
      console.log('down')
      console.log(val)
      this.$store.dispatch('MOVEDOWN_ORDER', val)
      this.$store.dispatch('PUT_ORDER', val.item)
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
      return this.$store.state.orders.filter(todo => todo.Department === 1 &&
        todo.IsInProccess && !todo.IsDeleted && !todo.IsArchived).sort((a, b) => a.SortNr - b.SortNr)
    },
    newOrders () {
      return this.$store.state.orders.filter(todo => todo.Department === 1 &&
        !todo.IsInProccess && !todo.IsDeleted && !todo.IsArchived).sort((a, b) => a.SortNr - b.SortNr)
    }
  },
  mounted () {
    this.$store.dispatch('SET_ORDER')
  },
  data: () => ({
    newOrder: {
      datumZahajeni: ''
    },
    presunText: '',
    pododdeleniText: '',
    obchodHeight: '28',
    pripravaHeight: '84',
    obchodVisible: false,
    selectMode: 'single',
    selected: [],
    newSelected: [],
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
      { label: 'Zahajeni', key: 'ZahajeniDatum' },
      { label: 'Technik', key: 'Technik' },
      {
        label: 'Zakazka',
        stickyColumn: true,
        filterByFormatted: true,
        key: 'Zakazka',
        sortable: true,
        formatter: (value, key, item) => {
          return item.first_name + ' ' + item.last_name
        }
      },
      { label: 'Poznamky', key: 'Poznamky' },
      { label: 'Material', key: 'Material' },
      { label: 'Zakazkové číslo', key: 'ZakazkaNr' },
      { label: 'VyrobniNr', key: 'VyrobniNr' },
      { label: 'Doc', key: 'Doc' },
      { label: 'Edit Doc', key: 'EditDocPath' },
      { label: 'KridlaText', key: 'KridlaText' },
      { label: 'Zarubne Text', key: 'ZarubneText' },
      { label: 'Plosny Material', key: 'PlosnyMaterial' },
      { label: 'Priprava', thStyle: { background: 'red' }, group: 'Priprava', key: 'Priprava' },
      { label: 'Dokumentace', thStyle: { background: 'orange' }, group: 'Priprava', thClass: 'd-none', tdClass: 'd-none', key: 'Dokumentace' },
      { label: 'InDoca', thStyle: { background: 'orange' }, group: 'Priprava', thClass: 'd-none', tdClass: 'd-none', key: 'InDoca' },
      { label: 'Oblozky', thStyle: { background: 'red' }, group: 'Oblozky', key: 'Oblozky' },
      { label: 'ObalovatOblozky', thStyle: { background: 'orange' }, group: 'Oblozky', thClass: 'd-none', tdClass: 'd-none', key: 'ObalovatOblozky' },
      { label: 'RezatOblozky', thStyle: { background: 'orange' }, group: 'Oblozky', thClass: 'd-none', tdClass: 'd-none', key: 'RezatOblozky' },
      { label: 'CncOblozky', thStyle: { background: 'orange' }, group: 'Oblozky', thClass: 'd-none', tdClass: 'd-none', key: 'CncOblozky' },
      { label: 'Stredove', thStyle: { background: 'red' }, group: 'Stredove', key: 'Stredove' },
      { label: 'CentrumStredove', thStyle: { background: 'orange' }, group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'CentrumStredove' },
      { label: 'LisStredove', thStyle: { background: 'orange' }, group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'LisStredove' },
      { label: 'OlepovaniStredove', thStyle: { background: 'orange' }, group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'OlepovaniStredove' },
      { label: 'FrezovaniStredove', thStyle: { background: 'orange' }, group: 'Stredove', thClass: 'd-none', tdClass: 'd-none', key: 'FrezovaniStredove' },
      { label: 'Ramecek', thStyle: { background: 'red' }, group: 'Ramecek', key: 'Ramecek' },
      { label: 'TypRamecek', thStyle: { background: 'orange' }, group: 'Ramecek', thClass: 'd-none', tdClass: 'd-none', key: 'TypRamecek' },
      { label: 'ObalovaniRamecek', thStyle: { background: 'orange' }, group: 'Ramecek', thClass: 'd-none', tdClass: 'd-none', key: 'ObalovaniRamecek' },
      { label: 'RezaniRamecek', thStyle: { background: 'orange' }, group: 'Ramecek', thClass: 'd-none', tdClass: 'd-none', key: 'RezaniRamecek' },
      { label: 'Klapacka', thStyle: { background: 'red' }, group: 'Klapacka', key: 'Klapacka' },
      { label: 'ObalovaniKlapacka', thStyle: { background: 'orange' }, group: 'Klapacka', thClass: 'd-none', tdClass: 'd-none', key: 'ObalovaniKlapacka' },
      { label: 'RezaniKlapacka', thStyle: { background: 'orange' }, group: 'Klapacka', thClass: 'd-none', tdClass: 'd-none', key: 'RezaniKlapacka' },
      { label: 'Posuv', thStyle: { background: 'red' }, group: 'Posuv', key: 'Posuv' },
      { label: 'HranolPosuv', thStyle: { background: 'orange' }, group: 'Posuv', thClass: 'd-none', tdClass: 'd-none', key: 'HranolPosuv' },
      { label: 'GarnyzPosuv', thStyle: { background: 'orange' }, group: 'Posuv', thClass: 'd-none', tdClass: 'd-none', key: 'GarnyzPosuv' },
      { label: 'DorazovaPosuv', thStyle: { background: 'orange' }, group: 'Posuv', thClass: 'd-none', tdClass: 'd-none', key: 'DorazovaPosuv' },
      { label: 'Dvere', thStyle: { background: 'red' }, group: 'Dvere', key: 'Dvere' },
      { label: 'CentrumDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'CentrumDvere' },
      { label: 'KorpusyDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'KorpusyDvere' },
      { label: 'SesazenkyDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'SesazenkyDvere' },
      { label: 'LisDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'LisDvere' },
      { label: 'FormatkaDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'FormatkaDvere' },
      { label: 'OlepovackaDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'OlepovackaDvere' },
      { label: 'CncDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'CncDvere' },
      { label: 'PgmDvere', thStyle: { background: 'orange' }, group: 'Dvere', thClass: 'd-none', tdClass: 'd-none', key: 'PgmDvere' },
      { label: 'Dokonceni', thStyle: { background: 'red' }, group: 'Dokonceni', key: 'Dokonceni' },
      { label: 'BrouseniDyhaDokonceni', thStyle: { background: 'orange' }, group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'BrouseniDyhaDokonceni' },
      { label: 'ZakladDokonceni', thStyle: { background: 'orange' }, group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'ZakladDokonceni' },
      { label: 'BrouseniZakladDokonceni', thStyle: { background: 'orange' }, group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'BrouseniZakladDokonceni' },
      { label: 'VrchDokonceni', thStyle: { background: 'orange' }, group: 'Dokonceni', thClass: 'd-none', tdClass: 'd-none', key: 'VrchDokonceni' },
      { label: 'Kompletace', thStyle: { background: 'red' }, group: 'Kompletace', key: 'Kompletace' },
      { label: 'DvereKompletace', thStyle: { background: 'orange' }, group: 'Kompletace', thClass: 'd-none', tdClass: 'd-none', key: 'DvereKompletace' },
      { label: 'ZarubenKompletace', thStyle: { background: 'orange' }, group: 'Kompletace', thClass: 'd-none', tdClass: 'd-none', key: 'ZarubenKompletace' },
      { label: 'Sklad', thStyle: { background: 'red' }, group: 'Sklad', key: 'Sklad' },
      { label: 'KovaniSklad', thStyle: { background: 'orange' }, group: 'Sklad', thClass: 'd-none', tdClass: 'd-none', key: 'KovaniSklad' },
      { label: 'SkloSklad', thStyle: { background: 'orange' }, group: 'Sklad', thClass: 'd-none', tdClass: 'd-none', key: 'SkloSklad' },
      { label: 'PozadovanyDatum', key: 'PozadovanyDatum' },
      { label: 'DokonceniDatum', key: 'DokonceniDatum' },
      { label: 'Adresa', group: 'Adresa', key: 'Adresa' },
      { label: 'Ulice', group: 'Adresa', thClass: 'd-none', tdClass: 'd-none', key: 'Ulice' },
      { label: 'Cislo', group: 'Adresa', thClass: 'd-none', tdClass: 'd-none', key: 'Cislo' },
      { label: 'Mesto', group: 'Adresa', thClass: 'd-none', tdClass: 'd-none', key: 'Mesto' },
      { label: 'PSC', group: 'Adresa', thClass: 'd-none', tdClass: 'd-none', key: 'PSC' },
      { label: 'Map', key: 'Map' },
      { label: 'HotovoBloky', key: 'HotovoBloky' }
    ],
    newFields: [
      { label: 'Zahajeni', key: 'ZahajeniDatum' },
      { label: 'Technik', key: 'Technik' },
      {
        label: 'Zakazka',
        stickyColumn: true,
        filterByFormatted: true,
        key: 'Zakazka',
        sortable: true
      },
      { label: 'Material', key: 'Material' },
      { label: 'Zakazkové číslo', key: 'ZakazkaNr' },
      { label: 'VyrobniNr', key: 'VyrobniNr' },
      { label: 'Doc', key: 'Doc' }
    ]
  }),
  methods: {
    showMap (item) {
      console.log(item)
    },
    toggleModal (item, key, isOddeleni) {
      console.log(item)
      console.log(key)
      console.log(isOddeleni)
      this.$bvModal.show('pododdeleni-modal')
    },
    onRowSelected (items) {
      console.log(items)
      this.selected = items
    },
    onNewRowSelected (items) {
      console.log(items)
      this.newSelected = items
    },
    onSubmit (data) {
      this.filter = this.finder
    },
    updateColor () {
      console.log('AAA')
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
    toggleNewOrder () {
      this.$bvModal.show('new-order-modal')
    },
    async createOrder () {
      console.log('AAAA')
    },
    async updateOrder (item) {
      await Axios.put('http://localhost:5000/order', item)
    },
    async removeOrder (item) {
      await Axios.delete('http://localhost:5000/order/' + item._id)
    },
    async addOrder () {
      await Axios.post('http://localhost:5000/order', {
      })
    },
    async newOrderProcess () {
      const item = this.newSelected[0]
      const maxSortNr = this.orders.reduce((a, b) => a.SortNr > b.SortNr ? a : b).SortNr + 1
      await Axios.put('http://localhost:5000/order/process', { item: item, nr: maxSortNr })
    },
    async orderUnprocess () {
      const item = this.selected[0]
      await Axios.put('http://localhost:5000/order/unprocess', item)
    },
    moveRowToggle () {
      this.$bvModal.show('presun-modal')
    },
    async moveRow () {
      const item = this.selected[0]
      const newPos = this.presunText
      this.presunText = ''
      const oldPos = item.SortNr
      console.log('MOVE', item, newPos, oldPos)
      if (newPos < oldPos) {
        await Axios.put('http://localhost:5000/order/moveUp', { item: item, old: oldPos, new: newPos })
      } else {
        if (newPos !== oldPos) {
          await Axios.put('http://localhost:5000/order/moveDown', { item: item, old: oldPos, new: newPos })
        }
      }
    }
  }
}

</script>

<style>

.mujContainer {
  font-size: 0.8em;
  font-style: normal;
  font-family: Arial, Helvetica, sans-serif;
}

#mojeTable table {
  border-spacing: 0px;
}

#mojeTable thead th {
  vertical-align: inherit;
  padding: 0px;
  height: 100px;
}

#mojeTable tbody td {
  vertical-align: inherit;
  padding: 0px;
}

#mojeTable .table-active {
  background-color:dimgray;
}

#mojeTable .pododdeleni {
  height: 32px;
  margin: 0px;
  padding: 0px;
  width: 32px;
  margin-left: 1px;
  margin-right: 1px;
  overflow: hidden;
}

#mojeTable .pododdeleniHeader {
  width: 32px;
  transform: rotate(-90deg) translateY(0px) translateX(-30px);
}

#mojeTable .oddeleni {
  height: 32px;
  margin: 0px;
  padding: 0px;
  width: 32px;
  margin-left: 2px;
  margin-right: 2px;
  overflow: hidden;
}

#mojeTable .oddeleniHeader {
  width: 32px;
  padding-left: 0px;
  margin-left: 0px;
  transform: rotate(-90deg) translateY(0px) translateX(-30px);
}

.backgroundRed{
  background-color: firebrick;
}

</style>
