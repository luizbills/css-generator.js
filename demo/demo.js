const CSSGenerator = require('../src/generator');
const options = {
	indentation: '  '
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