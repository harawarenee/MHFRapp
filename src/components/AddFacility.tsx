import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location, Owner } from "../types";
import { useState } from "react";
import DropdownMenu from "./DropDown";
import Form from "react-bootstrap/Form";

interface Props {
  onSubmit: (data: AddFacilityData) => void;
  locations: Location[];
  owners: Owner[];
  onCheckExists: (facility_name: string) => boolean;
}

const schema = z.object({
  facility_name: z.string().min(5).max(50),
});
type AddFacilityData = z.infer<typeof schema>;

//const AddFacility = ({ onSubmit, locations, owners, }: Props) => {
/*const [facilityName, setFacilityName] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFacilityData>({ resolver: zodResolver(schema) });*/
const AddFacility = ({ onSubmit, locations, owners, onCheckExists }: Props) => {
  const [facilityName, setFacilityName] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [location, setSelectedLocation] = useState<Location[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (onCheckExists(facilityName)) {
      alert("Facility already exists!");
      return;
    }
    const facility_code = `${districtId
      .slice(0, 2)
      .toUpperCase()}${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

    const newFacility: Facility = {
      facility_code,
      facility_name: facilityName,
      district_id: districtId,
      owner_id: ownerId,
    };

    onSubmit(newFacility);
    setFacilityName("");
    setDistrictId("");
    setOwnerId("");
  };
  const {
    register,
    formState: { errors },
  } = useForm<AddFacilityData>({ resolver: zodResolver(schema) });
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="facility-name" className="form-label">
            faciliy name
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
          <DropdownMenu
            options={locations.map((loc) => ({
              id: loc.id,
              name: loc.district_name,
            }))}
            onSelect={setSelectedLocation}
          />
        </div>
        <DropdownMenu
          options={owners.map((owner) => ({
            id: owner.id,
            name: owner.facility_owner,
          }))}
          onSelect={setSelectedOwner}
        />
        <p>
          <button className="btn-primary">Add Facility</button>
        </p>
      </form>
    </>
  );
};

export default AddFacility;
