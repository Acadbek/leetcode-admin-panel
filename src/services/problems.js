import { PROBLEMS_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance';

export const problemsService = {
  getProblems: async () => {
    const res = await instance.get(PROBLEMS_ENDPOINTS.GET_PROBLEMS);
    return res.json();
  },
  getProblem: async (id) => {
    const res = await instance.get(
      PROBLEMS_ENDPOINTS.GET_PROBLEM.replace(':id', id)
    );
    return res.json();
  },
  createProblem: async (payload) => {
    const res = await instance.post(PROBLEMS_ENDPOINTS.CREATE_PROBLEM, {
      json: payload,
    });
    return res.json();
  },
  updateProblem: async (id, payload) => {
    const res = await instance.put(
      PROBLEMS_ENDPOINTS.UPDATE_PROBLEM.replace(':id', id),
      { json: payload }
    );
    return res.json();
  },
  deleteProblem: async (id) => {
    const res = await instance.delete(
      PROBLEMS_ENDPOINTS.DELETE_PROBLEM.replace(':id', id)
    );
    return res.json();
  },
  getLessonsProblems: async (id) => {
    const res = await instance.get(
      PROBLEMS_ENDPOINTS.GET_LESSONS_PROBLEMS.replace(':id', id)
    );
    return res.json();
  },
  createLessonProblem: async (id, payload) => {
    const res = await instance.post(
      PROBLEMS_ENDPOINTS.CREATE_LESSON_PROBLEM.replace(':id', id),
      { json: payload }
    );
    return res.json();
  },
  // updateLessonProblem: async (id, payload) => {
  //   const res = await instance.put(PROBLEMS_ENDPOINTS.UPDATE_LESSON_PROBLEM.replace(":id", id), { json: payload });
  //   return res.json();
  // },
  // deleteLessonProblem: async (id) => {
  //   const res = await instance.delete(PROBLEMS_ENDPOINTS.DELETE_LESSON_PROBLEM.replace(":id", id));
  //   return res.json();
  // },
};
