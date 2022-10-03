
import { Button, Popup,Swipe, SwipeItem,InfiniteLoad ,Lazyload } from 'wot-design'

const UI = [Button, Popup,Swipe, SwipeItem,InfiniteLoad,Lazyload ]

const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {
    UI.forEach(t => {
        Vue.use(t)
    })
}

export default WotUIPlugin
