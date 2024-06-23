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
  const handleSubmit = () => {
    console.log("submit");
  };
  const handleDelete = (id: number) => {
    console.log("delete");
  };

  return (
    <>
      <div>
        <h1></h1>
        <AddFacility
          locations={locations}
          owners={owners}
          onSubmit={handleSubmit}
        />
      </div>
      <div>
        <FacilitiesList
          Facilities={filteredfacilitied}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
