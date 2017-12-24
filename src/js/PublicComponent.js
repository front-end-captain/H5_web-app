
/**
 * @description: 公用基础组件
 * @param {String} name 组件名称
 * @param {Object} config 配置参数
 */
var PublicComponent = function ( name, config ) {

    // 组件配置参数
    var config = config || {};

    // 组件 id
    var id = "app_component_" + Math.random().toString().replace( ".", "_" );

    // 组件名称类名 例如 app_component_customName 
    var className = "app_component_" + name;

    // 组件类型类名 例如 app_component_base 
    var classType = config.type && "app_component_" + config.type;

    // 组件 DOM 结构
    var component = $( "<div id='"+ id +"' class='app_component " + className + " "+ classType +"'></div>" )

    // 组件内容
    config.text && component.text( config.text );

    // 组件宽高
    config.width  && component.width( config.width / 2 );
    config.height && component.height( config.height / 2 );

    // 组件 css 样式
    config.css && component.css( config.css );

    // 组件背景图片
    config.bg && component.css( {
        backgroundImage: "url( "+ config.bg +" )",
        backgroundSize: "cover"
    });

    // 组件是否居中
    if ( config.center ) {
        component.css( {
            left: "50%",
            marginLeft: - config.width / 4
        })
    }

    if ( typeof config.onclick === 'function' ) {
        component.on( 'click', config.onclick );
    }

    // 组件进场动画
    component.on( "afterLoad", function () {
        setTimeout( function () {
            component.addClass( classType + "_afterLoad" ).removeClass( classType + "_leave" );
            config.in && component.animate( config.in );
        }, config.delay || 0 );

        // 阻止事件冒泡 防止出现事件死循环
        return false;
    })

    // 组件出场动画
    component.on( "onLeave", function () {
        setTimeout( function () {
            component.addClass( classType + "_leave" ).removeClass( classType + "_afterLoad" );
            config.out && component.animate( config.out );
        }, config.delay || 0 )

        // 阻止事件冒泡 防止出现事件死循环
        return false;
    })

    return component;
}