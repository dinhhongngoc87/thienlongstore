import Home from '../pages/Home';
import Search from '../pages/Search';
import config from '../config';
import DungCuHocTap from '../pages/DungCuHocTap';
import DoChoi from '../pages/DoChoi';
import MyThuat from '../pages/MyThuat';
import VanPhongPham from '../pages/VanPhongPham';
import ButViet from '../pages/ButViet';
import BoDungCuMyThuat from '../pages/BoDungCuMyThuat/BoDungCuMyThuat';
import CartCheckout from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';
import { HeaderOnly } from '../layouts';
import { Login, SignUp } from '../pages/Auth';
//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.vanphongpham, component: VanPhongPham },
    { path: config.routes.dungcuhoctap, component: DungCuHocTap },
    { path: config.routes.butviet, component: ButViet },
    { path: config.routes.mythuat, component: MyThuat },
    { path: config.routes.dochoi, component: DoChoi },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.signup, component: SignUp, layout: null },
    { path: config.routes.cart, component: CartCheckout, layout: HeaderOnly },
    { path: config.routes.chitietsanpham, component: ProductDetail, layout: HeaderOnly },
    { path: config.routes.bodungcumythuat, component: BoDungCuMyThuat },
    { path: config.routes.search, component: Search, layout: null },
];
//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
