import { FacilityType } from './facility.type.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  photo: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rate: number;
  type: OfferType;
  roomsAmount: number;
  guestsAmount: number;
  price: number;
  facilities: FacilityType[];

  author: User;

  commentsAmount?: number;
  coordinate?: string;
};
