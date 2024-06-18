import axiosWithApiServer from "@/frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";

const save_load_adapter = {
  study_templates: [],

  getAllCharts: async function () {
    try {
      const { data } = await axiosWithApiServer({
        url: `/v1/charts`,
        method: "get"
      });
      return Promise.resolve(data || []);
    } catch (er) {
      return Promise.reject(er);
    }
  },

  removeChart: async function (id: any) {
    try {
      const { status } = await axiosWithApiServer({
        url: `/v1/charts?id=${id}`,
        method: "delete"
      });

      return Promise.resolve("success");
    } catch (err) {
      return Promise.reject("failed");
    }
  },

  saveChart: async function (chartData: null | undefined) {
    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const isMultiPartData = true;
      const res = await axiosWithApiServer({
        url: `/v1/charts`,
        method: "post",
        headers: { headers },
        body: { ...chartData },
        isMultiPartData
      });

      const { data } = res;
      return Promise.resolve(data.id);
    } catch (err) {
      return Promise.reject("failed");
    }
  },

  getChartContent: async function (id: any) {
    try {
      const { data } = await axiosWithApiServer({
        url: `/v1/charts?id=${id}`,
        method: "get"
      });

      return Promise.resolve(data.content);
    } catch (er) {
      return Promise.reject(er);
    }
  },

  removeStudyTemplate: async function (studyTemplateData: { name: any }) {
    let template = this.study_templates.find((item) => item.name === studyTemplateData.name);
    let id = template?.id;

    try {
      const { status } = await axiosWithApiServer({
        url: `/v1/study-templates?id=${id}`,
        method: "delete"
      });

      return Promise.resolve("success");
    } catch {
      return Promise.reject();
    }
  },

  getStudyTemplateContent: async function (studyTemplateData: { name: any }) {
    let template = this.study_templates.find((item) => item.name === studyTemplateData.name);
    try {
      const { data, status } = await axiosWithApiServer({
        url: `/v1/study-templates?id=${template.id}`,
        method: "get"
      });
      return Promise.resolve(data.content);
    } catch (er) {
      return Promise.reject(er);
    }
  },

  saveStudyTemplate: async function (studyTemplateData: { name: any }) {
    let isTemplate = this.study_templates.find((item) => item.name === studyTemplateData.name);
    // if(isTemplate){
    //     this.removeStudyTemplate(isTemplate);
    // }
    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const isMultiPartData = true;
      const { data, status } = await axiosWithApiServer({
        url: `/v1/study-templates`,
        headers,
        body: { ...studyTemplateData },

        method: "post",
        isMultiPartData
      });
      return Promise.resolve(data.id);
    } catch (err) {
      return Promise.reject("failed");
    }
  },

  getAllStudyTemplates: async function () {
    try {
      const { data, status } = await axiosWithApiServer({
        url: `/v1/study-templates`,
        method: "get"
      });

      this.study_templates = data || [];
      return Promise.resolve(data || []);
    } catch (er) {
      return Promise.reject(er);
    }
  }
};

export default save_load_adapter;
