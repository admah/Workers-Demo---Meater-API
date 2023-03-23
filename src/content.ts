function celToFar(temp: string) {
  return Math.trunc((+temp * 9) / 5 + 32) + "\xB0F.";
}

function returnHtml(deviceResponse: any) {
  const devices = deviceResponse.data.devices;
  console.log("🚀 ~ file: content.ts:7 ~ returnHtml ~ devices:", devices);
  const inUse = devices.length > 0;

  function deviceHtml(devices: any) {
    console.log("🚀 ~ file: content.ts:11 ~ deviceHtml ~ devices:", devices);
    let content = ``;

    devices.forEach((device: any) => {
      console.log(
        "🚀 ~ file: content.ts:21 ~ devices.forEach ~ device:",
        device
      );
      return content.concat(
        `<p class="text-center">Today I'm cooking a ${device.cook.name.toLowerCase()} using my Meater+, with a target temp of ${celToFar(
          device.cook.temperature.target
        )}</p>`
      );
    });

    console.log("🚀 ~ file: content.ts:14 ~ deviceHtml ~ content:", content);

    return content;
  }

  const html = `<!DOCTYPE html>
  <head>
    <script defer src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
      ${
        inUse
          ? `<div x-data class="container mx-auto p-2 flex gap-4">
                ${devices
                  .map(
                    (device: any, i: number) =>
                      `<div class="flex rounded-sm outline outline-offset-2 outline-1 shadow-sm p-2">
                      <div>
                      <p class="pb-2">
                        On Meater+ #${
                          i + 1
                        }, I'm measuring temps on a ${device.cook.name.toLowerCase()}.</p>
                        <p>Current temp is ${celToFar(
                          device.temperature.internal
                        )}</p>
                        </div>
                    </div>`
                  )
                  .join("")}
            </div>`
          : ""
      }
    </div>
  </body>`;

  return html;
}

export { returnHtml };
