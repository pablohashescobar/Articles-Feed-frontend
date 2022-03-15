import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserArticles } from "../../actions/article";

import MyArticleCard from "../../component/MyArticleCard";
import Loading from "../../component/Loading";

const MyArticles = () => {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.article.userArticles);
  const loading = useSelector((state) => state.article.loading);

  useEffect(() => {
    dispatch(getUserArticles());

    // eslint-disable-next-line
  }, []);

  const btnStyle = {
    textDecoration: "none",
  };

  return (
    <div>
      <h3 className="display-4 m-2">My Articles</h3>

      <div className="container-md mt-5">
        <Link to="/create" style={btnStyle}>
          <div className="d-flex m-2 justify-content-end">
            <button className="btn btn-light">
              Write an Article <i class="bi bi-pencil"></i>
            </button>
          </div>
        </Link>
        <div className="container">
          {(articles && articles.length) > 0 ? (
            articles.map((article) => (
              <MyArticleCard key={article._id} article={article} />
            ))
          ) : !loading && articles.length.toString() === "0" ? (
            <h1>No articles to read</h1>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyArticles;
