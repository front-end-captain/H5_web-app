/**
 * 
 * @param {Array} images 
 * @param {String} firstPage 
 */
var Loading = function ( images, firstPage ) {

    var id = this.id;

    // 第一次加载
    if ( this._images === undefined ) {

        this._images = ( images || [] ).length;
        this._loaded = 0;

        // 把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调
        window[id] = this;

        for ( s in images ) {
            var item = images[s];
            var img = new Image;
            img.onload = function () {
                window[id].loader();
            }
            img.src = item;
        }

        $('#rate').text( '0%' );
        return this;
    } else {
        this._loaded ++;
        $('#rate').text(((this._loaded / this._images * 100) >> 0) + '%');

        if (this._loaded < this._images) {
            return this;
        }
    }

    window[id] = null;

    this.wrapper.fullpage({
        onLeave: function (index, nextIndex, direction) {
            $( this )
                .find('.app_component' )
                .trigger( 'onLeave' );
        },
        afterLoad: function ( anchorLink, index ) {
            $( this )
                .find('.app_component')
                .trigger( 'afterLoad' );
        }
    });

    this.pages[0].find( '.app_component' ).trigger( 'afterLoad' );

    this.wrapper.show();

    if ( firstPage ) {
        $.fn.fullpage.moveTo( firstPage );
    }
}