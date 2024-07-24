import { number } from "zod";

interface Facility {
  id: number;
  facility_name: string;
}
interface Props {
  Facilities: Facility[];
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

const FacilitiesList = ({ Facilities, onDelete, onArchive }: Props) => {
  return (
    <table className="table table-borded">
      <thead>
        <tr>
          <th>Facility Name</th>
        </tr>
      </thead>
      <tbody>
        {Facilities.map((Facility) => (
          <tr key={Facility.id}>
            <td>{Facility.facility_name}</td>
            <td>
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => onArchive(Facility.id)}
              >
                Archive
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDelete(Facility.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FacilitiesList;
