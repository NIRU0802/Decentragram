import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import React from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Post({ user, hash,comment, likes }) {
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          
          <Avatar style={{ marginRight: "10px" }}>
          {user?.charAt(0).toUpperCase()}
          </Avatar>
          {user} • <span>{" 2 min ago"}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="post__image">
        <small>ImageHash : {hash}</small><br/><br/>
        <img src={`https://scarlet-striped-snake-763.mypinata.cloud/ipfs/`+hash} alt="Post Image" />
      </div>
      <div className="post__footer">
      <div>{comment}</div><br/>
        <div className="post__footerIcons">
          <div className="post__iconsMain">
            <FavoriteBorderIcon className="postIcon" />
            <ChatBubbleOutlineIcon className="postIcon" />
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        Liked by {likes} people.
      </div>
    </div>
  );
}

export default Post;

