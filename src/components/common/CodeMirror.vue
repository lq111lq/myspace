<template>
  <textarea></textarea>
</template>

<script>
import CodeMirror from 'codemirror'
export default {
  name: 'CodeMirror',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  watch: {
    code () {
      this.$editor.setValue(this.code)
    }
  },
  mounted () {
    var editor = CodeMirror.fromTextArea(this.$el, {
      lineNumbers: false,
      styleActiveLine: true,
      matchBrackets: true,
      readOnly: true,
      theme: 'darcula',
      mode: 'javascript'
    })
    this.$editor = editor
    editor.setValue(this.code)
  }
}
</script>

<style>
</style>
