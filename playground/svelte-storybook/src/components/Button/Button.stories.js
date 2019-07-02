import { storiesOf } from '@storybook/svelte'
import { action } from '@storybook/addon-actions'

import Button from './Button.stories.svelte'

storiesOf('Button', module)
  .add('with text', () => ({
    Component: Button,
    props: { text: 'Hello Button' },
    on: { click: action('clicked') }
  }))
  .add('with some emoji', () => ({
    Component: Button,
    props: {
      text: '😀 😎 👍 💯'
    },
    on: { click: action('clicked') }
  }))
