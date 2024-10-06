import { readFileSync } from 'node:fs';

import { FacilityType, Offer, OfferType, User } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      previewImage,
      photo,
      isPremium,
      isFavorite,
      rate,
      type,
      roomsAmount,
      guestsAmount,
      price,
      facilities,

      name,
      email,
      avatarPath,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city,
      previewImage,
      photo: this.parsePhotos(photo),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rate: Number.parseInt(rate, 10),
      roomsAmount: Number.parseInt(roomsAmount, 10),
      guestsAmount: Number.parseInt(guestsAmount, 10),
      price: Number.parseInt(price, 10),
      type: OfferType[type as OfferType],
      facilities: this.parseFacilities(facilities),
      author: this.parseUser(name, email, avatarPath),
    };
  }

  private parsePhotos(photo: string): string[] {
    return photo.split(';');
  }

  private parseFacilities(facilities: string): FacilityType[] {
    return facilities.split(';') as FacilityType[];
  }

  private parseUser(name: string, email: string, avatarPath: string): User {
    return { name, email, avatarPath };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
