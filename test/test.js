const cssGen = require('..');
const assert = require('assert');

const options = {
    indentation: '  ' // 2 spaces
}
const css = cssGen.create(options);

css.addRaw('/* my comment */\n')

css.addRule('.color-white', {
    color: 'white'
})

css.openBlock('media', 'screen and (min-width: 30em)')

css.addRule([ 'body', 'html' ], {
    color: 'gray'
})

css.closeBlock()

css.openBlock('supports', '(display: grid)')

css.addRule('.grid', {
    display: 'grid'
})

css.openBlock('media', 'screen and (max-width: 30em)')

css.addRule('.grid-sm', {
    display: 'grid'
})

const rawOutput = `/* my comment */
.color-white {
  color: white;
}
@media screen and (min-width: 30em) {
  body,
  html {
    color: gray;
  }
}
@supports (display: grid) {
  .grid {
    display: grid;
  }
  @media screen and (max-width: 30em) {
    .grid-sm {
      display: grid;
    }
  }
}
`

assert.equal(css.getOutput(), rawOutput)
css.clean()
assert.equal(css.getOutput(), '')
