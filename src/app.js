import common from './components/common'
import util from './components/util'
import './assets/css/index.css'
import './assets/fonts/icofont.css'
import './assets/css/index.sass'
import './assets/css/index.less'
common()
util()
function count(...arg) {
  console.log(arg[0] + arg[1])
}
count(1, 2)
