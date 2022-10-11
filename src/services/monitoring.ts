import axios from "axios";

import { baseUrl } from "../utils/baseUrl";

export async function getQuatersList(token: string) {
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

export async function getEquipmentList(token: string, quaterPrefix: string) {
  try {
    const equipment: any = await axios.get(
      `${baseUrl}/monitoramento/instalacao/${quaterPrefix}/equipamentos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return equipment.data.equipamentos;
  } catch {
    (err: any) => {
      console.log(err);
      return err;
    };
  }
}

export async function getLastDayInfos(
  token: string,
  id_equipament: string,
  key: string
) {
  try {
    const equipment: any = await axios.get(
      `${baseUrl}/monitoramento/historico/${id_equipament}/24?chave=${key}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return equipment.data;
  } catch {
    (err: any) => {
      console.log(err);
      return err;
    };
  }
}
