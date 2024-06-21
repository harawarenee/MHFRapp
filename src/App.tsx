import React from "react";
import FacilitiesList from "./components/FacilitiesList";
import { useState, useEffect } from "react";
import AddFacility from "./components/AddFacility";
import { Location, Owner, facility } from "./types";
import {
  fetchLocations,
  fetchOwners,
  fetchfacilities,
} from "./services/api-clients";
import Dropdown from "./components/DropDown";

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [facilities, setFacilities] = useState<facility[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedOwner, setSelectedOwner] = useState<string>("");

  useEffect(() => {
    fetchLocations().then(setLocations);
    fetchOwners().then(setOwners);
  }, []);

  useEffect(() => {
    fetchfacilities().then(setFacilities);
  }, []);

  const filteredfacilitied = facilities.filter(
    (facility: facility) =>
      (!selectedLocation || facility.district_id === selectedLocation) &&
      (!selectedOwner || facility.facility_owner_id === selectedOwner)
  );

  return (
    <>
      <div>
        <h1>Properties</h1>
        <Dropdown
          options={locations.map((loc) => ({
            id: loc.id,
            name: loc.district_name,
          }))}
          onSelect={setSelectedLocation}
        />
        <Dropdown
          options={owners.map((owner) => ({
            id: owner.id,
            name: owner.facility_owner,
          }))}
          onSelect={setSelectedOwner}
        />
      </div>

      <ul>
        {filteredfacilitied.map((facility) => (
          <li key={facility.id}>{facility.facility_name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
