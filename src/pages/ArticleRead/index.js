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
      <div className="container">
        {loading || article == null ? (
          <Loading />
        ) : (
          <div className="container-md">
            <h3 className="display-4 my-2 text-left">{article.article_name}</h3>
            <div style={{ width: "100%" }}>
              <div className="text-left">
                {user._id !== article.user && (
                  <Fragment>
                    <div>
                      <p className="my-3 light-text">
                        Author - {article.username}
                      </p>
                      {user.following.some(
                        (iterator) => iterator.user === article.user
                      ) ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary mr-3"
                          onClick={() => dispatch(followUser(article.user))}
                        >
                          <i className="bi bi-person-dash-fill mr-1"></i>
                          Unfollow
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary mr-3"
                          onClick={() => dispatch(followUser(article.user))}
                        >
                          <i className="bi bi-person-plus-fill mr-1"></i>Follow
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger mr-3"
                        onClick={() =>
                          dispatch(blockArticle(article._id, history))
                        }
                      >
                        <i class="bi bi-eye-slash mr-1"></i>Block Article
                      </button>
                    </div>
                  </Fragment>
                )}

                {article.article_type.map((type, index) => (
                  <p className="my-2">
                    Tags:
                    <button
                      type="button"
                      className="btn btn-sm btn-light mr-1"
                      key={index}
                    >
                      {type}
                    </button>
                  </p>
                ))}
                <hr className="my-2" />
                <p
                  className="card-text"
                  style={{ textAlign: "justify" }}
                  dangerouslySetInnerHTML={{ __html: article.article_text }}
                ></p>
                <span
                  className="card-link"
                  onClick={() => dispatch(addLike(article._id))}
                >
                  <i className="bi bi-arrow-up m-1"></i>
                  {article.likes && article.likes.length}
                </span>
                <span
                  className="card-link"
                  onClick={() => dispatch(removeLike(article._id))}
                >
                  <i className="bi bi-arrow-down m-1"></i>
                  {article.unlikes && article.unlikes.length}
                </span>
              </div>
            </div>
          </div>
        )}

        <Link to="/dashboard">
          <button type="button" className="btn btn-primary m-4">
            <i className="bi bi-arrow-left mr-1"></i>Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleRead;
