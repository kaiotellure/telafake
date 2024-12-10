import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cb_0JSF3.mjs';
import { manifest } from './manifest_DdO8fLij.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/card.astro.mjs');
const _page2 = () => import('./pages/api/pix.astro.mjs');
const _page3 = () => import('./pages/api/status.astro.mjs');
const _page4 = () => import('./pages/_id_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/card.ts", _page1],
    ["src/pages/api/pix.ts", _page2],
    ["src/pages/api/status.ts", _page3],
    ["src/pages/[id].astro", _page4],
    ["src/pages/index.ts", _page5]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/user/telafake/dist/client/",
    "server": "file:///home/user/telafake/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
