import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { User } from '@/models/User'
import { Order } from '@/models/Order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: Array<Order>(),
    users: Array<User>()
  },
  getters: {
    USERS: state => {
      return state.users
    },
    ORDERS: state => {
      return state.orders
    }
  },
  mutations: {
    SET_ORDER: (state, payload) => {
      state.orders = payload
    },
    ADD_ORDER: (state, payload) => {
      // @ts-ignore
      state.orders.push(payload)
    },
    UNPROCESS_ORDER: (state, payload) => {
      // @ts-ignore
      state.orders.filter(x => x.SortNr > payload.SortNr).forEach(x => x.SortNr--)
    },
    MOVEDOWN_ORDER: (state, payload) => {
      // @ts-ignore
      state.orders.filter(x => x.SortNr > payload.old && x.SortNr <= payload.new).forEach(x => x.SortNr--)
    },
    PUT_ORDER: (state, payload) => {
      const i = state.orders.findIndex(element => element._id === payload._id)
      state.orders[i].SortNr = payload.SortNr
      state.orders[i].NotBlank = payload.NotBlank
      state.orders[i].IsInProccess = payload.IsInProccess
      state.orders[i].Department = payload.Department
      state.orders[i].ArchivedBy = payload.ArchivedBy
      state.orders[i].ArchivedDate = payload.ArchivedDate
      state.orders[i].IsArchived = payload.IsArchived
      state.orders[i].IsDeleted = payload.IsDeleted
      state.orders[i].DeletedDate = payload.DeletedDate
      state.orders[i].DeletedBy = payload.DeletedBy
      state.orders[i].Color = payload.Color
      state.orders[i].PripravaC = payload.PripravaC
      state.orders[i].Priprava = payload.Priprava
      state.orders[i].OblozkyC = payload.OblozkyC
      state.orders[i].Oblozky = payload.Oblozky
      state.orders[i].StredoveC = payload.StredoveC
      state.orders[i].Stredove = payload.Stredove
      state.orders[i].RamecekC = payload.RamecekC
      state.orders[i].Ramecek = payload.Ramecek
      state.orders[i].KlapackaC = payload.KlapackaC
      state.orders[i].Klapacka = payload.Klapacka
      state.orders[i].PosuvC = payload.PosuvC
      state.orders[i].Posuv = payload.Posuv
      state.orders[i].DvereC = payload.DvereC
      state.orders[i].Dvere = payload.Dvere
      state.orders[i].DokonceniC = payload.DokonceniC
      state.orders[i].Dokonceni = payload.Dokonceni
      state.orders[i].KompletaceC = payload.KompletaceC
      state.orders[i].Kompletace = payload.Kompletace
      state.orders[i].SkladC = payload.SkladC
      state.orders[i].Sklad = payload.Sklad
      state.orders[i].ZahajeniDatum = payload.ZahajeniDatum
      state.orders[i].Technik = payload.Technik
      state.orders[i].Zakazka = payload.Zakazka
      state.orders[i].Material = payload.Material
      state.orders[i].ZakazkaColor = payload.ZakazkaColor
      state.orders[i].MaterialColor = payload.MaterialColor
      state.orders[i].ZakazkaNr = payload.ZakazkaNr
      state.orders[i].VyrobniNr = payload.VyrobniNr
      state.orders[i].KridlaText = payload.KridlaText
      state.orders[i].KridlaKsExpedovanych = payload.KridlaKsExpedovanych
      state.orders[i].KridlaKs = payload.KridlaKs
      state.orders[i].ZarubneText = payload.ZarubneText
      state.orders[i].ZarubneKsExpedovanych = payload.ZarubneKsExpedovanych
      state.orders[i].ZarubneKs = payload.ZarubneKs
      state.orders[i].TypZarubne = payload.TypZarubne
      state.orders[i].Dokumentace = payload.Dokumentace
      state.orders[i].DokumentaceC = payload.DokumentaceC
      state.orders[i].InDoca = payload.InDoca
      state.orders[i].InDocaC = payload.InDocaC
      state.orders[i].DocUrl = payload.DocUrl
      state.orders[i].ObalovatOblozkyC = payload.ObalovatOblozkyC
      state.orders[i].ObalovatOblozky = payload.ObalovatOblozky
      state.orders[i].RezatOblozkyC = payload.RezatOblozkyC
      state.orders[i].RezatOblozky = payload.RezatOblozky
      state.orders[i].CncOblozkyC = payload.CncOblozkyC
      state.orders[i].CncOblozky = payload.CncOblozky
      state.orders[i].CentrumStredoveC = payload.CentrumStredoveC
      state.orders[i].CentrumStredove = payload.CentrumStredove
      state.orders[i].LisStredoveC = payload.LisStredoveC
      state.orders[i].LisStredove = payload.LisStredove
      state.orders[i].OlepovaniStredoveC = payload.OlepovaniStredoveC
      state.orders[i].OlepovaniStredove = payload.OlepovaniStredove
      state.orders[i].FrezovaniStredoveC = payload.FrezovaniStredoveC
      state.orders[i].FrezovaniStredove = payload.FrezovaniStredove
      state.orders[i].TypRamecekC = payload.TypRamecekC
      state.orders[i].TypRamecek = payload.TypRamecek
      state.orders[i].ObalovaniRamecekC = payload.ObalovaniRamecekC
      state.orders[i].ObalovaniRamecek = payload.ObalovaniRamecek
      state.orders[i].RezaniRamecekC = payload.RezaniRamecekC
      state.orders[i].RezaniRamecek = payload.RezaniRamecek
      state.orders[i].ObalovaniKlapackaC = payload.ObalovaniKlapackaC
      state.orders[i].ObalovaniKlapacka = payload.ObalovaniKlapacka
      state.orders[i].RezaniKlapackaC = payload.RezaniKlapackaC
      state.orders[i].RezaniKlapacka = payload.RezaniKlapacka
      state.orders[i].HranolPosuvC = payload.HranolPosuvC
      state.orders[i].HranolPosuv = payload.HranolPosuv
      state.orders[i].GarnyzPosuvC = payload.GarnyzPosuvC
      state.orders[i].GarnyzPosuv = payload.GarnyzPosuv
      state.orders[i].DorazovaPosuvC = payload.DorazovaPosuvC
      state.orders[i].DorazovaPosuv = payload.DorazovaPosuv
      state.orders[i].CentrumDvereC = payload.CentrumDvereC
      state.orders[i].CentrumDvere = payload.CentrumDvere
      state.orders[i].KorpusyDvereC = payload.KorpusyDvereC
      state.orders[i].KorpusyDvere = payload.KorpusyDvere
      state.orders[i].SesazenkyDvereC = payload.SesazenkyDvereC
      state.orders[i].SesazenkyDvere = payload.SesazenkyDvere
      state.orders[i].LisDvereC = payload.LisDvereC
      state.orders[i].LisDvere = payload.LisDvere
      state.orders[i].FormatkaDvereC = payload.FormatkaDvereC
      state.orders[i].FormatkaDvere = payload.FormatkaDvere
      state.orders[i].OlepovackaDvereC = payload.OlepovackaDvereC
      state.orders[i].OlepovackaDvere = payload.OlepovackaDvere
      state.orders[i].CncDvereC = payload.CncDvereC
      state.orders[i].CncDvere = payload.CncDvere
      state.orders[i].PgmDvereC = payload.PgmDvereC
      state.orders[i].PgmDvere = payload.PgmDvere
      state.orders[i].BrouseniDyhaDokonceniC = payload.BrouseniDyhaDokonceniC
      state.orders[i].BrouseniDyhaDokonceni = payload.BrouseniDyhaDokonceni
      state.orders[i].ZakladDokonceniC = payload.ZakladDokonceniC
      state.orders[i].ZakladDokonceni = payload.ZakladDokonceni
      state.orders[i].BrouseniZakladDokonceniC = payload.BrouseniZakladDokonceniC
      state.orders[i].BrouseniZakladDokonceni = payload.BrouseniZakladDokonceni
      state.orders[i].VrchDokonceniC = payload.VrchDokonceniC
      state.orders[i].VrchDokonceni = payload.VrchDokonceni
      state.orders[i].DvereKompletaceC = payload.DvereKompletaceC
      state.orders[i].DvereKompletace = payload.DvereKompletace
      state.orders[i].ZarubenKompletaceC = payload.ZarubenKompletaceC
      state.orders[i].ZarubenKompletace = payload.ZarubenKompletace
      state.orders[i].KovaniSkladC = payload.KovaniSkladC
      state.orders[i].KovaniSklad = payload.KovaniSklad
      state.orders[i].SkloSkladC = payload.SkloSkladC
      state.orders[i].SkloSklad = payload.SkloSklad
      state.orders[i].PripravaZarC = payload.PripravaZarC
      state.orders[i].PripravaZar = payload.PripravaZar
      state.orders[i].DokumentPripravaZarC = payload.DokumentPripravaZarC
      state.orders[i].DokumentPripravaZar = payload.DokumentPripravaZar
      state.orders[i].InDocaPripravaZarC = payload.InDocaPripravaZarC
      state.orders[i].InDocaPripravaZar = payload.InDocaPripravaZar
      state.orders[i].LaserZarC = payload.LaserZarC
      state.orders[i].LaserZar = payload.LaserZar
      state.orders[i].PohLaserZarC = payload.PohLaserZarC
      state.orders[i].PohLaserZar = payload.PohLaserZar
      state.orders[i].NepohLaserZarC = payload.NepohLaserZarC
      state.orders[i].NepohLaserZar = payload.NepohLaserZar
      state.orders[i].PoutecLaserZarC = payload.PoutecLaserZarC
      state.orders[i].PoutecLaserZar = payload.PoutecLaserZar
      state.orders[i].NuzkyZarC = payload.NuzkyZarC
      state.orders[i].NuzkyZar = payload.NuzkyZar
      state.orders[i].SplnenoNuzkyZarC = payload.SplnenoNuzkyZarC
      state.orders[i].SplnenoNuzkyZar = payload.SplnenoNuzkyZar
      state.orders[i].OhybackaZarC = payload.OhybackaZarC
      state.orders[i].OhybackaZar = payload.OhybackaZar
      state.orders[i].PohOhybackaZarC = payload.PohOhybackaZarC
      state.orders[i].PohOhybackaZar = payload.PohOhybackaZar
      state.orders[i].NepohOhybackaZarC = payload.NepohOhybackaZarC
      state.orders[i].NepohOhybackaZar = payload.NepohOhybackaZar
      state.orders[i].PoutecOhybackaZarC = payload.PoutecOhybackaZarC
      state.orders[i].PoutecOhybackaZar = payload.PoutecOhybackaZar
      state.orders[i].PilaZarC = payload.PilaZarC
      state.orders[i].PilaZar = payload.PilaZar
      state.orders[i].PohPilaZarC = payload.PohPilaZarC
      state.orders[i].PohPilaZar = payload.PohPilaZar
      state.orders[i].NepohPilaZarC = payload.NepohPilaZarC
      state.orders[i].NepohPilaZar = payload.NepohPilaZar
      state.orders[i].VyrazeckaZarC = payload.VyrazeckaZarC
      state.orders[i].VyrazeckaZar = payload.VyrazeckaZar
      state.orders[i].SplnenoVyrazeckaZarC = payload.SplnenoVyrazeckaZarC
      state.orders[i].SplnenoVyrazeckaZar = payload.SplnenoVyrazeckaZar
      state.orders[i].BodovaniZarC = payload.BodovaniZarC
      state.orders[i].BodovaniZar = payload.BodovaniZar
      state.orders[i].SplnenoBodovaniZarC = payload.SplnenoBodovaniZarC
      state.orders[i].SplnenoBodovaniZar = payload.SplnenoBodovaniZar
      state.orders[i].SvarovaniZarC = payload.SvarovaniZarC
      state.orders[i].SvarovaniZar = payload.SvarovaniZar
      state.orders[i].SplnenoSvarovaniZarC = payload.SplnenoSvarovaniZarC
      state.orders[i].SplnenoSvarovaniZar = payload.SplnenoSvarovaniZar
      state.orders[i].BrouseniZarC = payload.BrouseniZarC
      state.orders[i].BrouseniZar = payload.BrouseniZar
      state.orders[i].SplnenoBrouseniZarC = payload.SplnenoBrouseniZarC
      state.orders[i].SplnenoBrouseniZar = payload.SplnenoBrouseniZar
      state.orders[i].StrikarnaZarC = payload.StrikarnaZarC
      state.orders[i].StrikarnaZar = payload.StrikarnaZar
      state.orders[i].SplnenoStrikarnaZarC = payload.SplnenoStrikarnaZarC
      state.orders[i].SplnenoStrikarnaZar = payload.SplnenoStrikarnaZar
      state.orders[i].RameckyZarC = payload.RameckyZarC
      state.orders[i].RameckyZar = payload.RameckyZar
      state.orders[i].NarezRameckyZarC = payload.NarezRameckyZarC
      state.orders[i].NarezRameckyZar = payload.NarezRameckyZar
      state.orders[i].FrezRameckyZarC = payload.FrezRameckyZarC
      state.orders[i].FrezRameckyZar = payload.FrezRameckyZar
      state.orders[i].SvarRameckyZarC = payload.SvarRameckyZarC
      state.orders[i].SvarRameckyZar = payload.SvarRameckyZar
      state.orders[i].StriRameckyZarC = payload.StriRameckyZarC
      state.orders[i].StriRameckyZar = payload.StriRameckyZar
      state.orders[i].KompletaceZarC = payload.KompletaceZarC
      state.orders[i].KompletaceZar = payload.KompletaceZar
      state.orders[i].SplnenoKompletaceZarC = payload.SplnenoKompletaceZarC
      state.orders[i].SplnenoKompletaceZar = payload.SplnenoKompletaceZar
      state.orders[i].SkladZarC = payload.SkladZarC
      state.orders[i].SkladZar = payload.SkladZar
      state.orders[i].PlechSkladZarC = payload.PlechSkladZarC
      state.orders[i].PlechSkladZar = payload.PlechSkladZar
      state.orders[i].BarvaSkladZarC = payload.BarvaSkladZarC
      state.orders[i].BarvaSkladZar = payload.BarvaSkladZar
      state.orders[i].KovaniSkladZarC = payload.KovaniSkladZarC
      state.orders[i].KovaniSkladZar = payload.KovaniSkladZar
      state.orders[i].SkloSkladZarC = payload.SkloSkladZarC
      state.orders[i].SkloSkladZar = payload.SkloSkladZar
      state.orders[i].PripravaKridC = payload.PripravaKridC
      state.orders[i].PripravaKrid = payload.PripravaKrid
      state.orders[i].DokumentPripravaKridC = payload.DokumentPripravaKridC
      state.orders[i].DokumentPripravaKrid = payload.DokumentPripravaKrid
      state.orders[i].IndocaPripravaKridC = payload.IndocaPripravaKridC
      state.orders[i].IndocaPripravaKrid = payload.IndocaPripravaKrid
      state.orders[i].LaserKridC = payload.LaserKridC
      state.orders[i].LaserKrid = payload.LaserKrid
      state.orders[i].PohLaserKridC = payload.PohLaserKridC
      state.orders[i].PohLaserKrid = payload.PohLaserKrid
      state.orders[i].NepohLaserKridC = payload.NepohLaserKridC
      state.orders[i].NepohLaserKrid = payload.NepohLaserKrid
      state.orders[i].KlapackaLaserKridC = payload.KlapackaLaserKridC
      state.orders[i].KlapackaLaserKrid = payload.KlapackaLaserKrid
      state.orders[i].OkopLaserKridC = payload.OkopLaserKridC
      state.orders[i].OkopLaserKrid = payload.OkopLaserKrid
      state.orders[i].OhybackaKridC = payload.OhybackaKridC
      state.orders[i].OhybackaKrid = payload.OhybackaKrid
      state.orders[i].PohOhybackaKridC = payload.PohOhybackaKridC
      state.orders[i].PohOhybackaKrid = payload.PohOhybackaKrid
      state.orders[i].NepohOhybackaKridC = payload.NepohOhybackaKridC
      state.orders[i].NepohOhybackaKrid = payload.NepohOhybackaKrid
      state.orders[i].KlapackaOhybackaKridC = payload.KlapackaOhybackaKridC
      state.orders[i].KlapackaOhybackaKrid = payload.KlapackaOhybackaKrid
      state.orders[i].BodovaniKridC = payload.BodovaniKridC
      state.orders[i].BodovaniKrid = payload.BodovaniKrid
      state.orders[i].SplnenoBodovaniKridC = payload.SplnenoBodovaniKridC
      state.orders[i].SplnenoBodovaniKrid = payload.SplnenoBodovaniKrid
      state.orders[i].ThermacolKridC = payload.ThermacolKridC
      state.orders[i].ThermacolKrid = payload.ThermacolKrid
      state.orders[i].NarezThermacolKridC = payload.NarezThermacolKridC
      state.orders[i].NarezThermacolKrid = payload.NarezThermacolKrid
      state.orders[i].LepeniThermacolKridC = payload.LepeniThermacolKridC
      state.orders[i].LepeniThermacolKrid = payload.LepeniThermacolKrid
      state.orders[i].CncThermacolKridC = payload.CncThermacolKridC
      state.orders[i].CncThermacolKrid = payload.CncThermacolKrid
      state.orders[i].LepeniKridC = payload.LepeniKridC
      state.orders[i].LepeniKrid = payload.LepeniKrid
      state.orders[i].SplnenoLepeniKridC = payload.SplnenoLepeniKridC
      state.orders[i].SplnenoLepeniKrid = payload.SplnenoLepeniKrid
      state.orders[i].StrikarnaKridC = payload.StrikarnaKridC
      state.orders[i].StrikarnaKrid = payload.StrikarnaKrid
      state.orders[i].SplnenoStrikarnaKridC = payload.SplnenoStrikarnaKridC
      state.orders[i].SplnenoStrikarnaKrid = payload.SplnenoStrikarnaKrid
      state.orders[i].RameckyKridC = payload.RameckyKridC
      state.orders[i].RameckyKrid = payload.RameckyKrid
      state.orders[i].NarezRameckyKridC = payload.NarezRameckyKridC
      state.orders[i].NarezRameckyKrid = payload.NarezRameckyKrid
      state.orders[i].FrezRameckyKridC = payload.FrezRameckyKridC
      state.orders[i].FrezRameckyKrid = payload.FrezRameckyKrid
      state.orders[i].SvarRameckyKridC = payload.SvarRameckyKridC
      state.orders[i].SvarRameckyKrid = payload.SvarRameckyKrid
      state.orders[i].StriRameckyKridC = payload.StriRameckyKridC
      state.orders[i].StriRameckyKrid = payload.StriRameckyKrid
      state.orders[i].KompletaceKridC = payload.KompletaceKridC
      state.orders[i].KompletaceKrid = payload.KompletaceKrid
      state.orders[i].SplnenoKompletaceKridC = payload.SplnenoKompletaceKridC
      state.orders[i].SplnenoKompletaceKrid = payload.SplnenoKompletaceKrid
      state.orders[i].SkladKridC = payload.SkladKridC
      state.orders[i].SkladKrid = payload.SkladKrid
      state.orders[i].PlechSkladKridC = payload.PlechSkladKridC
      state.orders[i].PlechSkladKrid = payload.PlechSkladKrid
      state.orders[i].KovaniSkladKridC = payload.KovaniSkladKridC
      state.orders[i].KovaniSkladKrid = payload.KovaniSkladKrid
      state.orders[i].BarvaSkladKridC = payload.BarvaSkladKridC
      state.orders[i].BarvaSkladKrid = payload.BarvaSkladKrid
      state.orders[i].SkloSkladKridC = payload.SkloSkladKridC
      state.orders[i].SkloSkladKrid = payload.SkloSkladKrid
      state.orders[i].PripravaHliC = payload.PripravaHliC
      state.orders[i].PripravaHli = payload.PripravaHli
      state.orders[i].DokumentPripravaHliC = payload.DokumentPripravaHliC
      state.orders[i].DokumentPripravaHli = payload.DokumentPripravaHli
      state.orders[i].IndocaPripravaHliC = payload.IndocaPripravaHliC
      state.orders[i].IndocaPripravaHli = payload.IndocaPripravaHli
      state.orders[i].NarezHliC = payload.NarezHliC
      state.orders[i].NarezHli = payload.NarezHli
      state.orders[i].ProfilNarezHliC = payload.ProfilNarezHliC
      state.orders[i].ProfilNarezHli = payload.ProfilNarezHli
      state.orders[i].ListyNarezHliC = payload.ListyNarezHliC
      state.orders[i].ListyNarezHli = payload.ListyNarezHli
      state.orders[i].CncHliC = payload.CncHliC
      state.orders[i].CncHli = payload.CncHli
      state.orders[i].SplnenoCncHliC = payload.SplnenoCncHliC
      state.orders[i].SplnenoCncHli = payload.SplnenoCncHli
      state.orders[i].FrezaHliC = payload.FrezaHliC
      state.orders[i].FrezaHli = payload.FrezaHli
      state.orders[i].SplnenoFrezaHliC = payload.SplnenoFrezaHliC
      state.orders[i].SplnenoFrezaHli = payload.SplnenoFrezaHli
      state.orders[i].Priprava2HliC = payload.Priprava2HliC
      state.orders[i].Priprava2Hli = payload.Priprava2Hli
      state.orders[i].SplnenoPriprava2HliC = payload.SplnenoPriprava2HliC
      state.orders[i].SplnenoPriprava2Hli = payload.SplnenoPriprava2Hli
      state.orders[i].StrikarnaHliC = payload.StrikarnaHliC
      state.orders[i].StrikarnaHli = payload.StrikarnaHli
      state.orders[i].SplnenoStrikarnaHliC = payload.SplnenoStrikarnaHliC
      state.orders[i].SplnenoStrikarnaHli = payload.SplnenoStrikarnaHli
      state.orders[i].KompletaceHliC = payload.KompletaceHliC
      state.orders[i].KompletaceHli = payload.KompletaceHli
      state.orders[i].SplnenoKompletaceHliC = payload.SplnenoKompletaceHliC
      state.orders[i].SplnenoKompletaceHli = payload.SplnenoKompletaceHli
      state.orders[i].SkladHliC = payload.SkladHliC
      state.orders[i].SkladHli = payload.SkladHli
      state.orders[i].ProfilSkladHliC = payload.ProfilSkladHliC
      state.orders[i].ProfilSkladHli = payload.ProfilSkladHli
      state.orders[i].BarvaSkladHliC = payload.BarvaSkladHliC
      state.orders[i].BarvaSkladHli = payload.BarvaSkladHli
      state.orders[i].KovaniSkladHliC = payload.KovaniSkladHliC
      state.orders[i].KovaniSkladHli = payload.KovaniSkladHli
      state.orders[i].SkloSkladHliC = payload.SkloSkladHliC
      state.orders[i].SkloSkladHli = payload.SkloSkladHli
      state.orders[i].PozadovanyColor = payload.PozadovanyColor
      state.orders[i].PozadovanyDatum = payload.PozadovanyDatum
      state.orders[i].DokonceniColor = payload.DokonceniColor
      state.orders[i].DokonceniDatum = payload.DokonceniDatum
      state.orders[i].Adresa = payload.Adresa
      state.orders[i].Ulice = payload.Ulice
      state.orders[i].Cislo = payload.Cislo
      state.orders[i].Mesto = payload.Mesto
      state.orders[i].PSC = payload.PSC
      state.orders[i].PlosnyMaterial = payload.PlosnyMaterial
      state.orders[i].Poznamky = payload.Poznamky
      state.orders[i].HotovoBloky = payload.HotovoBloky
    },
    DELETE_ORDER: (state, payload) => {
      const i = state.orders.findIndex(element => element._id === payload.documentKey._id)
      state.orders.splice(i, 1)
    },
    // USERS PART
    SET_USER: (state, payload) => {
      state.users = payload
    },
    ADD_USER: (state, payload) => {
      state.users.push(payload)
    },
    PUT_USER: (state, payload) => {
      const i = state.users.findIndex(element => element._id === payload._id)
      state.users[i].Password = payload.Password
      state.users[i].Username = payload.Username
      state.users[i].Archiv = payload.Archiv
      state.users[i].Dokonceni = payload.Dokonceni
      state.users[i].Dvere = payload.Dvere
      state.users[i].Expedice = payload.Expedice
      state.users[i].IsAdmin = payload.IsAdmin
      state.users[i].Klapacka = payload.Klapacka
      state.users[i].Kompletace = payload.Kompletace
      state.users[i].Obchod = payload.Obchod
      state.users[i].Oblozky = payload.Oblozky
      state.users[i].Posuv = payload.Posuv
      state.users[i].PrepisCisloZakazky = payload.PrepisCisloZakazky
      state.users[i].PresunDoArchivu = payload.PresunDoArchivu
      state.users[i].PresunDoExpedice = payload.PresunDoExpedice
      state.users[i].PresunDoVyroby = payload.PresunDoVyroby
      state.users[i].Priprava = payload.Priprava
      state.users[i].PripravarVyroby = payload.PripravarVyroby
      state.users[i].PristupDrevo = payload.PristupDrevo
      state.users[i].PristupHlinik = payload.PristupHlinik
      state.users[i].PristupOcel = payload.PristupOcel
      state.users[i].Ramecek = payload.Ramecek
      state.users[i].Sklad = payload.Sklad
      state.users[i].Stredove = payload.Stredove
    },
    DELETE_USER: (state, payload) => {
      const i = state.users.findIndex(element => element._id === payload.documentKey._id)
      state.users.splice(i, 1)
    }
  },
  actions: {
    SET_ORDER: async (context) => {
      const { data } = await Axios.get('http://localhost:5000/order')
      context.commit('SET_ORDER', data)
    },
    ADD_ORDER: async (context, payload) => {
      context.commit('ADD_ORDER', payload)
    },
    PUT_ORDER: async (context, payload) => {
      context.commit('PUT_ORDER', payload)
    },
    DELETE_ORDER: async (context, payload) => {
      context.commit('DELETE_ORDER', payload)
    },
    UNPROCESS_ORDER: async (context, payload) => {
      context.commit('UNPROCESS_ORDER', payload)
    },
    MOVEDOWN_ORDER: async (context, payload) => {
      context.commit('MOVEDOWN_ORDER', payload)
    },
    SET_USER: async (context) => {
      const { data } = await Axios.get('http://localhost:5000/user')
      context.commit('SET_USER', data)
    },
    ADD_USER: async (context, payload) => {
      context.commit('ADD_USER', payload)
    },
    PUT_USER: async (context, payload) => {
      context.commit('PUT_USER', payload)
    },
    DELETE_USER: async (context, payload) => {
      context.commit('DELETE_USER', payload)
    }
  },
  modules: {
  }
})
