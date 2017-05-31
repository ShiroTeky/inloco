import React from 'react'
import Menu from './Menu'

const MenuItem = ({item, layers, onItemClick, onMouseOver, sidebarLeftWidth, sidebarLeftHeight, onMouseOut, onMenuItemClick, onLayerClick, parentMenuTitle, currentLevel, allMenuItems, isSubMenu}) => {

    // class name if menu item with children or single layer, with no children
    let menuItemClassName
    let visibleClass = ''
    let itemTitle = ''
    let otherIsSelected = false
    let otherIsNotMatched = false

    if(!isSubMenu){

        // if `item`, which means it is a submenu with children
        if(item){
            menuItemClassName = item.title ? 'menu-item-with-children' : 'menu-layer'
            menuItemClassName += item.selected ? ' selected' : ''

            // check if one menu is selected, and no other items are matched, hide others
            if (allMenuItems) {
                for (let otherMenuItem of allMenuItems) {
                    if (otherMenuItem.title && otherMenuItem.title !== item.title) {
                        if (otherMenuItem.selected) {
                            otherIsSelected = true
                        }
                        if (!otherMenuItem.match) {
                            otherIsNotMatched = true
                        }
                    }
                }
                if (otherIsSelected && !otherIsNotMatched) {
                    // we can only hide other items if not on search
                    visibleClass = 'hidden'
                }
            }

            // if menu with children, and it doesn't match search, hide it
            if (item.title) {
                itemTitle = item.title
                if (!item.match) {
                    visibleClass = 'hidden'
                }
            } else {
                // if it's a layer, check if it's match'ed.
                for (var i = 0 ; i < layers.length ; i++) {
                    var layer = layers[i]
                    if (layer.key === item) {
                        itemTitle = layer.title
                        if (!layer.match) {
                            visibleClass = 'hidden'
                        }
                    }
                }

                // check if layer is selected
                if (!item.title){
                    for (var i = 0 ; i < layers.length ; i++) {
                        var layer = layers[i]
                        if (layer.key === item && layer.selected) {
                            menuItemClassName += ' layer-selected';
                        }
                    }
                }
            }
            visibleClass += ' menu-item-container'
        }
    } else {
        // is subMenu
        itemTitle = item.title
        visibleClass = 'menu-item-container'
        menuItemClassName = 'menu-item-with-children'
    }

    return (
        <div className={visibleClass}>
            <li
                onMouseOut={() => onMouseOut(item.id ? undefined : layers[item])}
                onMouseOver={(event) => onMouseOver(event, item.id ? undefined : layers[item], sidebarLeftWidth, sidebarLeftHeight)}
                onClick={() => onItemClick(item.id ? item : layers[item])}
                className={menuItemClassName}
            >
                { itemTitle }
            </li>
            {
                (item && item.layers) ?
                <Menu
                    menuItems={item.layers}
                    menuSubMenu={item.subMenu}
                    menuTitle={item.title}
                    parentMenuTitle={parentMenuTitle}
                    key={item.idMenu}
                    selected={item.selected}
                    layers={layers}
                    onMenuItemClick={onMenuItemClick}
                    onLayerClick={onLayerClick}
                    onMouseOver={onMouseOver}
                    sidebarLeftWidth={sidebarLeftWidth}
                    sidebarLeftHeight={sidebarLeftHeight}
                    onMouseOut={onMouseOut}
                    currentLevel={currentLevel}
                />
                : ''
            }
        </div>
    );
}

export default MenuItem
