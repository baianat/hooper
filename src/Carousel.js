import { computed, ref, h, watch, onMounted, onBeforeUnmount, nextTick, provide } from 'vue';
import mitt from 'mitt';
import { getInRange, now, Timer, normalizeSlideIndex, cloneNode } from './utils';
import './styles/carousel.css';

let EMITTER = mitt();

export default {
  name: 'Hooper',

  props: {
    // count of items to showed per view
    itemsToShow: {
      default: 1,
      type: Number
    },
    // count of items to slide when use navigation buttons
    itemsToSlide: {
      default: 1,
      type: Number
    },
    // index number of initial slide
    initialSlide: {
      default: 0,
      type: Number
    },
    // control infinite scrolling mode
    infiniteScroll: {
      default: false,
      type: Boolean
    },
    // control center mode
    centerMode: {
      default: false,
      type: Boolean
    },
    // vertical sliding mode
    vertical: {
      default: false,
      type: Boolean
    },
    // enable rtl mode
    rtl: {
      default: null,
      type: Boolean
    },
    // enable auto sliding to carousel
    autoPlay: {
      default: false,
      type: Boolean
    },
    // speed of auto play to trigger slide
    playSpeed: {
      default: 2000,
      type: Number
    },
    // toggle mouse dragging
    mouseDrag: {
      default: true,
      type: Boolean
    },
    // toggle touch dragging
    touchDrag: {
      default: true,
      type: Boolean
    },
    // toggle mouse wheel sliding
    wheelControl: {
      default: true,
      type: Boolean
    },
    // toggle keyboard control
    keysControl: {
      default: true,
      type: Boolean
    },
    // enable any move to commit a slide
    shortDrag: {
      default: true,
      type: Boolean
    },
    // sliding transition time in ms
    transition: {
      default: 300,
      type: Number
    },
    // pause autoPlay on mousehover
    hoverPause: {
      default: true,
      type: Boolean
    },
    // remove empty space around slides
    trimWhiteSpace: {
      default: false,
      type: Boolean
    },
    // an object to pass all settings
    settings: {
      default() {
        return {};
      },
      type: Object
    },
    group: {
      type: String,
      default: null
    }
  },

  setup(props, context) {
    const isDragging = ref(false);
    const isSliding = ref(false);
    const isTouch = ref(false);
    const isHover = ref(false);
    const isFocus = ref(false);
    const initialized = ref(false);
    const slideWidth = ref(0);
    const slideHeight = ref(0);
    const slidesCount = ref(0);
    const trimStart = ref(0);
    const trimEnd = ref(1);
    const currentSlide = ref(null);
    const timer = ref(null);
    const defaults = ref({});
    const breakpoints = ref({});
    const delta = ref({ x: 0, y: 0 });
    const config = ref({});
    const containerHeight = ref(null);
    const containerWidth = ref(null);
    const lastScrollTime = ref(null);
    const startPosition = ref(null);
    const endPosition = ref(null);

    const hooperCarousel = ref(null);
    const list = ref(null);
    const track = ref(null);

    const slideBounds = computed(() => {
      // Because the "isActive" depends on the slides shown, not the number of slidable ones.
      // but upper and lower bounds for Next,Prev depend on whatever is smaller.
      const siblings = config.value.itemsToShow;
      const lower = config.value.centerMode ? Math.ceil(currentSlide.value - siblings / 2) : currentSlide.value;
      const upper = config.value.centerMode
        ? Math.floor(currentSlide.value + siblings / 2)
        : Math.floor(currentSlide.value + siblings - 1);

      return {
        lower,
        upper
      };
    });
    const trackTransform = computed(() => {
      const { infiniteScroll, vertical, rtl, centerMode } = config.value;

      const direction = rtl ? -1 : 1;
      const slideLength = vertical ? slideHeight.value : slideWidth.value;
      const containerLength = vertical ? containerHeight.value : containerWidth.value;
      const dragDelta = vertical ? delta.value.y : delta.value.x;
      const clonesSpace = infiniteScroll ? slideLength * slidesCount.value : 0;
      const centeringSpace = centerMode ? (containerLength - slideLength) / 2 : 0;

      // calculate track translate
      const translate = dragDelta + direction * (centeringSpace - clonesSpace - currentSlide.value * slideLength);

      if (vertical) {
        return `transform: translate(0, ${translate}px);`;
      }

      return `transform: translate(${translate}px, 0);`;
    });
    const trackTransition = computed(() => {
      if (initialized.value && isSliding.value) {
        return `transition: ${config.value.transition}ms`;
      }

      return '';
    });

    // controlling methods
    const slideTo = (slideIndex, isSource = true) => {
      if (isSliding.value || slideIndex === currentSlide.value) {
        return;
      }

      const { infiniteScroll, transition } = config.value;
      const previousSlide = currentSlide.value;
      const index = infiniteScroll
        ? slideIndex
        : getInRange(slideIndex, trimStart.value, slidesCount.value - trimEnd.value);

      context.emit('beforeSlide', {
        currentSlide: currentSlide.value,
        slideTo: index
      });

      // Notify others if in a group and is the slide event initiator.
      if (props.group && isSource) {
        EMITTER.emit(`slideGroup:${props.group}`, slideIndex);
      }

      currentSlide.value = index;
      isSliding.value = true;

      window.setTimeout(() => {
        isSliding.value = false;
        currentSlide.value = normalizeSlideIndex(index, slidesCount.value);
      }, transition);

      context.emit('slide', {
        currentSlide: currentSlide.value,
        slideFrom: previousSlide
      });
    };
    const slideNext = () => {
      slideTo(currentSlide.value + config.value.itemsToSlide);
    };
    const slidePrev = () => {
      slideTo(currentSlide.value - config.value.itemsToSlide);
    };
    const initEvents = () => {
      // get the element direction if not explicitly set
      if (defaults.value.rtl === null) {
        defaults.value.rtl = getComputedStyle(hooperCarousel.value).direction === 'rtl';
      }

      if (props.autoPlay) {
        initAutoPlay();
      }
      if (config.value.mouseDrag) {
        list.value.addEventListener('mousedown', onDragStart);
      }
      if (config.value.touchDrag) {
        list.value.addEventListener('touchstart', onDragStart, {
          passive: true
        });
      }
      if (config.value.keysControl) {
        hooperCarousel.value.addEventListener('keydown', onKeypress);
      }
      if (config.value.wheelControl) {
        lastScrollTime.value = now();
        hooperCarousel.value.addEventListener('wheel', onWheel, { passive: false });
      }
      window.addEventListener('resize', update);
    };
    const getCurrentSlideTimeout = () => {
      const curIdx = normalizeSlideIndex(currentSlide.value, slidesCount.value);
      const children = context.slots.default();
      return children[curIdx]?.props?.duration ?? props.playSpeed;
    }; // switched to using a timeout which defaults to the prop set on this component, but can be overridden on a per slide basis
    const initAutoPlay = () => {
      timer.value = new Timer(() => {
        if (
          isSliding.value ||
          isDragging.value ||
          (isHover.value && props.hoverPause) ||
          isFocus.value ||
          !props.autoPlay
        ) {
          timer.value.set(getCurrentSlideTimeout());
          return;
        }
        if (currentSlide.value === slidesCount.value - 1 && !config.value.infiniteScroll) {
          slideTo(0);
          timer.value.set(getCurrentSlideTimeout());
          return;
        }
        slideNext();
        timer.value.set(getCurrentSlideTimeout());
      }, getCurrentSlideTimeout());
    };
    const initDefaults = () => {
      breakpoints.value = props.settings.breakpoints;
      defaults.value = Object.assign({}, props, props.settings);
      config.value = Object.assign({}, defaults.value);
    };
    // updating methods
    const update = () => {
      if (breakpoints.value) {
        updateConfig();
      }
      updateWidth();
      updateTrim();
      context.emit('updated', {
        containerWidth,
        containerHeight,
        slideWidth,
        slideHeight,
        settings: config
      });
    };
    const updateTrim = () => {
      const { trimWhiteSpace, itemsToShow, centerMode, infiniteScroll } = config.value;
      if (!trimWhiteSpace || infiniteScroll) {
        trimStart.value = 0;
        trimEnd.value = 1;
        return;
      }
      trimStart.value = centerMode ? Math.floor((itemsToShow - 1) / 2) : 0;
      trimEnd.value = centerMode ? Math.ceil(itemsToShow / 2) : itemsToShow;
    };
    const updateWidth = () => {
      const rect = hooperCarousel.value.getBoundingClientRect();
      containerWidth.value = rect.width;
      containerHeight.value = rect.height;
      if (config.value.vertical) {
        slideHeight.value = containerHeight.value / config.value.itemsToShow;
        return;
      }
      slideWidth.value = containerWidth.value / config.value.itemsToShow;
    };
    const updateConfig = () => {
      const breakpointsConfig = Object.keys(breakpoints.value).sort((a, b) => b - a);
      let matched;
      breakpointsConfig.some(breakpoint => {
        matched = window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
        if (matched) {
          config.value = Object.assign({}, config.value, defaults.value, breakpoints.value[breakpoint]);
          return true;
        }
      });
      if (!matched) {
        config.value = Object.assign(config.value, defaults.value);
      }
    };
    const restartTimer = () => {
      nextTick(() => {
        if (timer.value === null && props.autoPlay) {
          initAutoPlay();
          return;
        }

        if (timer.value) {
          timer.value.stop();
          if (props.autoPlay) {
            timer.value.set(getCurrentSlideTimeout());
            timer.value.start();
          }
        }
      });
    };
    const restart = () => {
      nextTick(() => {
        update();
      });
    };
    // events handlers
    const onDragStart = event => {
      isTouch.value = event.type === 'touchstart';
      if (!isTouch.value && event.button !== 0) {
        return;
      }

      startPosition.value = { x: 0, y: 0 };
      endPosition.value = { x: 0, y: 0 };
      isDragging.value = true;
      startPosition.value.x = isTouch.value ? event.touches[0].clientX : event.clientX;
      startPosition.value.y = isTouch.value ? event.touches[0].clientY : event.clientY;

      document.addEventListener(isTouch.value ? 'touchmove' : 'mousemove', onDrag);
      document.addEventListener(isTouch.value ? 'touchend' : 'mouseup', onDragEnd);
    };
    const isInvalidDirection = (deltaX, deltaY) => {
      if (!config.value.vertical) {
        return Math.abs(deltaX) <= Math.abs(deltaY);
      }

      if (config.value.vertical) {
        return Math.abs(deltaY) <= Math.abs(deltaX);
      }

      return false;
    };
    const onDrag = event => {
      if (isSliding.value) {
        return;
      }

      endPosition.value.x = isTouch.value ? event.touches[0].clientX : event.clientX;
      endPosition.value.y = isTouch.value ? event.touches[0].clientY : event.clientY;
      const deltaX = endPosition.value.x - startPosition.value.x;
      const deltaY = endPosition.value.y - startPosition.value.y;
      // Maybe scrolling.
      if (isInvalidDirection(deltaX, deltaY)) {
        return;
      }

      delta.value.y = deltaY;
      delta.value.x = deltaX;

      if (!isTouch.value) {
        event.preventDefault();
      }
    };
    const onDragEnd = () => {
      const tolerance = config.value.shortDrag ? 0.5 : 0.15;
      isDragging.value = false;

      if (config.value.vertical) {
        const draggedSlides = Math.round(Math.abs(delta.value.y / slideHeight.value) + tolerance);
        slideTo(currentSlide.value - Math.sign(delta.value.y) * draggedSlides);
      }
      if (!config.value.vertical) {
        const direction = (config.value.rtl ? -1 : 1) * Math.sign(delta.value.x);
        const draggedSlides = Math.round(Math.abs(delta.value.x / slideWidth.value) + tolerance);
        slideTo(currentSlide.value - direction * draggedSlides);
      }
      delta.value.x = 0;
      delta.value.y = 0;
      document.removeEventListener(isTouch.value ? 'touchmove' : 'mousemove', onDrag);
      document.removeEventListener(isTouch.value ? 'touchend' : 'mouseup', onDragEnd);
      restartTimer();
    };
    const onTransitionend = () => {
      isSliding.value = false;
      context.emit('afterSlide', {
        currentSlide: currentSlide.value
      });
    };
    const onKeypress = event => {
      const key = event.key;
      if (key.startsWith('Arrow')) {
        event.preventDefault();
      }
      if (config.value.vertical) {
        if (key === 'ArrowUp') {
          slidePrev();
        }
        if (key === 'ArrowDown') {
          slideNext();
        }
        return;
      }
      if (config.value.rtl) {
        if (key === 'ArrowRight') {
          slidePrev();
        }
        if (key === 'ArrowLeft') {
          slideNext();
        }
        return;
      }
      if (key === 'ArrowRight') {
        slideNext();
      }
      if (key === 'ArrowLeft') {
        slidePrev();
      }
    };
    const onWheel = event => {
      event.preventDefault();
      if (now() - lastScrollTime.value < 200) {
        return;
      }
      // get wheel direction
      lastScrollTime.value = now();
      const value = event.wheelDelta || -event.deltaY;
      const delta = Math.sign(value);
      if (delta === -1) {
        slideNext();
      }
      if (delta === 1) {
        slidePrev();
      }
    };
    const _groupSlideHandler = slideIndex => {
      // set the isSource to false to prevent infinite emitting loop.
      slideTo(slideIndex, false);
    };
    const addGroupListeners = () => {
      if (!props.group) {
        return;
      }
      EMITTER.on(`slideGroup:${props.group}`, _groupSlideHandler);
    };

    watch(
      () => props.group,
      (val, oldVal) => {
        if (val === oldVal) {
          return;
        }
        EMITTER.off(`slideGroup:${oldVal}`, _groupSlideHandler);
        addGroupListeners();
      }
    );
    watch(
      () => props.autoPlay,
      (val, oldVal) => {
        if (val === oldVal) {
          return;
        }
        restartTimer();
      }
    );

    initDefaults();

    onMounted(() => {
      nextTick(() => {
        initEvents();
        addGroupListeners();
        update();
        slideTo(config.value.initialSlide || 0);
        setTimeout(() => {
          context.emit('loaded');
          initialized.value = true;
        }, props.transition);
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', update);
      if (props.group) {
        EMITTER.off(`slideGroup:${props.group}`, _groupSlideHandler);
      }

      if (timer.value) {
        timer.value.stop();
      }
    });

    provide('$hooper', {
      config,
      slidesCount,
      slideHeight,
      slideWidth,
      slideBounds,
      trimStart,
      trimEnd,
      currentSlide,
      slideNext,
      slidePrev,
      restartTimer
    });

    context.expose({
      slideTo,
      slideNext,
      slidePrev,
      restart
    });

    /**
     * Renders additional slides for infinite slides mode.
     * By cloning Slides VNodes before and after either edges.
     */
    const renderBufferSlides = slides => {
      const before = [];
      const after = [];
      // reduce prop access
      const slidesCount = slides.length;
      for (let i = 0; i < slidesCount; i++) {
        const slide = slides[i];
        const clonedBefore = cloneNode(h, slide);
        let slideIndex = i - slidesCount;

        clonedBefore.type.props.index = slideIndex;
        clonedBefore.type.key = `before_${i}`;
        clonedBefore.key = clonedBefore.type.key;

        before.push(clonedBefore);

        const clonedAfter = cloneNode(h, slide);
        slideIndex = i + slidesCount;

        clonedAfter.type.props.index = slideIndex;
        clonedAfter.type.key = `after_${i}`;
        clonedAfter.key = clonedAfter.type.key;

        after.push(clonedAfter);
      }

      return [...before, ...slides, ...after];
    };

    const renderSlides = children => {
      const childrenCount = children.length;
      let idx = 0;
      let slides = [];
      for (let i = 0; i < childrenCount; i++) {
        const child = children[i];

        if (!child || child?.type?.name !== 'HooperSlide') {
          continue;
        }

        // give slide an index behind the scenes
        child.type.props.index = idx;
        child.type.key = idx;
        child.key = idx;

        slides.push(child);
      }

      // update hooper's information of the slide count.
      slidesCount.value = slides.length;
      if (config.value.infiniteScroll) {
        slides = renderBufferSlides(slides);
      }

      // When no slides are found try to find them in the child (<slides v-for=... use case)
      if (slides.length === 0 && children[0]?.children) {
        slides = renderSlides(children[0].children);
      }

      return slides;
    };

    const renderAddons = slots => {
      return slots['hooper-addons'] ? slots['hooper-addons']() : [];
    };

    return () =>
      h(
        'section',
        {
          ref: hooperCarousel,
          class: {
            hooper: true,
            'is-vertical': config.value.vertical,
            'is-rtl': config.value.rtl
          },
          tabindex: '0',
          onFocusin: () => (isFocus.value = true),
          onFocusout: () => (isFocus.value = false),
          onMouseover: () => (isHover.value = true),
          onMouseleave: () => (isHover.value = false)
        },
        [
          h(
            'div',
            {
              class: 'hooper-list',
              ref: list
            },
            [
              h(
                'ul',
                {
                  class: {
                    'hooper-track': true,
                    'is-dragging': isDragging.value
                  },
                  style: trackTransform.value + trackTransition.value,
                  ref: track,
                  onTransitionend: onTransitionend
                },
                renderSlides(context.slots.default())
              ),
              h(
                'div',
                {
                  class: 'hooper-liveregion hooper-sr-only',
                  'aria-live': 'polite',
                  'aria-atomic': 'true'
                },
                `Item ${currentSlide.value + 1} of ${slidesCount.value}`
              ),
              renderAddons(context.slots)
            ]
          )
        ]
      );
  }
};
