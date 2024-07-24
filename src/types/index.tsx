export interface Location {
  id: string;
  district_name: string;
}

export interface Owner {
  id: string;
  facility_owner: string;
}

export interface Facility {
  facility_code: string;
  id: number;
  district_id: string;
  facility_owner_id: string;
  facility_name: string;
}
