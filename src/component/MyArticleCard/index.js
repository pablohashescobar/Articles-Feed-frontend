import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUserArticle } from "../../actions/article";
import { dateConvertor } from "../../utils/dateConvertor";
import SpaceImg from "../../images/sports.jpg";

const MyArticleCard = ({ article }) => {
  const dispatch = useDispatch();

  const removeHTMLTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <div className="d-flex align-items-center my-4 p-4 text-left subtle-shadow">
      <div className="article-left" style={{ width: "69%" }}>
        <div>
          <h4 className="card-title mb-1">{article.article_name}</h4>
          <p className="light-text">Written by - {article.username}</p>
          <div className="">
            {article.article_type.map((type, index) => (
              <span key={index} className="btn btn-sm btn-light mx-1">
                {type}
              </span>
            ))}
            <span style={{ float: "right" }}>
              {dateConvertor(new Date(article.date))}
            </span>
          </div>
        </div>
        <hr className="my-4" />
        <p className="card-text">
          {`${removeHTMLTags(article.article_text).substr(0, 200)}...`}
        </p>
        <Link to={`/edit/${article._id}`} className="btn btn-primary">
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-danger ml-2"
          onClick={() => dispatch(deleteUserArticle(article._id))}
        >
          Delete
        </button>
        <div style={{ float: "right" }}>
          <span className="m-2">
            <i className="bi bi-arrow-up m-1"></i>
            {article.likes.length}
          </span>
          <span className="m-2">
            <i className="bi bi-arrow-down m-1"></i>
            {article.unlikes.length}
          </span>
        </div>
      </div>
      <div className="article-right ml-auto" style={{ width: "30%" }}>
        <img src={SpaceImg} alt="" width="100%" />
      </div>
    </div>
  );
};

export default MyArticleCard;
