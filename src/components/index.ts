import Pagination from './pagination/index.vue';
import SvgIcon from './svgIcon/index.vue';

const globalComponent: any = {
  Pagination,
  SvgIcon
};

export default {
  install(app: any) {
    Object.keys(globalComponent).forEach((key) => {
      app.component(key, globalComponent[key]);
    });
  }
};
