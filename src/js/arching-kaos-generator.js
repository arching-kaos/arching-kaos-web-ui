// Arching Kaos Generator
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

export function makeElement(obj, attachTo)
{
    if (obj.element !== 'head' && obj.element !== 'body' && obj.element !== 'svg' && obj.element !== 'circle')
    {
        var temp = document.createElement(obj.element);
    }
    else if ( obj.element === 'svg' || obj.element === 'circle' )
    {
        var temp = document.createElementNS("http://www.w3.org/2000/svg", obj.element);
    }
    else if ( obj.id !== null && document.querySelector('#'+obj.id) )
    {
        var temp = document.querySelector('#'+obj.id);
    }
    else
    {
        var temp = document.querySelector(obj.element);
    }
    if ( obj.id !== undefined ) temp.id = obj.id;
    if ( obj.name !== undefined ) temp.name = obj.name;
    if ( obj.type !== undefined ) temp.type = obj.type;
    if ( obj.content !== undefined ) temp.content = obj.content;
    if ( obj.property !== undefined ) temp.property = obj.property;
    if ( obj.className !== undefined && obj.element !== 'svg') temp.className = obj.className;
    if ( obj.rel !== undefined ) temp.rel = obj.rel;
    if ( obj.href !== undefined ) temp.href = obj.href;
    if ( obj.style !== undefined ) temp.style = obj.style;
    if ( obj.src !== undefined ) temp.src = obj.src;
    if ( obj.as !== undefined ) temp.as = obj.as;
    if ( obj.target !== undefined ) temp.target = obj.target;
    if ( obj.onclick !== undefined ) temp.setAttribute("onclick", obj.onclick);
    if ( obj.alt !== undefined ) temp.alt = obj.alt;
    if ( obj.charset !== undefined ) temp.charset = obj.charset;
    if ( obj.value !== undefined ) temp.value = obj.value;
    if ( obj.controls !== undefined ) temp.controls = obj.controls;
    if ( obj.hidden !== undefined ) temp.hidden = obj.hidden;
    if ( obj.placeholder !== undefined ) temp.placeholder = obj.placeholder;
    if ( obj.classes !== undefined ) temp.classList = obj.classes;
    if ( obj.innerText !== undefined ) temp.innerText = obj.innerText;
    if ( obj.viewBox !== undefined ) temp.setAttribute("viewBox", obj.viewBox);
    if ( obj.cx !== undefined ) temp.setAttribute("cx", obj.cx);
    if ( obj.cy !== undefined ) temp.setAttribute("cy", obj.cy);
    if ( obj.r !== undefined ) temp.setAttribute("r", obj.r);
    if ( obj.xmlns !== undefined ) temp.setAttribute("xmlns", obj.xmlns);
    if ( obj.fill !== undefined ) temp.setAttribute("fill", obj.fill);
    if ( obj.stroke !== undefined ) temp.setAttribute("stroke", obj.stroke);
    if ( obj.strokeWidth !== undefined ) temp.setAttribute("stroke-width", obj.strokeWidth);
    if ( obj.version !== undefined ) temp.setAttribute("version", obj.version);
    if ( obj.width !== undefined ) temp.setAttribute("width", obj.width);
    if ( obj.height !== undefined ) temp.setAttribute("height", obj.height);
    if ( obj.innerHTML !== undefined && Array.isArray(obj.innerHTML) )
    {
        obj.innerHTML.forEach((value)=>{makeElement(value, temp)});
    }
    else if ( obj.innerHTML !== undefined && typeof(obj.innerHTML) === "string" )
    {
        temp.innerHTML = obj.innerHTML;
    }
    attachTo.appendChild(temp);
}

export function makeUpSite(tree, root){
    if ( tree !== undefined && Array.isArray(tree) )
    {
        for (var i = 0; i < tree.length; i++)
        {
            makeElement(tree[i], root)
        }
    }
}


// @license-end
