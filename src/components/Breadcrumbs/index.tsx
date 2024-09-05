import React from "react";
import { Link } from "react-router-dom";

function Breadcrumbs({ url }: any) {
  // Split the URL by '/'
  const parts = url.split("/").filter(Boolean);

  // Generate breadcrumbs based on URL parts
  const breadcrumbs = parts.map((part: any, index: number) => {
    let path: any;
    if (parts[0] === "driver-management") {
      path = `/${parts.slice(0, index + 2).join("/")}`;
    }
    console.log(path);
    return (
      <li key={part}>
        <Link to={path}>{part}</Link>
      </li>
    );
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        {breadcrumbs}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
