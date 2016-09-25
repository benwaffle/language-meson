'use strict'

var CompositeDisposable = require('atom').CompositeDisposable

module.exports = {
    activate() {
        this.subscriptions = new CompositeDisposable()
        this.subscriptions.add(atom.workspace.observeTextEditors(this.setGrammar))
    },

    deactivate() {
        this.subscriptions.destroy()
    },

    setGrammar(editor) {
        const python = atom.grammars.grammarForScopeName('source.python')

        if (editor.getTitle() === 'meson.build')
            editor.setGrammar(python)

        editor.onDidChangeTitle(() => {
            if (editor.getTitle() === 'meson.build')
                editor.setGrammar(python)
        })
    }
}
