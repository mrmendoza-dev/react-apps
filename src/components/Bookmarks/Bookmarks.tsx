import React, { useState, useEffect, useRef } from "react";
import "./Bookmarks.css";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<any>([
    { name: "Google", url: "https://www.google.com" },
    { name: "Facebook", url: "https://www.facebook.com" },
    { name: "Twitter", url: "https://www.twitter.com" },
    { name: "YouTube", url: "https://www.youtube.com" },
    { name: "LinkedIn", url: "https://www.linkedin.com" },
    { name: "Instagram", url: "https://www.instagram.com" },
    { name: "GitHub", url: "https://www.github.com" },
    { name: "Amazon", url: "https://www.amazon.com" },
    { name: "Netflix", url: "https://www.netflix.com" },
    { name: "Wikipedia", url: "https://www.wikipedia.org" },
  ]);
  const [newBookmark, setNewBookmark] = useState("");

  const handleNewBookmarkChange = (event: any) => {
    setNewBookmark(event.target.value);
  };

  const handleNewBookmarkSubmit = (event: any) => {
    event.preventDefault();
    fetch(newBookmark)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc: any = parser.parseFromString(html, "text/html");
        const title = doc.head.querySelector("title").textContent;
        setBookmarks([...bookmarks, { name: title, url: newBookmark }]);
        setNewBookmark("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Bookmarks">
      {bookmarks.map((bookmark: any, index: any) => (
        <a
          href={bookmark.url}
          target="_blank"
          key={index}
          title={bookmark.name}
        >
          <img
            src={`${bookmark.url}/favicon.ico`}
            alt={`${bookmark.name} favicon`}
            className="favicon-img"
          />
        </a>
      ))}
      <form onSubmit={handleNewBookmarkSubmit}>
        <input
          type="text"
          value={newBookmark}
          onChange={handleNewBookmarkChange}
        />
        <button type="submit">Add Bookmark</button>
      </form>
    </div>
  );
}

export default Bookmarks;
