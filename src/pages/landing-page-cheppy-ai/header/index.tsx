import { useResponsive } from '../hooks/use-responsive';
import { HeaderMobile } from './header-mobile';
import { HeaderTablet } from './header-tablet';

const Header = () => {
   const { isMobile } = useResponsive();

   if (isMobile) return <HeaderMobile />;
   return <HeaderTablet />;
};

export default Header;
