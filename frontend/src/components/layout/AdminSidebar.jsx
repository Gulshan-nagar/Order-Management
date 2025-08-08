import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Package, ShoppingCart, Store } from "lucide-react";

const AdminSidebar = () => {
  const links = [
    { 
      title: "Dashboard", 
      path: "/admin/dashboard", 
      icon: LayoutDashboard,
      color: "text-primary" 
    },
    { 
      title: "Manage Users", 
      path: "/admin/users", 
      icon: Users,
      color: "text-secondary" 
    },
    { 
      title: "Manage Products", 
      path: "/admin/products", 
      icon: Package,
      color: "text-success" 
    },
    { 
      title: "Manage Orders", 
      path: "/admin/orders", 
      icon: ShoppingCart,
      color: "text-warning" 
    },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen p-6 shadow-lg hidden md:block sticky top-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
          <Store className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-amazon" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <link.icon className={`h-5 w-5 transition-colors ${
              ({ isActive }) => isActive ? "text-primary-foreground" : link.color
            }`} />
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              {link.title}
            </span>
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <h3 className="text-sm font-semibold text-foreground mb-2">Quick Stats</h3>
        <div className="text-xs text-muted-foreground">
          Industry-level admin panel for complete store management
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;