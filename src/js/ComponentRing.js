/* 环图组件对象 */

/**
 * @description: 环状图组件
 * @param {String} name 组件名称
 * @param {Object} cfg 配置参数
 */
var ComponentRing =function ( name, cfg ) {
    cfg.type = 'pie';

    // 环图应该只有一个数据
    if ( cfg.data.length > 1 ) {   
        cfg.data = [cfg.data[0]];
    }
    var component = new ComponentPie( name ,cfg );
  
    var mask = $( '<div class="mask">' );
    component.addClass( 'app_component_ring' );
  
    component.append( mask );
  
    var text = component.find( '.text' );
  
    text.attr( 'style', '' );

    if ( cfg.data[0][2] ) {
        text.css( 'color', cfg.data[0][2] );
    }
    mask.append( text );
  
    return component;
};