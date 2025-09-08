// Membentuk menu tree dari flat array r_controller

export function menuTree(controllers) {
  const tree = [];
  const lookup = new Map();

  controllers.forEach((item) => {
    lookup.set(item.id, { ...item, children: [] });
  });

  controllers.forEach((item) => {
    const node = lookup.get(item.id);
    if (item.parent && lookup.has(item.parent)) {
      lookup.get(item.parent).children.push(node);
    } else {
      tree.push(node);
    }
  });

  // Sort recursive
  const sortTree = (nodes) => {
    nodes.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
    nodes.forEach((n) => sortTree(n.children));
  };

  console.log(tree,'menu tree');
  sortTree(tree);
  return tree;
}

// Mapping builder (sesuai target)
export function buildMenuFromMapping(data, mapping) {
  const menuList = [];

  Object.entries(mapping).forEach(([menuName, config]) => {
    const menuItem = {
      id: `menu_${menuName.replace(/\s+/g, '_').toLowerCase()}`,
      title: menuName,
      controller: config.controller,
      icon: null,
      children: []
    };

    const matchedMenu = data.find(
      (c) => c.controller === config.controller && c.icon !== 'NULL'
    );
    if (matchedMenu) {
      menuItem.icon = matchedMenu.icon;
      menuItem.sort = matchedMenu.sort;
    }

    if (config.submenus) {
      menuItem.children = config.submenus.map((sub) => {
        const matchedSub = data.find(
          (c) =>
            (sub.method && c.method === sub.method) ||
            (sub.controller && c.controller === sub.controller)
        );
        return {
          id: `${menuName.replace(/\s+/g, '_').toLowerCase()}_${sub.name.replace(/\s+/g, '_').toLowerCase()}`,
          title: sub.name,
          controller: sub.controller || matchedSub?.controller || null,
          method: sub.method || matchedSub?.method || null,
          missing: !matchedSub
        };
      });
    }

    menuList.push(menuItem);
  });

  console.log(menuList,'mapped menu');  
  return menuList;
}
