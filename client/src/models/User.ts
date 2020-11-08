export interface User {
  Id: string;
  Username: string;
  Password: string;
  Archiv: boolean;
  Dokonceni: boolean;
  Dvere: boolean;
  Expedice: boolean;
  IsAdmin: boolean;
  Klapacka: boolean;
  Kompletace: boolean;
  Obchod: boolean;
  Oblozky: boolean;
  Posuv: boolean;
  PrepisCisloZakazky: boolean;
  PresunDoArchivu: boolean;
  PresunDoExpedice: boolean;
  PresunDoVyroby: boolean;
  Priprava: boolean;
  PripravarVyroby: boolean;
  PristupDrevo: boolean;
  PristupHlinik: boolean;
  PristupOcel: boolean;
  Ramecek: boolean;
  Sklad: boolean;
  Stredove: boolean;
}
