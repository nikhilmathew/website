import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { connect } from 'react-redux';

import withAuth from '../../components/withAuth';
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import AdminFAB from '../../components/adminFAB';
import PostEditor from '../../components/dashboard/postEditor';
import PostSidebar from '../../components/dashboard/postSidebar';
import SaveButton from '../../components/dashboard/saveButton.js';
import FullScreenLoader from '../../components/fullScreenLoader';
import restoreFromLS from '../../utils/restoreFromLS';
import { RESTOREPOST } from '../../redux/types';

const CreatePost = props => {
  const { title, loading } = props.dashboardPosts;
  let [isPostRestored, setIsPostRestored] = useState(false);

  useEffect(() => {
    const prevArticleData = restoreFromLS();
    if (prevArticleData) {
      props.dispatch({ type: RESTOREPOST, payload: prevArticleData });
      setIsPostRestored(true);
    }
  }, []);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div>
      <Head>
        <title>{title.trim().length > 0 ? `${title} | New Post` : 'Create Post'}</title>
      </Head>
      <Preloader />
      <Header />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
        <div className='container'>
          <div className='row'>
            <PostEditor 
              postRestored={isPostRestored}
            />
            <PostSidebar 
              postRestored={isPostRestored}
            />
            <SaveButton />
          </div>
        </div>
          <Footer />
          { props.auth.admin && <AdminFAB /> }
      </div>
    </div>
  );
};

export default withAuth(connect(state => state, null)(CreatePost));
