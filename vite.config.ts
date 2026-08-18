import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) return 'vendor-icons';
              if (id.includes('jszip')) return 'vendor-jszip';
              if (id.includes('motion')) return 'vendor-motion';
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) return 'vendor-react';
              return 'vendor-core';
            }
            if (id.includes('/src/utils/engine3D') || id.includes('/src/utils/custom3DLoader') || id.includes('/src/utils/extruded3D')) {
              return 'engine-3d';
            }
            if (id.includes('/src/utils/vectorDeform') || id.includes('/src/utils/pngDeepEdit') || id.includes('/src/utils/smartFill') || id.includes('/src/utils/pngSilhouette')) {
              return 'engine-vector-deepedit';
            }
            if (id.includes('/src/utils/cppEngine')) {
              return 'engine-cpp';
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
