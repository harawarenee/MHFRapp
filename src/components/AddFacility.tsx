import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location, Owner } from "../types";
import { useState } from "react";
import Dropdown from "./DropDown";

interface Props {
  onSubmit: (data: AddFacilityData) => void;
  locations: Location[];
  owners: Owner[];
}

const schema = z.object({
  facility_name: z.string().min(5).max(50),
});
type AddFacilityData = z.infer<typeof schema>;

const AddFacility = ({ onSubmit, locations, owners }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedOwner, setSelectedOwner] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFacilityData>({ resolver: zodResolver(schema) });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <div className="mb-3">
          <label htmlFor="facility-name" className="form-label">
            Facility Name
          </label>
          <input
            {...register("facility_name")}
            id="facility_name"
            type="text"
            className="form-control"
          />
          {errors.facility_name && (
            <p className="text-danger">{errors.facility_name.message}</p>
          )}
        </div>
        <div>
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

        <button className="btn-btn-Primary">Add Facility</button>
      </form>
    </>
  );
};

export default AddFacility;
