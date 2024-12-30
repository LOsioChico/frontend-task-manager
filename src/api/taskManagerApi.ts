import axios from "axios";

import { config } from "../config/environment";

export const taskManagerApi = axios.create({
  baseURL: `${config.api.baseUrl}/api/tasks`,
  headers: {
    "Content-Type": "application/json",
  },
});
