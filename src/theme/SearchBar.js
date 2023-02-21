import React, { useEffect, useState } from "react";
import "./search.css";

const SearchBar = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    (function () {
      const cx = "21ffa45504a5f4a8c";
      const gcse = document.createElement("script");
      gcse.type = "text/javascript";
      gcse.async = true;
      gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(gcse, s);
    })();

    var renderSearchForms = function () {
      if (document.readyState === "complete") {
        window.google.search.cse.element.render({
          div: "googlesearch",
          tag: "search",
          gname: "gsearch",
        });
      } else {
        window.google.setOnLoadCallback(function () {
          window.google.search.cse.element.render({
            div: "googlesearch",
            tag: "search",
            gname: "gsearch",
          });
        }, true);
      }
    };

    window.__gcse = {
      parsetags: "explicit",
      callback: renderSearchForms,
    };
  }, []);

  // useEffect(() => {
  //   const input = document.getElementById("search");
  //   const submit = (e) => {
  //     if (e.keyCode === 13) {
  //       const element = window.google.search.cse.element.getElement("gsearch");

  //       element.execute(value);
  //     }
  //   };
  //   input.addEventListener("keyup", submit);

  //   return () => input.removeEventListener("keyup", submit);
  // }, [value]);

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  // const handleClick = () => {
  //   if (value.lenght > 0) {
  //     const element = window.google.search.cse.element.getElement("gsearch");

  //     element.execute(value);
  //   }
  // };

  return (
    <div id="search-container">
      {/* <input name="search" id="search" value={value} onChange={handleChange} /> */}

      <div id="googlesearch"></div>
    </div>
  );
};

export default SearchBar;