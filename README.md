# CSS Generator

Write css programatically using JavaScript.

## Install

```
npm install css-generator
```

## Usage

```js
const CSSGenerator = require('../src/generator');
const options = {
    indentation: '    ' // 4 spaces
}
const css = new CSSGenerator(options);

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

console.log(css.getOutput())
```

output:
```css
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

```

There is also a method `addRaw` that adds any string to your css. Useful to comments or include a framework.
```js
css.addRule('.color-white', { 'color': '#fff' })
css.addRaw('/* my comment */ a { text-decoration: none }')

console.log(css.getOutput())
```

output:
```css
.color-white{
	color:#fff;
}
/* my comment */ a { text-decoration: none }
```

## License
MIT License &copy; 2018 Luiz Bills
