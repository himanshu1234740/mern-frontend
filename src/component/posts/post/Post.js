import React, { useEffect, useState } from "react";
import "./style.css";
import likeimg from "../../../images/like-icon.png";
import commentimg from "../../../images/comment.png";
import { useDispatch } from "react-redux";
import { data, like, comment, fetchComment } from "../../../actions/Posts";
import { useSelector } from "react-redux";
import profile from "../../../images/profile.png";
import redlike from "../../../images/redlike.png";
import { useNavigate, Link } from "react-router-dom";
import smile from "../../../images/smile.png";
import Comment from "./Comment";


export default function Post(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(data());
  }, []);
  const user = useSelector((user) => user.User);

  let username = "";
  let name = "";
  let path = "";

  for (let i = 0; i < user.length; i++) {
    if (props.post.user === user[i]._id) {
      username = username + user[i].username;
      name = name + user[i].name;
      if (user[i].profile === undefined) {
        path = "";
      } else {
        path = path + user[i].profile;
        console.log(user[i].profile);
      }
    }
  }

  const userid = JSON.parse(localStorage.getItem("userinfo"))._id;
  const id = props.post._id;
  let likeArray = props.post.likeCount;
  let count = 0;
  for (let i = 0; i < likeArray.length; i++) {
    if (likeArray[i] === userid) {
      count++;
    }
  }
  const handleLike = () => {
    dispatch(like({ id, userid }));
  };

  const handleaccount = () => {
    for (let i = 0; i < user.length; i++) {
      if (props.post.user === user[i]._id) {
        localStorage.setItem("id", user[i]._id);
        navigate("/profile");
      }
    }
  };
  //post comment
  const [postcomment, setPostComment] = useState({
    comments: "",
    id: userid,
  });
  const handleComment = () => {
    if (postcomment.comments !== "") {
      dispatch(comment(postcomment, props.post._id));
    }
  };

  const postComments = (e) => {
    setPostComment({ ...postcomment, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setModal({
      display: "block",
    });
    dispatch(fetchComment(props.post._id));
  };
  const [modal, setModal] = useState({
    display: "none",
  });
  const closeModal = () => {
    setModal({
      display: "none",
    });
  };
  const handlePostId = () => {
    localStorage.setItem("postId", props.post._id);
  };
  //comment handler

  const userCommentData = useSelector(
    (userCommentData) => userCommentData.comment
  );

  return (
    <>
      <div id="myModal" className="modal" style={{ display: modal.display }}>
        {/* <!-- Modal content --> */}
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="sideflex">
            <div className="modal-img">
              <img
                src={props.post.selectedFiles}
                alt="..."
                className="modalImg"
              /> 
            </div>
            <div className="leftData">
              <div className="topdata">
                {path!==""?<img
                  className="profile"
                  onClick={handleaccount}
                  src={path}
                  height="47px"
                  width="46px"
                  alt=""
                />:<img
                className="profile"
                onClick={handleaccount}
                src={profile}
                height="47px"
                width="46px"
                alt=""
              />}
                <h4 className="modalUsername">{username}</h4>
                <p className="modalname">{name}</p>
              </div>
              <div className="showComment">
                <Comment comment={userCommentData.comments} />
              </div>
              <div className="putComment">
                <img src={smile} className="emoji" alt="" />
                <input
                  className="inputComment"
                  type="text"
                  name="comments"
                  onChange={postComments}
                  placeholder="Write Comment Here"
                />
                <h4 className="postComment" onClick={handleComment}>
                  POST
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="postItem">
        <div className="topItem">
          <div>
            {path !== "" ? (
              <img
                className="profile"
                onClick={handleaccount}
                src={path}
                height="47px"
                width="46px"
                alt=""
              />
            ) : (
              <img
                className="profile"
                onClick={handleaccount}
                src={profile}
                height="47px"
                width="46px"
                alt=""
              />
            )}
          </div>
          <div>
            <h5 className="userName" onClick={handleaccount}>
              {username}
            </h5>
            <p className="userProfileName">{name}</p>
          </div>
        </div>
        <div className="mainItem">
          <img
            src={props.post.selectedFiles}
            height="450px"
            width="500px"
            alt="..."
            className="userImage"
          />
          <div className="likeComment">
            {count === 1 ? (
              <img
                src={redlike}
                height="35px"
                width="40px"
                className="like"
                onClick={handleLike}
                alt=""
              />
            ) : (
              <img
                src={likeimg}
                height="35px"
                width="40px"
                className="like"
                onClick={handleLike}
                alt=""
              />
            )}
            <br />
            <img
              src={commentimg}
              height="35px"
              width="45px"
              onClick={openModal}
              className="comment"
              alt=""
            />
          </div>
          <div className="likeComment">
            <p className="likeCount">like</p>
            <p className="likeCount" name="likeCount">
              {props.post.likeCount.length}
            </p>
            <p className="likeCount" style={{ marginLeft: "1rem" }}>
              Comment
            </p>
            <p className="likeCount" name="likeCount">
              {props.post.comments.length}
            </p>
            <Link className="more" to="/detail" onClick={handlePostId}>
              Detail
            </Link>
          </div>
          <div className="bottomSide">
            <h4 className="title">{props.post.title.slice(0, 30)}...</h4>
            <p className="desc">{props.post.description.slice(0, 30)}...</p>
          </div>
        </div>
      </div>
    </>
  );
}
