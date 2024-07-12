import React from "react";
import FacilitiesList from "./components/FacilitiesList";
import { useState, useEffect } from "react";
import AddFacility from "./components/AddFacility";
import { Location, Owner, Facility } from "./types";
import {
  fetchLocations,
  fetchOwners,
  fetchfacilities,
} from "./services/api-clients";

function App() {
  /*const [locations, setLocations] = useState<Location[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);

/*const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedOwner, setSelectedOwner] = useState<string>("");

  useEffect(() => {
    fetchLocations().then(setLocations);
    fetchOwners().then(setOwners);
  }, []);

  useEffect(() => {
    fetchfacilities().then(setFacilities);
  }, []);

  const filteredfacilitied = facilities.filter(
    (facility: Facility) =>
      (!selectedLocation || facility.district_id === selectedLocation) &&
      (!selectedOwner || facility.facility_owner_id === selectedOwner)
  );
  const handleSubmit = () => {
    console.log("submit");
  };
  const handleDelete = (id: number) => {
    console.log("delete");
  };*/

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [location, setDistricts] = useState<Location[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [facilitiesData, locationData, ownersData] = await Promise.all([
        fetchfacilities(),
        fetchLocations(),
        fetchOwners(),
      ]);

      setFacilities(facilitiesData);
      setDistricts(locationData);
      setOwners(ownersData);
    };

    loadData();
  }, []);
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
          locations={location}
          owners={owners}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default App;
