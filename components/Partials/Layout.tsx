import { FC } from 'react';

import Footer from '@/components/Partials/Footer';
import Topbar from '@/components/Partials/Topbar';

const Layout: FC = ({ children }) => (
  <>
    <Topbar />
    <main className="container">{children}</main>
    <Footer />
  </>
);

export default Layout;
