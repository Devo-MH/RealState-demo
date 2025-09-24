const { defineConfig, splitVendorChunkPlugin } = require("vite");
const react = require("@vitejs/plugin-react-swc");

module.exports = defineConfig({
    plugins: [react(), splitVendorChunkPlugin()],
    server: {
        open: true,
        host: true,
    },
    hmr: {
        overlay: false,
    },
});
