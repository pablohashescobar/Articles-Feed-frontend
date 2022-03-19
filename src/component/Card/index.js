import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import SpaceImg from "../../images/sports.jpg";

const Card = ({ article }) => {
  const removeHTMLTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <div className="d-flex align-items-center my-4 p-4 text-left subtle-shadow">
      <div className="article-left" style={{ width: "69%" }}>
        <div className="card-body">
          <div>
            <h4 className="card-title">{article.article_name}</h4>
            <h6>{article.username}</h6>
            <div>
              {article.article_type.map((type, index) => (
                <span key={index} className="btn btn-sm btn-light mx-1">
                  {type}
                </span>
              ))}
              <span style={{ float: "right" }}>
                {moment(article.publish_date).format("MMM Do YYYY")}
              </span>
            </div>
          </div>
          <hr className="my-4" />
          <p className="card-text">
            {`${removeHTMLTags(article.article_text).substr(0, 400)}...`}
            <Link to={`/article/${article._id}`}>Read More</Link>
          </p>
          <Link to={`/article/${article._id}`} className="btn btn-primary">
            Read
          </Link>
          <div style={{ float: "right" }}>
            <span className="m-2">
              <i className="bi bi-arrow-up m-1"></i>
              <b>{article.likes.length}</b>
            </span>
            <span className="m-2">
              <i className="bi bi-arrow-down m-1"></i>
              <b>{article.unlikes.length}</b>
            </span>
          </div>
        </div>
      </div>
      <div className="article-right ml-auto" style={{ width: "30%" }}>
        <img src={SpaceImg} alt="" width="100%" />
      </div>
    </div>
  );
};

export default Card;
