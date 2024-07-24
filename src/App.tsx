import React from "react";
import FacilitiesList from "./components/FacilitiesList";
import AddFacility from "./components/AddFacility";
import { useState, useEffect } from "react";
import { Location, Owner, Facility } from "./types";
import {
  fetchLocations,
  fetchOwners,
  fetchfacilities,
} from "./services/api-clients";
import SearchFilter from "./components/SearchFilter";

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
  const [Archive, setArchive] = useState(false);

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
  const handleArchive = (id: number) => {
    setFacilities(
      facilities.map((facility) =>
        facility.id === id ? { ...facility, setArchive: true } : facility
      )
    );
  };

  const checkIfFacilityExists = (facilityName: string) => {
    return facilities.some(
      (facility) => facility.facility_name === facilityName
    );
  };

  return (
    <>
      <div>
        <h1></h1>
        <SearchFilter></SearchFilter>
        <AddFacility
          onCheckExists={checkIfFacilityExists}
          locations={location}
          owners={owners}
          onSubmit={handleSubmit}
        />
        <FacilitiesList
          onArchive={handleArchive}
          Facilities={facilities}
          onDelete={handleDelete}
        ></FacilitiesList>
      </div>
    </>
  );
}

export default App;
