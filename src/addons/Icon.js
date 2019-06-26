import { camelCaseToString } from '../utils';

const icons = {
  arrowUp: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  arrowDown: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  arrowRight: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  arrowLeft: 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'
};

export default {
  name: 'HooperIcon',
  functional: true,
  inheritAttrs: true,
  props: {
    name: {
      type: String,
      required: true,
      validator: val => val in icons
    }
  },
  render(createElement, { props }) {
    const icon = icons[props.name];
    const children = [];

    children.push(createElement('title', camelCaseToString(props.name)));

    children.push(
      createElement('path', {
        attrs: {
          d: 'M0 0h24v24H0z',
          fill: 'none'
        }
      })
    );

    children.push(
      createElement('path', {
        attrs: {
          d: icon
        }
      })
    );

    return createElement(
      'svg',
      {
        attrs: {
          class: `icon icon-${props.name}`,
          viewBox: '0 0 24 24',
          width: '24px',
          height: '24px'
        }
      },
      children
    );
  }
};
