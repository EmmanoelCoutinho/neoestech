import axios from "axios";

const baseUrl = "https://dev.api.neoestech.com.br";

export async function getQuaters(token: string) {
  try {
    const quater: any = await axios.get(
      `${baseUrl}/monitoramento/instalacoes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return quater.data;
  } catch {
    (err: any) => {
      console.log(err);
      return err;
    };
  }
}
