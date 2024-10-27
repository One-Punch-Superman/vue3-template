import Pagination from './pagination/index.vue';
import SvgIcon from './svgIcon/index.vue';

const components: any = {
  Pagination,
  SvgIcon
};

export { Pagination, SvgIcon };

export default {
  install(app: any) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key]);
    });
  }
};
