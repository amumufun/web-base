import './index.scss';
import set from './set';

new Promise((resolve) => {
  resolve(123);
});

for (const item of set) {
  document.write(item);
}