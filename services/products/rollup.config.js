import { terser } from 'rollup-plugin-terser'

export default {
  output: {
    format: 'cjs',
    exports: 'auto'
  },
  plugins: [
    terser()
  ]
}
