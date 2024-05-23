interface MenuItem {
  slug: string;
  name: string;
  icon?: string;
  active?: boolean;
}

interface MenuCategory {
  name?: string;
  items: Array<MenuItem>;
}

export { MenuCategory, MenuItem };
export default MenuCategory;
