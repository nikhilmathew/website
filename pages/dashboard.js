import React from 'react'
import Head from 'next/head';

import withAuth from '../components/withAuth';
import Preloader from '../components/preloader';
import Header from '../components/header';
import Footer from '../components/footer';
import AdminSidebar from '../components/adminSidebar';

const Dashboard = props => {
  console.log(props);

  const dashboardView = (
    <div>
      Dashboard here!
    </div>
  );

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Preloader />
      <Header />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
          { dashboardView }
          <Footer />
          { props.auth.admin && <AdminSidebar /> }
      </div>
    </div>
  );
};

export default withAuth(Dashboard);