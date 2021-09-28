import React from 'react';
import Header from './Header';
import NotFound from './NotFound';

function Layout() {
  return (
    <React.Fragment>
      <link
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css'
        rel='stylesheet'
        integrity='sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU'
        crossorigin='anonymous'
      />
      <Header />
      <div className='container'>
        {/* TODO: Implement the screen starting here */}
        <NotFound />
      </div>
    </React.Fragment>
  );
}

export default Layout;
