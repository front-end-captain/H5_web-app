
/**
 * @description: 管理页面和组件 整个应用的容器
 */
var App = function () {
    this.id = "app_" + Math.random().toString().replace( ".", "_" );
    this.wrapper = $( "<div id="+ this.id +" class='app'></div>" );

    // 栈
    this.pages = [];
    this.init();
    this.loader = typeof Loading === "function" ? Loading : this.loader;
}
App.prototype.init = function () {
    $( document.body ).append( this.wrapper );
}

// 添加一页
App.prototype.addPage = function ( name, text ) {
    var page = $( "<div class='app_page section'></div>" );

    name ? page.addClass( "app_page_" + name ) : null;
    text ? page.text( text ) : null;

    this.wrapper.append( page );
    this.pages.push( page );

    if ( typeof this.whenAddPage === 'function' ){
        this.whenAddPage();
    }

    return this;
}

// 向页面中添加一个组件
App.prototype.addComponent = function ( name, config ) {
    var cfg = config || {};
    cfg = $.extend({
        type: "base"
    }, cfg );

    var component = null;

    // 取出最后一个 page 
    var currentPage = this.pages.slice( -1 )[0];
    switch( cfg.type ){
            case 'base' :
                component = new PublicComponent( name, cfg );
                break;

            case 'polyline' :
                component = new ComponentPolyline( name,cfg );
                break;

            case 'pie' :
                component = new ComponentPie( name, cfg );
                break;
            case 'bar' :
                component = new ComponentBar( name, cfg );
                break;
            case 'bar_v' :
                component = new ComponentBar_v( name, cfg );
                break;

            case 'radar' :
                component = new ComponentRadar( name, cfg );
                break;

            case 'pie' :
                component = new ComponentPie( name, cfg );
                break;
            case 'ring' :
                component = new ComponentRing( name, cfg );
                break;
           case 'point' :
                component = new ComponentPoint( name, cfg );
                break;
            default:
        }

    currentPage.append( component );
    return this;
}
// 初始化加载器
App.prototype.loader = function () {
    this.wrapper.fullpage({
        onLeave: function ( index, nextIndex, direction ) {
            $( this ).find( ".app_component" ).trigger( "onLeave" );
        },
        afterLoad: function ( anchorLink, index ) {
            $( this ).find( ".app_component" ).trigger( "afterLoad" );
        }
    });
    this.page[0].find( '.app_component').trigger( 'afterLoad' );
    this.el.show();
    if ( firstPage ) {
        $.fn.fullpage.moveTo( firstPage );
    }
};

