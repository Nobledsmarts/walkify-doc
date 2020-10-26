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
        matched(resObj){
            document.title = "walkifyjs - documentation";
            fetch('views/docs.html')
            .then((res) => {
                if(res.status == 404){
                    throw new Error('couldnt fetch page');
                }
                return res.text();
            }).then((template) => {
                hideLoader();
                let data = {
                    responseObject : JSON.stringify(resObj, '', '\t')
                }
                this.view(data, template);
            }).catch((e) => {
                let data = {
                    message : e.message || "something went wrong",
                }
                router.redirectTo('!', data);
            });
        },
        mounted(){
            prettyPrint();
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