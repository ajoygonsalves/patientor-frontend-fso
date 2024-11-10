import { Entry, Diagnosis } from "../../types";
import { Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealthRatingBar from "../HealthRatingBar";

interface Props {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry, diagnosis }: Props) => {
  const getDiagnosisName = (code: string): string => {
    const foundDiagnosis = Object.values(diagnosis).find(
      (d) => d.code === code
    );
    return foundDiagnosis ? foundDiagnosis.name : code;
  };

  const BaseEntryDetails = () => (
    <div>
      <Typography variant="body1">
        {entry.date} <em>{entry.description}</em>
      </Typography>
      <Typography variant="body2">diagnosed by {entry.specialist}</Typography>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <Typography variant="h6">
            <LocalHospitalIcon /> Hospital Visit
          </Typography>
          <BaseEntryDetails />
          <Typography variant="body2">
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Typography variant="h6">
            <WorkIcon /> Occupational Healthcare - {entry.employerName}
          </Typography>
          <BaseEntryDetails />
          {entry.sickLeave && (
            <Typography variant="body2">
              Sick Leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <Typography variant="h6">
            <MedicalServicesIcon /> Health Check
          </Typography>
          <BaseEntryDetails />
          <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
