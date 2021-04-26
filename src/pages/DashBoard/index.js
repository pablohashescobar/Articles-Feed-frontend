import React, { useEffect } from "react";
import Card from "../../component/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../../actions/article";

const DashBoard = () => {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.article.articles);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user != null) {
      dispatch(getAllArticles());
    }

    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <h3 className="display-4 m-2">Dashboard</h3>
      <div className="container-md mt-5">
        {(articles && articles.length) > 0
          ? articles.map((article, index) => (
              <Card key={index} article={article} />
            ))
          : articles.length.toString() === "0" && <h1>No articles to read</h1>}
      </div>
    </div>
  );
};

export default DashBoard;
