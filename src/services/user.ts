import axios from "axios";

import { baseUrl } from "../utils/baseUrl";

export async function UserLogin(username: string, password: string) {
  try {
    const user: any = await axios.post(`${baseUrl}/login`, {
      login: username,
      password,
    });
    return user.data;
  } catch {
    (err: any) => {
      console.log(err);
      return err;
    };
  }
}
