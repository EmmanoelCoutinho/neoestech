import axios from "axios";
import IUser from "../@types/userType";

const baseUrl = "https://dev.api.neoestech.com.br";

export async function UserLogin(username: string, password: string) {
  try {
    const user: IUser = await axios.post(`${baseUrl}/login`, {
      login: username,
      password,
    });
    return { user, err: null };
  } catch {
    (err: any) => {
      console.log(err);
      return { user: null, err };
    };
  }
}
