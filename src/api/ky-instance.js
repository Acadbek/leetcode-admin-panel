import ky from "ky";

export const instance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (!request.headers.get("Authorization")) {
          request.headers.set(
            "Authorization",
            `Bearer ${localStorage.getItem("token")}`
          );
        }
      },
    ],
  }
});