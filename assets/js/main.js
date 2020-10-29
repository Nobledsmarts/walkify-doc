const router = new Walkify(routes);
// router.setOptions({
//     historyMode : true
// })
router.mount('.app');

if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('../sw.js')
    .catch(e => console.log(e));
    });
}