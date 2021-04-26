import React from "react";
import { Link } from "react-router-dom";
import { dateConvertor } from "../../utils/dateConvertor";

const Card = ({ article }) => {
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
        <p className="card-text">
          {`${article.article_text.substr(0, 400)}...`}
          <Link to={`/article/${article._id}`}>Read More</Link>
        </p>
        <Link to={`/article/${article._id}`} className="btn btn-primary">
          Read
        </Link>
        <div style={{ float: "right" }}>
          <span className="m-2">
            <strong>{`Likes `}</strong>
            {article.likes.length}
          </span>
          <span className="m-2">
            <strong>{`Dislikes `}</strong>
            {article.unlikes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
