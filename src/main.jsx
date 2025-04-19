import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style/main.scss';

import './style/global/normalize.scss';
import './style/global/reset.scss';
import './style/global/colors.scss';
import './style/global/typography.scss';

import './style/components/button.scss';
import './style/components/tag.scss';
import './style/components/tab.scss'
import './style/components/alert.scss'
import './style/components/link.scss'
import './style/components/pagination.scss'
import './style/components/checkboxradio.scss'
import './style/components/toggle.scss'
import './style/components/dropdown.scss'
import './style/components/breadcrumbs.scss'
import './style/components/switcher.scss'
import './style/components/image-placeholder.scss'
import './style/components/text-content.scss'

import './style/components/event-card.scss'
import './style/components/community-card.scss'
import './style/components/document-card.scss'
import './style/components/product-card.scss'
import './style/components/partner-card.scss'
import './style/components/level-card.scss'

import './style/global/base.scss'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


