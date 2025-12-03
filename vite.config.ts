import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    base: "",
    server: {
        host: 'themayowa.custom',
        port: 7188
    },

    resolve: {
        alias: {
            '@': '/src',
        },
    }
})
