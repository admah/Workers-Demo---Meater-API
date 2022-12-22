const meaterHost = 'https://public-api.cloud.meater.com/v1';

function celToFar(temp: string) {
  return Math.trunc(+temp * 9 / 5 + 32) + '\xB0F.';
}

/**
 * gatherResponse awaits and returns a response body.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
 async function gatherResponse(response) {
  return await response.json();
}

async function authAndReturnToken() {
  const authUrl = meaterHost + '/login';
  const body = {
    email: MEATER_USER as string,
    password: MEATER_PASS as string
  };
  const headers = {
    'content-type': 'application/json;charset=UTF-8',
  };
  const init = {
    body: JSON.stringify(body),
    method: 'POST',
    headers
  };

  const authResponse = await fetch(authUrl, init);
  const results = await gatherResponse(authResponse);

  return results.data.token;
}

async function handleRequest() {
  const deviceUrl = meaterHost + '/devices';
  const authToken = await authAndReturnToken();  
  const headers = {
    'Authorization': `Bearer ${authToken}`,
  };
  const init = {
    method: 'GET',
    headers
  };
  const deviceResponse = await fetch(deviceUrl, init);
  const results = await gatherResponse(deviceResponse);
  const devices = results.data.devices;
  // console.log("🚀 ~ file: index.ts:50 ~ handleRequest ~ devices", devices[0].cook)
  const inUse = devices.length > 0;

  const html = `<!DOCTYPE html>
<body>
  <h1>Hello!</h1>
  <p>My name is Adam, and I'm ${inUse ? '' : 'not'} currently using my Meater+.</p>
  ${inUse ? `<p>Today I'm cooking a ${devices[0].cook.name.toLowerCase()} with a target temp of ${celToFar(devices[0].cook.temperature.target)}</p'>` : ''}
</body>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest());
});