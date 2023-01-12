function returnHtml(deviceResponse: any) {
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
  return html;
}

export { returnHtml };
