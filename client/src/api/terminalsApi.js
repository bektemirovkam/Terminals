import { axios } from "../core/axios";


export const TerminalsApi = {
  fetchAllTerminals: async () => {
    const { data } = await axios.get("/terminals" );
    return data.data;
  },
  fetchSearchTerminal: async (searchConfig) => {
    const  {data} = await axios.get(`/terminals?${searchConfig.orderBy}=${searchConfig.searchValue}`)
    return data.data;
  },
  removeTerminals: async (arrayTerminals) => {
    const { data } = await axios.delete("/terminals/delete", {
      data: { arrayTerminals },
    });
    return data.data;
  },
  addTerminal: async (formData) => {
    const { data } = await axios.post("/terminals", formData);
    return data.data;
  },
};

