class Generator {

    constructor (options = {}) {
        this._raw = ''
        this._blockLevel = 0
        this._linebreak = '\n'
        this._defaults = {
            indentation: '    ' // 4 spaces
        }
        this._options = Object.assign(this._defaults, options)
    }

    getOutput ( compress = false ) {
        this.closeBlocks()
        return this._raw
    }

    addRule (selectors, declarationList) {
        const declarations = []
        const selectorIndentation = this._options['indentation'].repeat(this._blockLevel)
        const declarationIndentation = this._options['indentation'].repeat(this._blockLevel + 1)
        const linebreak = this._linebreak

        if (!Array.isArray(selectors)) {
            selectors = [selectors]
        }

        selectors.map(function (value, key) {
            selectors[key] = selectorIndentation + value.trim()
        })

        Object.keys(declarationList).map(function (key) {
            const value = declarationList[key] || '';
            declarations.push(declarationIndentation + key.toString().trim() + ': ' + value.toString().trim() + ';' + linebreak)
        })

        this._raw += selectors.join(',' + linebreak) + ' {'
        this._raw += linebreak + declarations.join('')
        this._raw += selectorIndentation + '}' + linebreak
    }
    
    addRaw (text) {
        this._raw += text
    }
    
    /**
     * usage:
     *   css.addComment('inline comment');
     *   css.addComment(['block', 'comment']);
    */
    addComment (text) {
        const indentation = this._options['indentation'].repeat(this._blockLevel)
        const css = this
        if (!Array.isArray(text)) {
            text = [text]
        }
        
        css._raw += '/**' + this._linebreak
        text.map(function (value) {
            css._raw += ' * ' + value + this._linebreak
        })
        css._raw += ' */' + this._linebreak
    }

    openBlock (type, props = '') {
        const blockIndentation = this._options['indentation'].repeat(this._blockLevel)
        this._raw += blockIndentation + '@' + type + ' ' + props.trim() + ' {' + this._linebreak
        this._blockLevel++
    }

    closeBlock () {
        if (this._blockLevel > 0) {
            this._blockLevel--
            const blockIndentation = this._options['indentation'].repeat(this._blockLevel)
            this._raw += blockIndentation + '}' + this._linebreak
        }
    }

    closeBlocks () {
        while(this._blockLevel > 0) {
            this.closeBlock()
        }
    }
}

exports.create = function (options) {
    return new Generator(options)
}
