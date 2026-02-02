import instance from "./axios";

export const getCenters = async () => {
  const response = await instance.get("/directory/centers");
  return response;
};

export const getCenterDetails = async (centerId: string) => {
  const response = await instance.get(`/directory/centers/${centerId}`);
  return response;
};

export const getProfessionals = async () => {
  const response = await instance.get("/directory/professionals");
  return response;
};

export const getProfessionalDetails = async (professionalId: string) => {
  const response = await instance.get(`/directory/professionals/${professionalId}`);
  return response;
};
