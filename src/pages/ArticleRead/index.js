import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  getArticleById,
  addLike,
  removeLike,
  blockArticle,
} from "../../actions/article";

import { followUser } from "../../actions/user";

import Loading from "../../component/Loading";

const ArticleRead = ({ match, history }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.article.loading);
  const article = useSelector((state) => state.article.article);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getArticleById(match.params.id));
    console.log("Article:", article);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3 className="display-4 m-2">Article</h3>
      {loading || article == null ? (
        <Loading />
      ) : (
        <div className="container-md">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h4 className="card-title">{article.article_name}</h4>
              <p>Written by - {article.username}</p>
              {article.article_type.map((type, index) => (
                <button type="button" className="btn btn-info m-2" key={index}>
                  {type}
                </button>
              ))}
              <p
                className="card-text"
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: article.article_text }}
              ></p>
              <span
                className="card-link"
                onClick={() => dispatch(addLike(article._id))}
              >
                <i className="bi bi-hand-thumbs-up-fill m-1"></i>
                {article.likes && article.likes.length}
              </span>
              <span
                className="card-link"
                onClick={() => dispatch(removeLike(article._id))}
              >
                <i className="bi bi-hand-thumbs-down-fill m-1"></i>
                {article.unlikes && article.unlikes.length}
              </span>
              {user._id !== article.user && (
                <Fragment>
                  <button
                    type="button"
                    className="btn btn-danger ml-3"
                    onClick={() => dispatch(blockArticle(article._id, history))}
                  >
                    Block
                  </button>
                  <p className="mt-sm-3">
                    Author - {article.username}
                    {user.following.some(
                      (iterator) => iterator.user === article.user
                    ) ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary ml-3"
                        onClick={() => dispatch(followUser(article.user))}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-primary ml-3"
                        onClick={() => dispatch(followUser(article.user))}
                      >
                        Follow
                      </button>
                    )}
                  </p>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      )}

      <Link to="/dashboard">
        <button type="button" className="btn btn-primary m-4">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default ArticleRead;
