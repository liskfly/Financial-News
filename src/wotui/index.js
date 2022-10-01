
import { Button, Popup,Swipe, SwipeItem } from 'wot-design'

const UI = [Button, Popup,Swipe, SwipeItem]

const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {
    UI.forEach(t => {
        Vue.use(t)
    })
}

export default WotUIPlugin
