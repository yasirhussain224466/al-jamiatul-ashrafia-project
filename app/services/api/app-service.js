/* eslint-disable no-underscore-dangle */
import BaseService from "./_base-service";

class AppService extends BaseService {
  getCompanies(data) {
    return this.get(
      `/companies?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&search=${data?.search}`,
    );
  }

  getCampuses(data) {
    return this.get(
      `/campuses?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&search=${data?.search}&company_id=${data?.companyId}`,
    );
  }

  getCompanyTeam(data, companyId) {
    return this.get(
      `/companies/teams/${companyId}?page=${data?.page}&limit=${data?.limit}&status=${data?.status}&search=${data?.search}`,
    );
  }

  addCompany(data) {
    return this.post("/companies", data);
  }

  // eslint-disable-next-line consistent-return
  getParticularCompany(id) {
    if (id) {
      return this.get(`/companies/${id}`);
    }
  }

  getParticularBuilding(id) {
    return this.get(`/buildings/${id}`);
  }

  getParticularcampus(id) {
    return this.get(`/campuses/${id}`);
  }

  addBuilding(data) {
    return this.post(`/buildings`, data);
  }

  addCampus(data) {
    return this.post(`/campuses`, data);
  }

  updateCompany(data) {
    return this.put(`/companies/${data.companyId}`, data);
  }

  getRoles() {
    return this.get("/roles");
  }

  getBuildings(id) {
    return this.get(`/buildings?campusId=${id}&page=1&limit=50`);
  }

  getBuildingRooms(data) {
    return this.get(
      `/rooms?buildingId=${data.BuildingId}&departmentId=${data.departmentId}&search=${data.search}&page=${data.page}&limit=${data.limit}&status=${data.status}`,
    );
  }

  getAllCampusesOfCompany(data) {
    return this.get(
      `/campuses/all/${data?.companyId}?status=${data?.status}&page=${data?.page}&limit=${data?.limit}`,
    );
  }

  addUser(data) {
    if (data?._id) {
      return this.put(`/users/${data?._id}`, data);
    }
    return this.post("/users", data);
  }

  removeUser(id) {
    return this.delete(`/users/${id}`);
  }

  searchCampuses(data) {
    return this.get(
      `/campuses/search?status=${data?.status}&search=${data?.search}`,
    );
  }

  getCampus(id) {
    return this.get(`/campuses/${id}`);
  }
}

export default new AppService();
