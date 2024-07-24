import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facility, Location, Owner } from "../types";
import DropdownMenu from "./DropDown";

interface Props {
  onSubmit: (data: Facility) => void;
  locations: Location[];
  owners: Owner[];
  onCheckExists: (facility_name: string) => boolean;
}

const schema = z.object({
  facility_name: z.string().min(5).max(50),
});
type AddFacilityData = z.infer<typeof schema>;

const AddFacility: React.FC<Props> = ({
  onSubmit,
  locations,
  owners,
  onCheckExists,
}) => {
  const [facilityName, setFacilityName] = useState("");
  const [districtId, setDistrictId] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFacilityData>({ resolver: zodResolver(schema) });

  const handleSelectLocation = (id: string) => {
    setDistrictId(id);
  };

  const handleSelectOwner = (id: string) => {
    setOwnerId(id);
  };

  const onSubmitForm = (data: AddFacilityData) => {
    const facilityName = data.facility_name;

    if (onCheckExists(facilityName)) {
      alert("Facility already exists!");
      return;
    }

    const districtCode =
      locations
        .find((loc) => loc.id === districtId)
        ?.district_name.slice(0, 2)
        .toUpperCase() || "";
    const facility_code = `${districtCode}${Math.random()
      .toString(36)
      .slice(2, 10)
      .toUpperCase()}`;
    const id = Math.floor(Math.random() * 1000000000);

    const newFacility: Facility = {
      id,
      facility_code,
      facility_name: facilityName,
      district_id: districtId,
      facility_owner_id: ownerId,
      isArchived: false,
    };

    onSubmit(newFacility);
    setFacilityName("");
    setDistrictId("");
    setOwnerId("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="mb-3">
        <label htmlFor="facility-name" className="form-label">
          Facility Name
        </label>
        <input
          {...register("facility_name")}
          id="facility_name"
          type="text"
          className="form-control"
          value={facilityName}
          onChange={(e) => setFacilityName(e.target.value)}
        />
        {errors.facility_name && (
          <p className="text-danger">{errors.facility_name.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="district" className="form-label">
          District
        </label>
        <DropdownMenu
          options={locations.map((loc) => ({
            id: loc.id,
            name: loc.district_name,
          }))}
          onSelect={handleSelectLocation}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="owner" className="form-label">
          Owner
        </label>
        <DropdownMenu
          options={owners.map((owner) => ({
            id: owner.id,
            name: owner.facility_owner,
          }))}
          onSelect={handleSelectOwner}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Facility
      </button>
    </form>
  );
};

export default AddFacility;
