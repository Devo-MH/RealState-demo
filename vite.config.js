const { defineConfig, splitVendorChunkPlugin } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const config = require("vite-jsconfig");

module.exports = defineConfig({
    plugins: [react(), splitVendorChunkPlugin(), config()],
    server: {
        open: true,
        host: true,
    },
    hmr: {
        overlay: false,
    },
});
