import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUserArticle } from "../../actions/article";
import { dateConvertor } from "../../utils/dateConvertor";

const MyArticleCard = ({ article }) => {
  const dispatch = useDispatch();

  return (
    <div className="card m-2" style={{ textAlign: "left" }}>
      <div className="card-header">
        {article.article_type.map((type, index) => (
          <span key={index} className="btn btn-dark mx-1">
            {type}
          </span>
        ))}
        <span style={{ float: "right" }}>
          {dateConvertor(new Date(article.date))}
        </span>
      </div>
      <div className="card-body">
        <div>
          <h4 className="card-title">{article.article_name}</h4>
          <h6>{article.username}</h6>
        </div>
        <hr className="my-4" />
        <p className="card-text">{article.article_text}</p>
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
            <i className="bi bi-hand-thumbs-up-fill m-1"></i>
            {article.likes.length}
          </span>
          <span className="m-2">
            <i className="bi bi-hand-thumbs-down-fill m-1"></i>
            {article.unlikes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyArticleCard;
