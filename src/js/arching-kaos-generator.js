/* Arching Kaos Generator
 *
 * Kaotisk Hund - 2024
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
 *
 */
function makeElement(obj, attachTo)
{
    if (obj.element !== 'head' && obj.element !== 'body' )
    {
        var temp = document.createElement(obj.element);
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
    if ( obj.className !== undefined ) temp.className = obj.className;
    if ( obj.rel !== undefined ) temp.rel = obj.rel;
    if ( obj.href !== undefined ) temp.href = obj.href;
    if ( obj.src !== undefined ) temp.src = obj.src;
    if ( obj.as !== undefined ) temp.as = obj.as;
    if ( obj.target !== undefined ) temp.target = obj.target;
    if ( obj.alt !== undefined ) temp.alt = obj.alt;
    if ( obj.charset !== undefined ) temp.charset = obj.charset;
    if ( obj.value !== undefined ) temp.value = obj.value;
    if ( obj.controls !== undefined ) temp.controls = obj.controls;
    if ( obj.hidden !== undefined ) temp.hidden = obj.hidden;
    if ( obj.placeholder !== undefined ) temp.placeholder = obj.placeholder;
    if ( obj.classes !== undefined ) temp.classList = obj.classes;
    if ( obj.innerText !== undefined ) temp.innerText = obj.innerText;
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

function makeUpSite(tree, root){
    if ( tree !== undefined && Array.isArray(tree) )
    {
        for (var i = 0; i < tree.length; i++)
        {
            makeElement(tree[i], root)
        }
    }
}


// @license-end
