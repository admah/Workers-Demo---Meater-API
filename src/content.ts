function celToFar(temp: string) {
  return Math.trunc((+temp * 9) / 5 + 32) + "\xB0F.";
}

function returnHtml(deviceResponse: any) {
  const devices = deviceResponse.data.devices;
  const inUse = devices.length > 0;

  const html = `<!DOCTYPE html>
  <head>
    <script defer src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div x-data class="container mx-auto p-2 flex rounded-sm outline outline-offset-2 outline-1 shadow-sm">
      <p>I'm ${inUse ? "" : "not"} currently using my Meater+.</p>
      ${
        inUse
          ? `<p>Today I'm cooking a ${devices[0].cook.name.toLowerCase()} with a target temp of ${celToFar(
              devices[0].cook.temperature.target
            )}</p'>`
          : ""
      }
    </div>
  </body>`;
  return html;
}

export { returnHtml };
