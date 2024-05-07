import React, { useState } from "react";
import "./style.css";
function InfiniteScroll() {
  const [count, setCount] = useState(10);

  React.useEffect(() => {
    const handleScroll = (e) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setCount(count + count);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count]);

  const elements = [];
  for (let index = 0; index < count; index++) {
    elements.push(
      <div id="card" key={index}>
        {index + 1}
      </div>
    );
  }

  return <div className="main">{elements}</div>;
}

export default InfiniteScroll;
