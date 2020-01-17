import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faEdit } from '@fortawesome/free-regular-svg-icons';

import actions from '../redux/actions';
import months from '../constants/months';
import baseURL from '../constants/apiURL';

import '../css/postTile.css';

const getDate = timestamp => {
    const d = new Date(timestamp);
    return { date: d.getDate(), month: months[d.getMonth()], year: d.getFullYear() };
};

function PostTile(props) {
    const {
        postedDate,
        _id,
        published,
        title,
        headerImageURL,
        metaDescription,
        metaKeywords
    } = props.post;
    const router = useRouter();
    let [loading, setLoading] = useState(false);
    const { adminButtons } = props;

    const dateObj = getDate(postedDate);

    const url = `${baseURL}/${published ? 'post' : 'preview'}/${_id}`;
    // for Link routing
    const relativeURLHref = `/${published ? 'post' : 'preview'}/[id]`;
    const relativeURLAs = `/${published ? 'post' : 'preview'}/${_id}`;
    
    const fbShareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const whatsappShareURL = `whatsapp://send?text=${url}`;
    const twitterShareURL = `https://twitter.com/share?url=${url}`;
    const linkedInShareURL = `http://www.linkedin.com/shareArticle?mini=true&url=${url}`;

    const handleTogglePublish = () => {
        const { pathname } = router;
        setLoading(true);
        props.dispatch(actions.dashboardActions.togglePublish({
            _id, published: published === 0 ? 1 : 0
        }, pathname)).then(() => setLoading(false));
    };

    return (
        <div className='col-md-10 offset-md-1'>
            <article className='has-animation animate-in blog-post'>
                <div className='entry-meta-content'>
                    <div className='entry-date'>
                        {dateObj.date} <span>{dateObj.month} {dateObj.year}</span>
                    </div>
                    <Link href={relativeURLHref} as={relativeURLAs}>
                        <a>
                            <h2 className='entry-title'>
                                {title}
                            </h2>
                        </a>
                    </Link>
                    <div className='entry-meta row'>
                        {metaKeywords.map((mk, i) => (
                            <div className='meta-tags' key={i}>#{mk}</div>
                        ))}
                    </div>
                </div>
                <div className='entry-media'>
                    <img src={headerImageURL} alt='title for post' />
                </div>
                <div className='entry-content-bottom'>
                    <Link href={relativeURLHref} as={relativeURLAs}>
                        <a>
                            <p className='entry-content'>{metaDescription}</p>
                        </a>
                    </Link>
                    {
                        published === 1 &&
                        <Link href={relativeURLHref} as={relativeURLAs}>
                            <a className='entry-read-more'>
                                <span></span>
                                Read More
                        </a>
                        </Link>
                    }
                    {
                        adminButtons &&
                        <div className='admin-btns'>
                            <ul className='list-inline'>
                                <li className='list-inline-item'>
                                    <FontAwesomeIcon
                                        className={'toggle-publish' + (loading ? ' toggle-wait' : '')}
                                        icon={published ? faEyeSlash : faEye}
                                        title={published ? 'Unpublish' : 'Publish'}
                                        onClick={loading ? null : handleTogglePublish}
                                    />
                                </li>
                                <li className='list-inline-item'>
                                    <Link href={`/dashboard/edit?id=${_id}`}>
                                        <a>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                title={'Edit Post'}
                                            />
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    }
                    {
                        published === 1 &&
                        <Fragment>
                            <ul className='blog-social-share list-inline'>
                                <li className='list-inline-item'>
                                    <a
                                        href={fbShareURL}
                                        target='_blank'
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className='blog-ss-icons'
                                            title='Share to FB'
                                        />
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a
                                        href={whatsappShareURL}
                                        target='_blank'
                                    >
                                        <FontAwesomeIcon
                                            icon={faWhatsapp}
                                            className='blog-ss-icons'
                                            title='Share to WhatsApp'
                                        />
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a
                                        href={twitterShareURL}
                                        target='_blank'
                                    >
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className='blog-ss-icons'
                                            title='Tweet'
                                        />
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a
                                        href={linkedInShareURL}
                                        target='_blank'
                                    >
                                        <FontAwesomeIcon
                                            icon={faLinkedin}
                                            className='blog-ss-icons'
                                            title='Post to LinkedIn'
                                        />
                                    </a>
                                </li>
                            </ul>
                            <span className='entry-meta bold float-right'>
                                Share
                            </span>
                        </Fragment>
                    }

                </div>
            </article>
        </div>
    );
}

export default connect()(PostTile);
