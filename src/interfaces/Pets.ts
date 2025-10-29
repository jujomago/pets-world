export interface Pet {
  id: string;
  name: string;
  age: number;
  color: string;
  gender: string;
  description?: string;
  //status?: string;
  lostDate?: Date;
  lostLocationLat?: number;
  lostLocationLon?: number;
  lostLocationDetails?: string;
  rewardAmount?: number;
  rewardCoin?: string;
  ageUnit?: string;
  ownerId?: string;
  speciesId?: string;
  breedId?: string;
  breedName?: string;
  images: PetImage[];
  isFavorite?: boolean;
}

export interface PetImage {
  id: string;
  url: string;
  isPrimary?: boolean;
}

export interface Sighting {
  id: string;
  date: Date;
  sightingLat: number;
  sightingLon: number;
  locationDescription?: string;
  description?: string;
  photoUrl?: string;
  petId?: string;
  reporterId?: string;
}

export interface Breed {
  id: string;
  name: string;
  //speciesId?: string;
}

export interface Species {
  id: string;
  name: string;
}
