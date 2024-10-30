import axios from "axios";
import { Patient, PatientFormValues, Response } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Response<Patient>>(
    `${apiBaseUrl}/patients`,
    object
  );
  console.log(data);

  return data;
};

export default {
  getAll,
  create,
};
