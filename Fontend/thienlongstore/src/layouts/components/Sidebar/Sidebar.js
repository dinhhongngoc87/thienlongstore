import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '../../../config';
import Menu, { MenuItem } from './Menu';
import { NewsPaperIcon, HomeIcon, LiveIcon, Ruler, Art, Toys, Book, Pen } from '../../../components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Home" to={config.routes.home} icon={<HomeIcon />} />
                <MenuItem title="Văn phòng phẩm" to={config.routes.vanphongpham} icon={<NewsPaperIcon />} />
                <MenuItem title="Dụng cụ học tập" to={config.routes.dungcuhoctap} icon={<Ruler />} />
                <MenuItem title="Bút viết" to={config.routes.butviet} icon={<Pen />} />
                <MenuItem title="Mỹ thuật" to={config.routes.mythuat} icon={<Art />} />
                <MenuItem title="Đồ chơi" to={config.routes.dochoi} icon={<Toys />} />
                <MenuItem title="Sách" to={config.routes.sach} icon={<Book />} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
