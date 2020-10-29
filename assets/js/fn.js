let d = document;
let toTopCont = d.querySelector('.back-to-top');
toTopCont.querySelector('.back-to-top-txt').addEventListener('click', (e) => {
    __top();
});
window.addEventListener('scroll', () => {
    if(window.pageYOffset  > d.documentElement.clientHeight){
        toTopCont.classList.add('show');
    }
    else{
        toTopCont.classList.remove('show');
    }
});
window.addEventListener('load', () => {
    addTogglerEvent();
    doSectionLinks();
})
function showLoader(){
    d.querySelector('.loader-container').classList.remove('hide');
}
function hideLoader(){
    d.querySelector('.loader-container').classList.add('hide');
}
function __top(){
    window.scroll({top : 0, behavior : 'smooth'});
}
function doTypingEffect(descIdx, textIdx, isNegated){
    const descriptions = [
        'an intuitive modern light weight Javascript library for building small scale single page applications',
        'an intuitive modern light weight Javascript library for building small scale SPA\'s',
        'developed to be fast',
        'framework agnostic',
    ];
    const interval = 150;
    const pause = 5000;
    descIdx = descIdx || 0;
    textIdx = textIdx || 0;
    isNegated = isNegated || false;
    let title = '';
    window.typingEffect = setInterval(() => {
        let currentText = descriptions[descIdx];
        let descLen = descriptions.length;
        let currentTextArr = currentText.split('');
        let currentTextLen = currentText.length;
        if(textIdx == currentTextLen || isNegated){
            isNegated = true;
            title = currentText.slice(0, textIdx);
            if(textIdx == 0){
                isNegated = false;
                descIdx++;
            } else if(textIdx == currentTextLen){
                clearInterval(typingEffect);
                window.typingSetOut = setTimeout(() => {
                    doTypingEffect(descIdx, textIdx, isNegated)
                }, pause);
            }
            router.render({}, title, '.page-desc');
            textIdx--;
        } else if(!isNegated){
            clearTimeout(window.typingSetOut);
            textIdx = textIdx < 0 ? 0 : textIdx;
            title+= currentTextArr[textIdx];
            router.render({}, title, '.page-desc');
            textIdx++;
        }
        descIdx = descIdx == descLen ? 0 : descIdx;
    }, interval);
}
function toSection(sectionId){
    let elem = d.querySelector('#' + sectionId);
    if(elem) elem.scrollIntoView();
}
function addTogglerEvent(){
    let toggler = d.querySelector('.toggler-block');
    toggler.addEventListener('click', () => {
        toggleNav();
    });
}
function toggleNav(){
    let navList = d.querySelector('.nav-item-cont');
    if(navList.classList.contains('nav-open')){
        navList.classList.remove('nav-open');
        return;
    }
    navList.classList.add('nav-open');
}
function doSectionLinks(){
    let sessionLinks = [... d.querySelectorAll('a.section-to')];
    sessionLinks.forEach((link) => {
        link.addEventListener('click', () => {
            toggleNav();
            if(link.dataset.to){
                routeTosection(link);
            } else {
                router.routeTo(link.getAttribute('href'));
            }
        });
    });
}
function routeTosection(link){
    let responseObject = router.currentResponseObject();
    let currentPath = responseObject.url.path;
    let scrollElement = link.dataset.to;
    if(currentPath !== '/docs'){
        router.routeTo('/docs', {scrollElement});
    } else {
        router.route({scrollElement});
    }
}