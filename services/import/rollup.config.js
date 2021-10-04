import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'
import { terser } from 'rollup-plugin-terser'

export default {
  output: {
    format: 'cjs',
    exports: 'auto'
  },
  plugins: [
    resolve(),
    autoExternal(),
    terser()
  ]
}
