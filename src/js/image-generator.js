// Image generator from SHA512SUM to 256px*256px canvas
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

export function generateImage(hash, what)
{
    var pixels = [];

    var yi = 0;
    var xi = 0;
    for ( var y = 0; y < 256; ++y ){
        pixels[y] = [];
        for ( var x = 0; x < 256; ++x )
        {
            pixels[y][x] = '#000';
        }
    }
    var z = 1;
    for ( var y = 0; y < 256; ++y )
    {
        yi = y - 128;
        for ( var x = 0; x < 256; ++x )
        {
            var pixel;
            xi = x - 128;
            z=Math.abs(Math.floor((yi*yi+xi*xi)/3));
            //z=Math.abs(Math.floor((xi*yi)/1));
            var r1 = hash[z] === undefined ?'0':hash[z];
            var r2 = hash[z+1] === undefined ?'0':hash[z+1];
            var g1 = hash[z+2] === undefined ?'0':hash[z+2];
            var g2 = hash[z+3] === undefined ?'0':hash[z+3];
            var b1 = hash[z+4] === undefined ?'0':hash[z+4];
            var b2 = hash[z+5] === undefined ?'0':hash[z+5];
            var t1 = hash[z+6] === undefined ?'0':hash[z+6];
            var t2 = hash[z+7] === undefined ?'0':hash[z+7];
            if (t2 === undefined)
            {
                pixel = "#000";
            }
            else
            {
                pixel = `#${r1}${r2}${g1}${g2}${b1}${b2}`;
                //pixel = `#${r1}${r2}${g1}${g2}${b1}${b2}${t1}${t2}`;
                //pixel = `#${r1}${r1}${r1}${r1}${r1}${r1}${r1}${r1}`;
                //pixel = `#${r1}${r1}${r1}${r1}${r1}${r1}`;
                //pixel = `#${r1}${g1}${b1}`;
            }
            if ( 0 >= xi && 0 >= yi )
            {
            //    //z=Math.abs(Math.floor((yi*xi)/4));
            //    //if ( z > 120 ) z = z-120;
            //    //pixel = `#${hash[z-113]}${hash[z-114]}${hash[z-115]}${hash[z-116]}${hash[z-117]}${hash[z-118]}${hash[z-119]}${hash[z-120]}`;
            //    pixel = `#${hash[z]}${hash[z+1]}${hash[z+2]}${hash[z+3]}${hash[z+4]}${hash[z+5]}${hash[z+6]}${hash[z+7]}`;
            //    //pixel = '#2a2'
            }
            else if ( 0 <= xi && 0 >= yi )
            {
            //pixel = `#${hash[z]}${hash[z+1]}${hash[z+2]}${hash[z+3]}${hash[z+4]}${hash[z+5]}`; //${hash[z+6]}${hash[z+7]}`;
            //    //z=Math.abs(Math.floor((yi*xi)/128));
            //    pixel = `#${hash[z]}${hash[z+1]}${hash[z+2]}${hash[z+3]}${hash[z+4]}${hash[z+5]}${hash[z+6]}${hash[z+7]}`;
            //    // pixel = '#000';
            //    //pixel = '#22a';
            }
            else if ( 0 >= xi && 0 <= yi )
            {
            //pixel = `#${hash[z]}${hash[z+1]}${hash[z+2]}${hash[z+3]}${hash[z+4]}${hash[z+5]}`; //${hash[z+6]}${hash[z+7]}`;
            //    z=Math.abs(Math.floor((yi*xi)/128));
            //    // pixel = '#000';
            //    pixel = '#a22';
            }
            else if ( 0 <= xi && 0 <= yi )
            {
            //pixel = `#${hash[z]}${hash[z+1]}${hash[z+2]}${hash[z+3]}${hash[z+4]}${hash[z+5]}`; //${hash[z+6]}${hash[z+7]}`;
            //    z=Math.abs(Math.floor((yi*xi)/128));
            //    pixel = '#000';
            }
            pixels[y][x] = pixel;
        }
    }
    createImage( pixels, hash, what );
}

function createImage(pixels, hash, what)
{
    //debugLog(pixels);
    var canvas = document.createElement('canvas');
    //canvas.width = pixels[0].length;
    //canvas.height = pixels.length;
    var output_x_y = 256;

    canvas.width = output_x_y;
    canvas.height = output_x_y;
    var context = canvas.getContext('2d');
    var zoom_factor = 6;
    var zoom_size = Math.floor(output_x_y/zoom_factor);
    var radius = Math.floor(output_x_y/zoom_size);
    // debugLog(`Radius: ${radius}`);
    for ( var y = 0; y < zoom_size; ++y )
    {
        for ( var x = 0; x < zoom_size; ++x )
        {
            var fy = (canvas.height-zoom_size)/2;
            var fx = (canvas.width-zoom_size)/2;
            var ax = Math.floor(x+fx+1);
            var ay = Math.floor(y+fy+1);
            //debugLog(`${ax} + ${ay}`);
            var pixel_to_be_enhanced = pixels[ay][ax];
            var c = 0;
            var r = 0;
            for (var i = 0; i < radius; ++i)
            {
                for (var k = 0; k < radius; ++k)
                {
                    var subpixel = pixel_to_be_enhanced;
                    if ( i >= radius - Math.floor(radius/3) )
                    {
                        if ( k >= radius - Math.floor(radius/3) )
                        {
                            //     debugLog(i);
                            c = (x*radius)+k;
                            r = (y*radius)+i;
                            context.fillStyle = subpixel;
                            context.fillRect(c, r, radius/3, radius/3);
                            context.stroke();
                        }
                    }
                    //debugLog(`${x} -> ${c}, ${y} -> ${r}`);
                }
            }
        }
    }
    if ( what !== 'new' )
    {
        document.querySelector('.generated').src = canvas.toDataURL('image/png');
    }
    else
    {
        document.querySelector(`#i-${hash}`).src = canvas.toDataURL('image/png');
        document.querySelector(`#i-${hash}`).width = 128;
    }
}

// @license-end
