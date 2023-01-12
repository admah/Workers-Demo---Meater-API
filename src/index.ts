import ky from "ky";

export interface Env {
  MEATER_USER: string;
  MEATER_PASS: string;
}

const meaterHost = "https://public-api.cloud.meater.com/v1";

function celToFar(temp: string) {
  return Math.trunc((+temp * 9) / 5 + 32) + "\xB0F.";
}

const worker: ExportedHandler<Env> = {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    async function authAndReturnToken() {
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

    const deviceUrl = meaterHost + "/devices";
    const authToken = await authAndReturnToken();
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    const init = {
      headers,
      credentials: undefined,
    };
    const deviceResponse: any = await ky.get(deviceUrl, init).json();
    const devices = deviceResponse.data.devices;
    const inUse = devices.length > 0;

    const html = `<!DOCTYPE html>
<body>
  <h1>Hello!</h1>
  <p>I'm ${inUse ? "" : "not"} currently using my Meater+.</p>
  ${
    inUse
      ? `<p>Today I'm cooking a ${devices[0].cook.name.toLowerCase()} with a target temp of ${celToFar(
          devices[0].cook.temperature.target
        )}</p'>`
      : ""
  }
</body>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};

export default worker;
