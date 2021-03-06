import React from 'react';
import PropTypes from 'prop-types';

import { gettext, fullDate } from 'utils';
import { getPicture, getPreviewRendition, showItemVersions } from 'wire/utils';
import ListItemPreviousVersions from './ListItemPreviousVersions';
import PreviewActionButtons from './PreviewActionButtons';
import PreviewTags from './PreviewTags';
import PreviewMeta from './PreviewMeta';


function Preview({item, actions}) {
    const picture = getPicture(item);
    return (
        <div className='wire-column__preview__items'>

            <div className='wire-column__preview__top-bar'>
                <span className='wire-column__preview__date'>{gettext('Created {{ date }}' , {date: fullDate(item.versioncreated)})}</span>
                <PreviewActionButtons item={item} actions={actions} />
            </div>

            <div id='preview-article' className='wire-column__preview__content'>
                <span className='wire-column__preview__slug'>{item.slugline}</span>
                <h2 className='wire-column__preview__headline'>{item.headline}</h2>
                <p className='wire-column__preview__author'>{gettext('By')}{' '}
                    <span className='bold'>{item.byline}</span>{' '}
                    <span>{gettext('in {{ located}}', {located: item.located})}</span>
                </p>
                {getPreviewRendition(picture) && (
                    <figure className='wire-column__preview__image'>
                        <img src={getPreviewRendition(picture).href} />
                        <figcaption className='wire-column__preview__caption'>{picture.description_text}</figcaption>
                    </figure>
                )}

                <PreviewMeta item={item} isItemDetail={false}/>
                {item.description_text &&
                        <p className='wire-column__preview__lead'>{item.description_text}</p>
                }
                {item.body_html &&
                        <div className='wire-column__preview__text' id='preview-body' dangerouslySetInnerHTML={({__html: item.body_html})} />
                }

                <PreviewTags item={item} isItemDetail={false} />

                {showItemVersions(item) &&
                    <ListItemPreviousVersions item={item} isPreview={true} />
                }

            </div>
        </div>
    );
}

Preview.propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        action: PropTypes.func,
        url: PropTypes.func,
    })),
};

export default Preview;
