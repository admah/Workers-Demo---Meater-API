import ky from "ky";

import { returnHtml } from "./content";

export interface Env {
  MEATER_USER: string;
  MEATER_PASS: string;
}

const meaterHost = "https://public-api.cloud.meater.com/v1";

function celToFar(temp: string) {
  return Math.trunc((+temp * 9) / 5 + 32) + "\xB0F.";
}

async function authAndReturnToken(env: Env) {
  const authUrl = meaterHost + "/login";
  const creds: { email: string; password: string } = {
    email: env.MEATER_USER,
    password: env.MEATER_PASS,
  };

  const init: any = {
    json: creds,
    credentials: undefined,
  };

  const authResponse: any = await ky.post(authUrl, init).json();

  return authResponse.data.token;
}

const worker: ExportedHandler<Env> = {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const deviceUrl = meaterHost + "/devices";
    const authToken = await authAndReturnToken(env);
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const init = {
      headers,
      credentials: undefined,
    };
    const deviceResponse: any = await ky.get(deviceUrl, init).json();

    const html = returnHtml(deviceResponse);

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};

export default worker;
