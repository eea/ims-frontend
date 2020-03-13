/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { settings } from '~/config';
import { Button, Header, Image, Modal, Transition } from 'semantic-ui-react'

import { Icon } from '@plone/volto/components';
import ImageFull from '@plone/volto/icons/zoom-in.svg';
import Info from '@plone/volto/icons/spreadsheet.svg';

import './flip.css';
import { flattenToAppURL } from '@plone/volto/helpers';
/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, detached }) => {
  const [zoomed, setZoomed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const trigger = (
    <React.Fragment>

      <div
        className="zoom-icon"
        style={{
          color: hovered ? 'black' : '#826A6A',
          cursor: 'pointer',
          margin: '.5rem',
          transition: '100ms opacity',
          background: 'transparent',
          height: '25px',
          display: 'inline-block'
        }}
        onClick={(e) => e.preventDefault}
        onMouseEnter={() => setHovered(true)}
      >

        <Icon
          onClick={() => {
            setModalOpen(true); setZoomed(true)
          }}
          name={ImageFull}
          title="Enlarge image"

          size="24px" />
      </div>
      <div
        className="enlarge-icon"
        style={{
          color: hovered ? 'black' : '#826A6A',
          cursor: 'pointer',
          transition: '100ms opacity',
          background: 'transparent',
          height: '25px',
          display: data.metadata ? 'inline-block' : 'none',
        }}
        onClick={(e) => e.preventDefault}
        onMouseEnter={() => setHovered(true)}
      >

        <Icon
          onClick={() => {
            setIsFlipped(!isFlipped)
          }}
          name={Info}
          title="Data behind"
          size="24px" />
      </div>
    </React.Fragment>
  )
  return (<p
    className={cx(
      'block image align',
      {
        center: !Boolean(data.align),
        detached,
      },
      data.align,
    )}
  >
    {data.url && (
      <>
        {(() => {
          const image = (
            <React.Fragment>

              <div className="scene scene--card">
                <div className={`card ${isFlipped ? ' is-flipped' : ''}`}>
                  <div className="card__face card__face--front">
                    <img
                      className={cx({ 'full-width': data.align === 'full' })}
                      style={{
                        width: data.width ? data.width + 'px' : 'auto',
                        height: data.height ? data.height + 'px' : 'auto',
                        marginLeft:
                          data.inLeftColumn && data.width
                            ? `-${parseInt(data.width) + 10}px`
                            : '0',
                        marginRight: data.inLeftColumn ? '0!important' : '1rem',
                      }}
                      src={data.url.includes(settings.apiPath)
                        ? `${flattenToAppURL(data.url)}/@@images/image`
                        : data.url}
                      onClick={() => setZoomed(true)}
                      alt={data.alt || ''}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    ></img>
                  </div>
                  <div className="card__face card__face--back">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.metadata
                      }}
                    />
                  </div>
                </div>
              </div>

              <Transition visible={modalOpen} animation='scale' duration={300}>
                <Modal
                  style={{ width: 'unset' }}
                  open={modalOpen}
                  onClose={() => { setZoomed(false); setModalOpen(false); setHovered(false) }}
                >
                  <Modal.Content image>

                    {
                      isFlipped ?
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.metadata
                          }}
                        /> :
                        <img
                          className={cx({ 'full-width': data.align === 'full' })}
                          zoomed={zoomed}
                          style={{ maxHeight: '80vh', maxWidth: '100%' }}
                          src={data.url.includes(settings.apiPath)
                            ? `${flattenToAppURL(data.url)}/@@images/image`
                            : data.url}
                          onClick={() => setZoomed(true)}
                          alt={data.alt || ''}
                          onMouseLeave={() => setHovered(false)}
                        ></img>
                    }
                  </Modal.Content>
                </Modal>
              </Transition>
            </React.Fragment>
          );
          if (data.href) {
            if (
              (data.href.startsWith('http') || data.href.startsWith('https')) &&
              !data.href.includes(settings.apiPath)
            ) {
              return (
                <React.Fragment>

                  <a
                    target={data.openLinkInNewTab ? '_blank' : null}
                    href={data.href}
                  >
                    {image}
                  </a>
                  {trigger}
                </React.Fragment>

              );
            } else {
              return (
                <React.Fragment>
                  <Link
                    to={data.href.replace(settings.apiPath, '')}
                    target={data.openLinkInNewTab ? '_blank' : null}
                  >
                    {image}
                  </Link>
                  {trigger}
                </React.Fragment>
              );
            }
          } else {
            return (
              <React.Fragment>
                {image}
                {trigger}

              </React.Fragment>)
          }
        })()}
      </>
    )}
  </p>
  )
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;