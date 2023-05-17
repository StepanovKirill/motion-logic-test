type Coodinates = {
  lat: string;
  lon: string;
};

export type CityT = {
  coords: Coodinates;
  district: string;
  name: string;
  population: number;
  subject: string;
  id?: string;
};
