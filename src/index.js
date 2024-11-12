import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // index.css를 임포트하여 글로벌 스타일을 적용
import Mainpage from './component/page/Mainpage';
import PostViewPage from './component/page/PostViewPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClickCountProvider } from './context/ClickCountContext';
import IndexPage from './component/page/IndexPage';
import RealMain from './component/page/RealMain';
import IntroPage from './component/page/IntroPage';
// import GuestBookPage from './component/page/Guestbook';
import Guestbook from './component/page/Guestbook';
import ScrollToTop from './component/ui/ScrollToTop';
import ViewportProvider from './component/ui/ViewportProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ClickCountProvider>
      <ViewportProvider>
        <ScrollToTop />
        <Routes>
          <Route index element={<RealMain />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="index" element={<IndexPage />} />
          <Route path="guestbook" element={<Guestbook />} />
          <Route path="projects" element={<Mainpage />} />
          <Route path="projects/:pID" element={<PostViewPage />} />
        </Routes>
      </ViewportProvider>
    </ClickCountProvider>
  </BrowserRouter>
);
