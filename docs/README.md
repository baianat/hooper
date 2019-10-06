---
home: true
heroImage: hooper.svg
actionText: Getting Started →
actionLink: /getting-started
features:
- title: 🧁 Simple
  details: Easily customizable thorough rich API and addons.
- title: ♿ Accessible
  details: Robust structure and Touch, Keyboard, Mouse Wheel, and Navigation support.
- title: ⬅ RTL
  details: Auto detect direction, Fully true RTL layout support.
- title: ↕ Vertical
  details: Supports vertical sliding, to cover all your use cases.
- title: 📱 Responsive
  details: Responsive breakpoints, to apply custom configurations for each screen size.
- title: 🖖 Vue.js
  details: Optimized to work with Vue framework, not a wrapper for another library.
footer: MIT Licensed | Copyright © 2018-present Baianat
description: A customizable accessible carousel slider optimized for Vue
meta:
  - name: og:title
    content: Hooper
  - name: og:description
    content: A customizable accessible carousel slider optimized for Vue
---

## Quick Start

### Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install hooper

# or use yarn
yarn add hooper
```

### Use Hooper

```vue
<template>
  <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    ...
  </hooper>
<template>

<script>
  import { Hooper, Slide } from 'hooper';

  export default {
    name: 'App',
    components: {
      Hooper,
      Slide
    }
  }
</script>
```