import React, { useState,useEffect } from "react";
import PostDataService from "../services/userservices";
import Post from "./Post/Post";
import Suggestions from "./Suggestions";
import "./Timeline.css";
import AddPost from "./AddPost";

function Timeline() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getPostHashs();
  }, []);

  const getPostHashs = async () => {
    const data = await PostDataService.getAllPost();
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline__posts">
          {console.log(data)}
          {data.map((post) => (
            <Post
              key={post.id}
              user={post.name}
              hash={post.hash}
              likes={22}
              comment={post.Comment}
            />
          ))}
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions />
        <AddPost />
      </div>
    </div>
  );
}

export default Timeline;
