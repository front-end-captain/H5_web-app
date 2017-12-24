/**
 * @description: 折线图组件
 * @param {String} name 组件名称
 * @param {Object} config 配置参数
 */
var ComponentPolyline = function ( name, cfg ) {
    var component = new PublicComponent( name, cfg );

    // 绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布（网格线背景）
    var canvasBg = document.createElement( "canvas" );
    var contextBg = canvasBg.getContext( "2d" );
    canvasBg.width  = contextBg.width  = w;
    canvasBg.height = contextBg.height = h;
    component.append( canvasBg );

    // 水平网格线  100 份 -> 10份
    var step = 10;
    contextBg.beginPath();
    contextBg.lineWidth = 1;
    contextBg.strokeStyle = "#AAAAAA";

    window.contextBg = contextBg;

    for ( var i = 0; i < step + 1; i ++ ) {
        var y = ( h / step ) * i;
        contextBg.moveTo( 0, y );
        contextBg.lineTo( w, y )
    }

    // 垂直网格线（根据项目的个数进行划分）
    step = cfg.data.length + 1;

    var text_w = w / step >> 0;

    for ( var i = 0; i < step + 1; i ++ ) {
        var x = ( w / step ) * i;
        contextBg.moveTo( x, 0 );
        contextBg.lineTo( x, h );

        if ( cfg.data[i] ) {
            var text = $( '<div class="text">' );
            text.text( cfg.data[i][0] );
            text
                .css( 'width', text_w / 2 )
                .css( 'left', ( x / 2 - text_w / 4 ) + text_w / 2 );

            component.append( text );
        }
    }
    // 背景层绘制完毕
    contextBg.stroke();

    // 绘制数据层
    // 加入画布 - 数据层
    var canvasData = document.createElement( 'canvas' );
    var contextData = canvasData.getContext( '2d' );
    canvasData.width  = contextData.width = w;
    canvasData.height = contextData.height = h;
    component.append( canvasData );

    /**
     * @description: 绘制折现以及对应的数据和阴影
     * @param {Number} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
     */
    var draw = function ( per ) {

        //  清空画布
        contextData.clearRect( 0, 0, w, h );

        //  绘制折线数据
        contextData.beginPath();
        contextData.lineWidth = 3;
        contextData.strokeStyle = "#ff8878";

        var x = 0;
        var y = 0;

        var row_w = ( w / ( cfg.data.length + 1 ) );
        //  画点
        for ( i in cfg.data ) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - ( item[1] * h * per );
            contextData.moveTo( x, y );
            contextData.arc( x, y, 5, 0, 2 * Math.PI);
        }
        //  连线  移动画笔到第一个数据的点位置
        contextData.moveTo(row_w, h - (cfg.data[0][1] * h * per));
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);
            contextData.lineTo( x, y );
        }
        contextData.stroke();

        contextData.lineWidth = 1;
        contextData.strokeStyle = "rgba( 255, 255, 255, 0 )";

        //  绘制阴影
        contextData.lineTo( x, h );
        contextData.lineTo( row_w, h );
        contextData.fillStyle = "rgba( 255, 136, 120, 0.2 )";
        contextData.fill();

        //  写数据
        for ( i in cfg.data ) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);

            contextData.fillStyle = item[2]
                ? item[2]
                : '#595959';

            contextData.fillText((( item[1] * 100 ) >> 0 ) + '%', x - 10, y - 10 );
        }
        contextData.stroke();
    }

    component.on( "afterLoad", function () {
        //  折现图生长动画
        var s = 0;
        for ( i = 0; i < 100; i ++ ) {
            setTimeout( function () {
                s += .01;
                draw( s );
            }, i * 10 + 500);
        }
    });
    component.on( 'onLeave', function () {
        //  折现图退场动画
        var s = 1;
        for ( i = 0; i < 100; i++ ) {
            setTimeout(function () {
                s -= .01;
                draw( s );
            }, i * 10);
        }
    });

    return component;
}