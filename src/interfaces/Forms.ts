import { Gender } from "@prisma/client";

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
  //TODO: Aniadir lat long
  lat: number;
  lng: number;
  images: [];
}
