
/**
 * @description: 水平柱状图组件
 * @param {String} name 
 * @param {Object} config 
 */
var ComponentBar = function ( name, cfg ) {
    var component = new PublicComponent( name, cfg );

    $.each( cfg.data, function( index, item ){
        
        var line = $( '<div class="line">' );
        var name = $( '<div class="name">' );
        var rate = $( '<div class="rate">' );
        var per  = $( '<div class="per">' );

        var width = item[1] * 100 + '%';

        var bgStyle = '';
        if( item[2] ){
            bgStyle = 'style="background-color:'+ item[2] +'"';
        }

        rate.html( '<div class="bg" '+ bgStyle +'></div>' );

        rate.css( 'width', width );

        name.text( item[0] );

        per.text( width );

        line.append( name ).append( rate ).append( per );

        component.append( line );
    });

    return component;
};