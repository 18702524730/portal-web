import Vue from 'vue'
import {
  Button,
  Icon,
  Breadcrumb,
  Row,
  Col,
  Tabs,
  Input,
  Divider,
  Menu,
  Spin,
  Carousel,
  List,
  Card,
  Tooltip,
  ConfigProvider,
  BackTop,
  Modal,
  Avatar,
  Badge,
  Form,
  notification,
  message,
  Table,
  Layout,
  Radio,
  Tag,
  Select,
  DatePicker,
  TimePicker,
  TreeSelect,
  Steps,
  Result,
  Checkbox,
  Alert,
  FormModel,
  Upload,
  Cascader,
  InputNumber,
  Switch,
  Rate,
  Statistic,
  Descriptions,
  Progress,
  AutoComplete
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(Input)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(Spin)
Vue.use(Carousel)
Vue.use(List)
Vue.use(Card)
Vue.use(Tooltip)
Vue.use(ConfigProvider)
Vue.use(BackTop)
Vue.use(Modal)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Form)
Vue.use(Table)
Vue.use(Layout)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(TreeSelect)
Vue.use(Steps)
Vue.use(Result)
Vue.use(Checkbox)
Vue.use(Alert)
Vue.use(FormModel)
Vue.use(Upload)
Vue.use(Cascader)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Statistic)
Vue.use(Descriptions)
Vue.use(Progress)
Vue.use(AutoComplete)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1564062_ohzm1tqkfia.js' // 在 iconfont.cn 上生成
})

Vue.component('my-icon', MyIcon)