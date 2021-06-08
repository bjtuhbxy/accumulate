import demo from './src/main';

/* istanbul ignore next */
demo.install = function(Vue) {
  Vue.component(demo.name, demo);
};

export default demo;
