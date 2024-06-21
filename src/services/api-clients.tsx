import axios from 'axios';
import { Location, Owner, facility } from '../types';

const locationsUrl = 'https://zipatala.health.gov.mw/api/districts';
const ownersUrl = 'https://zipatala.health.gov.mw/api/owners';
const propertiesUrl = 'https://zipatala.health.gov.mw/api/facilities';

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await axios.get(locationsUrl);
  return response.data;
};

export const fetchOwners = async (): Promise<Owner[]> => {
  const response = await axios.get(ownersUrl);
  return response.data;
};

export const fetchfacilities = async (): Promise<facility[]> => {
  const response = await axios.get(propertiesUrl);
  return response.data;
};
