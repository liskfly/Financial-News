
import { Button, Popup,Swipe, SwipeItem,InfiniteLoad } from 'wot-design'

const UI = [Button, Popup,Swipe, SwipeItem,InfiniteLoad]

const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {
    UI.forEach(t => {
        Vue.use(t)
    })
}

export default WotUIPlugin
