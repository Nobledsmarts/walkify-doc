const routes = {
    '/' : {
        name : 'index',
        matched(resObj){
            document.title = "walkifyjs";
            let data = {
                title : '&lt;/Walkifyjs&gt;',
                description : "an intuitive modern light weight javascript library for building small scale single page applications",
            };
            fetch('views/index.html')
            .then((res) => {
                return res.text();
            }).then((template) => {
                hideLoader();
                this.view(data, template);
            }).catch((e) => {
                let data = {
                    message : "something went wrong"
                }
                router.redirectTo('!', data);
            });
        },
        mounted(){
            doTypingEffect();
        },
        exist(){
            clearTimeout(window.typingSetOut);
            clearInterval(window.typingEffect);
            showLoader();
        }
    },

    '/docs' : {
       async matched(resObj){
            document.title = "walkifyjs - documentation";
            let response = await fetch('views/docs.html');
            if(!response.ok){
                let data = {
                    message : response.statusText
                }
                router.redirectTo('!', data);
            } else {
                let template = await response.text().then(e => e);
                hideLoader();
                let data = {
                    responseObject : JSON.stringify(resObj, '', '\t')
                }
                this.view(data, template);
            }
        },
        mounted(){
            prettyPrint();
            let res = router.currentResponseObject();
            let scrollElement = res.state.scrollElement;
            scrollElement && toSection(scrollElement);
        },
        exist(){
            showLoader();
        }
    },

    '!' : {
        name : '404',
        matched(res){
            document.title = "walkifyjs - 404";
            hideLoader();
            let data = {
                message : 'page not found'
            };
           this.view(data);
        },
        exist(){
            showLoader();
        }
    }
}