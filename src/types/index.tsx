export interface Location {
    id: string;
    district_name: string;
  }
  
  export interface Owner {
    id: string;
    facility_owner: string;
  }
  
  export interface facility {
    id: string;
    district_id: string;
    facility_owner_id: string;
    facility_name: string;
  }
  