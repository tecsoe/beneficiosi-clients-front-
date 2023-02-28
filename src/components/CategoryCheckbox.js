import { useState } from "react";
import Checkbox from "./Checkbox";

const shouldRenderChildren = (checked, children) => {
  return checked && children;
};

const CategoryCheckbox = ({label, children}) => {
  const [checked, setChecked] = useState(false);

  return <li>
    <Checkbox
      label={label}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
    {shouldRenderChildren(checked, children) && children.map((child, i) => <ul className="pl-5 space-y-1" key={i}>
      <CategoryCheckbox
        label={child.name}
        children={child.children}
      />
    </ul>)}
  </li>;
};

export default CategoryCheckbox;