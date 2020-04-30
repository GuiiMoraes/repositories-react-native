import api from "./api";

export async function getRepositories() {
  try {
    const response = await api.get("/repositories");
    return response;
  } catch (err) {
    return err;
  }
}

export async function postRepositoryLike(id) {
  try {
    const response = await api.post(`/repositories/${id}/like`);
    return response;
  } catch (err) {
    return err;
  }
}
