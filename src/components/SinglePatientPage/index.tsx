import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { Diagnosis, Patient } from "../../types";

const SinglePatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
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
    const fetchDiagnoses = async () => {
      const response = await diagnosisService.getAll();
      setDiagnoses(response);
    };

    fetchDiagnoses();
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
      {patient?.entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}{" "}
                {Object.values(diagnoses).find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default SinglePatientPage;
