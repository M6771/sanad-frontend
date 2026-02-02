import instance from "./axios";

export const getCenters = async (location?: string) => {
  const params = location ? { location } : {};
  const response = await instance.get("/directory/centers", { params });
  return response.data;
};

export const getCenterDetails = async (centerId: string) => {
  const response = await instance.get(`/directory/centers/${centerId}`);
  return response.data;
};

export const getProfessionals = async (location?: string) => {
  const params = location ? { location } : {};
  const response = await instance.get("/directory/professionals", { params });
  return response.data;
};

export const getProfessionalDetails = async (professionalId: string) => {
  const response = await instance.get(`/directory/professionals/${professionalId}`);
  return response.data;
};
