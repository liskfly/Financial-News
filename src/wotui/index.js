
<<<<<<< HEAD
import { Button, Popup,Swipe, SwipeItem,InfiniteLoad ,Lazyload } from 'wot-design'

const UI = [Button, Popup,Swipe, SwipeItem,InfiniteLoad,Lazyload ]
=======
import { Button, Popup, Swipe, SwipeItem, InfiniteLoad, Navbar, Icon, CellGroup, Cell, Switch } from 'wot-design'

const UI = [Button, Popup, Swipe, SwipeItem, InfiniteLoad, Navbar, Icon, CellGroup, Cell, Switch]
>>>>>>> userPage

const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {
    UI.forEach(t => {
        Vue.use(t)
    })
}

export default WotUIPlugin
