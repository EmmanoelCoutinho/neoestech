import axios from "axios";

const baseUrl = "https://dev.api.neoestech.com.br";

export async function getAllPriceList(token: string) {
  try {
    const price: any = await axios.get(`${baseUrl}/cadastro/precos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return price.data;
  } catch {
    (err: any) => {
      console.log(err);
      return err;
    };
  }
}

export async function getPriceListById(token: string, id: number) {
  try {
    const price: any = await axios.get(`${baseUrl}/cadastro/precos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return price.data;
  } catch {
    (err: any) => {
      console.log(err);
      return err;
    };
  }
}

export async function createNewPrice(token: string, data: {}) {
  try {
    const price: any = await axios.post(`${baseUrl}/cadastro/precos`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { status: "success", message: '"Preço cadastrado com sucesso!"' };
  } catch {
    (err: any) => {
      console.log(err);
      return { status: "error", message: "Erro ao cadastrar preço!" };
    };
  }
}

export async function updatePrice(token: string, id: number, data: {}) {
  try {
    const price: any = await axios.put(
      `${baseUrl}/cadastro/precos/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "success";
  } catch {
    (err: any) => {
      console.log(err);
      return "error";
    };
  }
}

export async function DeletePrice(token: string, id: number) {
  try {
    const price: any = await axios.delete(`${baseUrl}/cadastro/precos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return "success";
  } catch {
    (err: any) => {
      console.log(err);
      return "error";
    };
  }
}
