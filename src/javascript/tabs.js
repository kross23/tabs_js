class Tabs{
    constructor(selector, options){
        let defaultOptions = {
            isChanged: () => {
            }
        }
        this.options = Object.assign(defaultOptions, options);
        this.selector = selector;
        this.tabs = document.querySelector(`.${selector}`); //data-tabs="tab1"
        if(this.tabs){
           this.tabList = this.tabs.querySelector('.tabs__nav');
           this.tabsBtns = this.tabList.querySelectorAll('.tabs__nav-btn');
           this.tabsPanel = this.tabs.querySelectorAll('.tabs__panel');
        }else{
            console.log('селектор не сущетвует');
            return;
        }
        this.check();
        this.init();
        this.events();
    }
    init (){
        this.tabList.setAttribute('role', 'tablist');
        this.tabsBtns.forEach((it, i) => {
            it.setAttribute('role', 'tab');
            it.setAttribute('tabindex', '-1');
            it.setAttribute('id',`${this.selector}${i+1}`);
            it.classList.remove('tabs__nav-btn--active'); 
        });

        this.tabsPanel.forEach((item, i) => {
            item.setAttribute('role', 'tabpanel');
            item.setAttribute('tabindex', '-1');
            item.setAttribute('aria-labelledby', this.tabsBtns[i].id);
            item.classList.remove('tabs__panel--active');
        });

        this.tabsBtns[0].classList.add('tabs__nav-btn--active');
        this.tabsBtns[0].removeAttribute('tabindex');
        this.tabsBtns[0].setAttribute('aria-selected',true);
        this.tabsBtns[0].focus();

        this.tabsPanel[0].classList.add('tabs__panel--active');
        this.tabsPanel[0].removeAttribute('tabindex');
    };
    check(){
        console.log('chek');
    }
    events(){
        this.tabsBtns.forEach((el, i) => {
            el.addEventListener('click',(e) => {
                let currentTab = this.tabList.querySelector('[aria-selected]');
                if(e.target.id !== currentTab.id){
                    this.switchTabs( currentTab , e.target)
                }
            });
            el.addEventListener('keydown', (e) => {
                let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
                let dir = null;  //39право 37лево 40вниз 38наверх
                if( e.which === 37){ // left
                    dir = index - 1;
                }else if (e.which === 39){ // rigth
                    dir = index + 1;
                }
                else if(e.which === 40){
                    dir = 'down';
                }
                else if(e.which === 38){
                    dir = 'up';
                }
               
                if(dir !== null){
                    if(dir === 'down'){
                        this.tabsPanel[i].focus();
                    }else if(dir === 0){
                        this.tabsBtns[i-1].focus();
                    }else if(dir === 'up'){
                        this.tabsBtns[i].focus();
                    }else if(this.tabsBtns[dir]){
                        this.tabsBtns[dir].focus();
                    }
                }
            });
        });
    };

    switchTabs(oldTab, newTab){
        newTab.focus();
        newTab.removeAttribute('tabindex');
        newTab.setAttribute('aria-selected', true);
        newTab.classList.add('tabs__nav-btn--active');

        oldTab.setAttribute('tabindex', '-1');
        oldTab.removeAttribute('aria-selected');
        oldTab.classList.remove('tabs__nav-btn--active');

        let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
        let oldIndex =  Array.prototype.indexOf.call(this.tabsBtns, oldTab);
        
        this.tabsPanel[oldIndex].classList.remove('tabs__panel--active');
        this.tabsPanel[index].classList.add('tabs__panel--active');

        this.options.isChanged(this)
    }   
}
