export type Coordinates = {
  lat: string;
  lon: string;
};

export type CityT = {
  coords: Coordinates;
  district: string;
  name: string;
  population: number;
  subject: string;
  id?: string;
};
