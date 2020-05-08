import './index.scss';
import set from './sum';

new Promise((resolve, reject) => {
  resolve(123);
})

for (const item of set) {
  console.log(item);
}