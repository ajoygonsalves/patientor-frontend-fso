import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { Diagnosis, Patient } from "../../types";
import EntryDetails from "./EntryDetails";

const SinglePatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await patientService.getPatientById(id!);
        setPatient(response.data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const response = await diagnosisService.getAll();
      setDiagnosis(response);
    };

    fetchDiagnosis();
  }, [patient]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2>{patient?.name}</h2>
      <p>gender: {patient?.gender}</p>
      <p>occupation: {patient?.occupation}</p>
      <p>ssn: {patient?.ssn}</p>
      <h3>entries</h3>
      {patient?.entries &&
        patient.entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              marginBottom: "1em",
              padding: "1em",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            <EntryDetails entry={entry} diagnosis={diagnosis} />
          </div>
        ))}
    </>
  );
};

export default SinglePatientPage;
