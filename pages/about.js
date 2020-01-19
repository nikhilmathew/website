import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../components/pageLayout';
import AboutMe from '../components/aboutMe';
import TechStack from '../components/techStack';
import AdminFAB from '../components/adminFAB';

import actions from '../redux/actions';

const About = props => {
  useEffect(() => {
    if (props.auth.initiateForceLogout) {
      props.dispatch(actions.authActions.logout());
      return;
    }
  }, []);

  const metaTags = (
    <Fragment>
        <title>About Me - Abhishek Mehandiratta | Web Developer</title>
        <link href='URL' rel='canonical' />
            <link rel='canonical' href='https://iabhishek.dev' />

            <meta name='description' content='A passionate web developer and hardcore gamer.' />
            <meta name='keywords' content='Abhishek, Mehandiratta, About, Developer, Web' />
            <meta name='author' content='Abhishek Mehandiratta' />

            <meta property='og:title' content='About Me - Abhishek Mehandiratta | Web Developer' />
            <meta property='og:type' content='website' />
            <meta property='og:description' content='A passionate web developer and hardcore gamer.' />
            <meta property='og:image' content='https://iabhishek.dev/static/logo.png' />
            <meta property='og:url' content='https://iabhishek.dev/blog' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@abhishek_m' />
            <meta name='twitter:creator' content='@abhishek_m' />
            <meta name='twitter:title' content='About Me - Abhishek Mehandiratta | Web Developer' />
            <meta name='twitter:description' content='A passionate web developer and hardcore gamer.' />
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      <AboutMe />
      { props.auth.admin && <AdminFAB /> }
      <TechStack />
    </PageLayout>
  );
};

About.getInitialProps = async ctx => {
  await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));

  return {};
}

export default connect(state => state)(About);
