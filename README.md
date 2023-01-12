# Edge-Meater-Widget

This repo contains a Cloudflare Worker that authenticates to the Meater Cloud and returns data from active devices.

For this to work, will need to have:

- a Meater+ thermometer. [Here's a link](https://glnk.io/o7jz/drivewaypitmaster) to buy one for 10% off!
- an active Meater Cloud account.
- Cloudflare Workers CLI installed locally ([instructions](https://developers.cloudflare.com/workers/wrangler/install-and-update/)).

## Installation

1. Create a Cloudflare Worker either via the dashboard or Wrangler (CLI). For detailed instructions, [see the docs](https://developers.cloudflare.com/workers/get-started/guide/).
2. Find your Meater credentials, and store those as secrets per [these docs](https://developers.cloudflare.com/workers/platform/environment-variables/#add-secrets-to-your-project). Enter the first secret as `MEATER_USER` and the second as `MEATER_PASS`.
3. Clone this repo and from the folder run `npm i` to install dependencies.
4. [Publish](https://developers.cloudflare.com/workers/wrangler/commands/#publish) the Worker via Wrangler.
5. Visit the Worker URL after setting up a cook and starting it to display what you are cooking and the current internal temp.



