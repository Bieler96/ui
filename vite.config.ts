import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss(), dts({ insertTypesEntry: true })],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'DabiUI',
			formats: ['es', 'cjs'],
			fileName: (format) => `dabi-ui.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
})
