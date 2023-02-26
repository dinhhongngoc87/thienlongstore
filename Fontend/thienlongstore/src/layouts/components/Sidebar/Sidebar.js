import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '../../../config';
import Menu,{MenuItem} from './Menu';
import { NewsPaperIcon, HomeIcon, LiveIcon } from '../../../components/Icons';

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title = "Home" to = {config.routes.home} icon = {<HomeIcon/>}/>
                <MenuItem title = "Văn phòng phẩm" to = {config.routes.vanphongpham} icon = {<NewsPaperIcon/>}/>
                <MenuItem title = "Dụng cụ học tập" to = {config.routes.dungcuhoctap} icon = {<LiveIcon/>}/>
                <MenuItem title = "Bút viết" to = {config.routes.butviet} icon = {<LiveIcon/>}/>
                <MenuItem title = "Mỹ thuật" to = {config.routes.mythuat} icon = {<LiveIcon/>}/>
                <MenuItem title = "Đồ chơi" to = {config.routes.dochoi} icon = {<LiveIcon/>}/>
                <MenuItem title = "Bộ dụng cụ mỹ thuật" to = {config.routes.bodungcumythuat} icon = {<LiveIcon/>}/>
            </Menu>
        </aside>
    )
}

export default Sidebar;
