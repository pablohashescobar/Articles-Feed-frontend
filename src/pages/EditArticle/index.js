import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getArticleById } from "../../actions/article";
import ModalEditForm from "../../component/ModalEditForm";

const EditArticle = ({ match }) => {
  const dispatch = useDispatch();
  const editArticle = useSelector((state) => state.article.article);

  useEffect(() => {
    dispatch(getArticleById(match.params.id));

    // eslint-disable-next-line
  }, []);

  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => setModalState(!modalState);

  return (
    <div>
      {modalState ? (
        <ModalEditForm
          editArticle={editArticle}
          modalState={modalState}
          setModalState={setModalState}
          toggleModalState={toggleModalState}
        />
      ) : (
        <></>
      )}
      <h3 className="display-4 m-2">Edit Article</h3>
      <div className="container-md mt-5">
        <div className="card" style={{ textAlign: "left" }}>
          <div className="card-header">
            {editArticle &&
              editArticle.article_type.map((type, index) => (
                <span key={index} className="btn btn-dark mx-1">
                  {type}
                </span>
              ))}
          </div>
          <div className="card-body">
            <h3 className="card-title">
              {editArticle && editArticle.article_name}
            </h3>
            {editArticle && (
              <p
                className="card-text"
                dangerouslySetInnerHTML={{ __html: editArticle.article_text }}
              ></p>
            )}
          </div>
        </div>
        <Link to="/myarticles" type="button" className="btn btn-primary m-2">
          <i className="bi bi-arrow-left mr-1"></i>Go Back
        </Link>
        <button
          type="button"
          className="btn btn-primary m-2"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={(e) => toggleModalState()}
        >
          <i class="bi bi-pencil-fill mr-1"></i>Edit This Article
        </button>
      </div>
    </div>
  );
};

export default EditArticle;
