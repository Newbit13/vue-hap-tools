const genExportAst = require('./export')
const genVueOptions = require('./vue-options')
const { getStatementAst } = require('../../utils')

module.exports = function (codeParseRes) {
  let resAst = []
  const { importDecla, otherCode, exportResult } = codeParseRes
  const { createdHookAst, vueOptionsAst, methods } = exportResult

  const exportAst = genExportAst(methods, createdHookAst)
  const vueOptionsDecla = genVueOptions(vueOptionsAst)

  resAst = resAst.concat(importDecla, otherCode)
  resAst = resAst.concat(getStatementAst('let _qa_vue = null'))
  resAst.push(vueOptionsDecla)
  resAst.push(exportAst)

  return resAst
}
