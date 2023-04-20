import Home from '../pages/Home';
import config from '../config';
import DungCuHocTap from '../pages/DungCuHocTap';
import DoChoi from '../pages/DoChoi';
import MyThuat from '../pages/MyThuat';
import VanPhongPham from '../pages/VanPhongPham';
import ButViet from '../pages/ButViet';
import CartCheckout from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';
import { HeaderOnly } from '../layouts';
import { Login, SignUp } from '../pages/Auth';
import Sach from '../pages/Sach';
import DatHangThanhCong from '../pages/DatHangThanhCong';
import KetQuaTimKiem from '../pages/KetQuaTimKiem';
import ThongTinTaiKhoan from '../pages/ThongTinTaiKhoan';
import DonHang from '../pages/DonHang';
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
    { path: config.routes.thongtintaikhoan, component: ThongTinTaiKhoan, layout: HeaderOnly },
    { path: config.routes.donhang, component: DonHang, layout: HeaderOnly },
    { path: config.routes.dathangthanhcong, component: DatHangThanhCong, layout: HeaderOnly },
    { path: config.routes.chitietsanpham, component: ProductDetail, layout: HeaderOnly },
    { path: config.routes.ketquatimkiem, component: KetQuaTimKiem, layout: HeaderOnly },
    { path: config.routes.sach, component: Sach },
];
//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
