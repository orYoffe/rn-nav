const fs = require('fs');

const paths = [
  'node_modules/react-native-screens/lib/commonjs/index.js',
  'node_modules/react-native-screens/lib/module/index.js',
  'node_modules/react-native-screens/src/index.js',
];
paths.forEach(i => {
  const data = fs.readFileSync(i);
  if (data.indexOf('export const shouldUseActivityState') === -1) {
    fs.appendFileSync(
      i,
      `
            export const shouldUseActivityState = false;`,
    );
  }
});
// if (data.indexOf('export const ViewPropTypes') === -1) {
//   fs.appendFile(
//     rnwIndexFile,
//     `export const ViewPropTypes = { style: PropTypes.any };export { default as createElement } from './exports/createElement';`,
//     function (err) {
//       if (err) {
//         // append failed
//         console.log(
//           '--react native elements ViewPropTypes fix--append failed--------err------------',
//           err,
//         );
//       } else {
//         // done
//       }
//     },
//   );
// }
