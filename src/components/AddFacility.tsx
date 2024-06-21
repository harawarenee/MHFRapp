import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onSubmit: (data: AddFacilityData) => void;
  options: { id: string; name: string }[];
  onSelect: (id: string) => void;
}

const schema = z.object({
  facility_name: z.string().min(5).max(50),
});
type AddFacilityData = z.infer<typeof schema>;

const AddFacility = ({ onSubmit, options, onSelect }: Props) => {
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
        <select onChange={(e) => onSelect(e.target.value)}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <button className="btn-btn-Primary">Add Facility</button>
      </form>
    </>
  );
};

export default AddFacility;
