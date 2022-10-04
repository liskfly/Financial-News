
import { Button, Popup, Swipe, SwipeItem, InfiniteLoad, Navbar, Icon, CellGroup, Cell, Switch } from 'wot-design'

const UI = [Button, Popup, Swipe, SwipeItem, InfiniteLoad, Navbar, Icon, CellGroup, Cell, Switch]

const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {
    UI.forEach(t => {
        Vue.use(t)
    })
}

export default WotUIPlugin
