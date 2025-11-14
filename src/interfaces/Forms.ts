import { AgeUnit, Coin, Gender } from "@prisma/client";

export interface RegisterFormPet {
  name: string;
  age: number;
  lostDate: string;
  color: string;
  speciesId: string;
  breedId: string;
  gender: Gender;
  description: string;
  lostLocationDetails: string;
  rewardAmount: number;
  lat: number;
  lng: number;
  images: [];
  ageUnit: AgeUnit;
  rewardCoin: Coin;
}
export interface ReportFormPet {
  sightingDate: string;
  locationDetails: string;
  lat: number;
  lng: number;
  details: string;
  image?: string;
  petId: string;
}

export interface UserFormPreferences {
  // acceptNotifications: string;
  phones: string;
}
