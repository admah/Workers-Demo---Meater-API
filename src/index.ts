import ky from "ky";

import { returnHtml } from "./content";

export interface Env {
  MEATER_USER: string;
  MEATER_PASS: string;
}

const meaterHost = "https://public-api.cloud.meater.com/v1";

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
    console.log("🚀 ~ file: index.ts:35 ~ env:", env);
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
    // const originalResponse = await fetch(request);
    // console.log("🚀 ~ file: index.ts:46 ~ originalResponse:", originalResponse);

    const html = returnHtml(deviceResponse);

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};

export default worker;
