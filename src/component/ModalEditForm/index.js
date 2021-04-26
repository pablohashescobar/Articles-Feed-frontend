import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { editArticle as editArticleAction } from "../../actions/article";

const options = [
  { value: "sports", label: "Sports" },
  { value: "space", label: "Space" },
  { value: "automobile", label: "Automobile" },
  { value: "politics", label: "Politics" },
  { value: "myself", label: "Myself" },
];

const EditForm = ({ editArticle, setModalState, modalState }) => {
  const dispatch = useDispatch();

  let defaultPreferenceValue = (articleTypes = editArticle.article_type) => {
    let userPreferenceDefaultValues = [];
    for (const pre in articleTypes) {
      for (const values in options) {
        if (articleTypes[pre] === options[values].value) {
          userPreferenceDefaultValues.push(options[values]);
        }
      }
    }
    return userPreferenceDefaultValues;
  };

  const [articlePreferences, setArticlePreferences] = useState(
    editArticle && defaultPreferenceValue()
  );

  const [formData, setFormData] = useState({
    article_name: editArticle.article_name,
    article_text: editArticle.article_text,
  });

  //FrontEnd form validation error
  const [formError, setFormError] = useState({
    msg: "",
    type: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { article_name, article_text } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (article_name.length < 1) {
      setFormError({
        msg: "This field cannot be empty",
        type: "article_name",
      });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (article_text.length < 1) {
      setFormError({
        msg: "This field cannot be empty",
        type: "article_text",
      });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }
    if (articlePreferences == null || articlePreferences.length < 1) {
      setFormError({
        msg: "This Field Cannot be Empty",
        type: "articlePreferences",
      });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    let articleType = articlePreferences.map((preference) => preference.value);

    let formdata = {
      article_name,
      article_text,
      article_type: articleType,
    };

    dispatch(editArticleAction(formdata, editArticle._id));
  };

  const errorDisplay = (errMsg) => (
    <span className="text-danger">{errMsg}</span>
  );

  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ textAlign: "center" }}>
            <h2 className="modal-title" id="exampleModalLongTitle">
              Edit Article
            </h2>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e) => setModalState(!modalState)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1"></label>
                <textarea
                  type="text"
                  className="form-control"
                  id="nameinput"
                  placeholder="Name"
                  required
                  row="1"
                  style={{
                    resize: "none",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                  name="article_name"
                  value={article_name}
                  onChange={(e) => handleChange(e)}
                ></textarea>
                {formError.type &&
                  formError.type === "article_name" &&
                  errorDisplay(formError.msg)}
              </div>
              <div className="form-group">
                <Select
                  defaultValue={defaultPreferenceValue()}
                  options={options}
                  isMulti
                  onChange={setArticlePreferences}
                  placeholder={"Article Type"}
                />
                {formError.type &&
                  formError.type === "articlePreferences" &&
                  errorDisplay(formError.msg)}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="Text"
                  name="article_text"
                  value={article_text}
                  required
                  onChange={(e) => handleChange(e)}
                  rows="5"
                ></textarea>
                {formError.type &&
                  formError.type === "article_text" &&
                  errorDisplay(formError.msg)}
              </div>

              <button type="submit" className="btn btn-primary m-2">
                Submit
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={(e) => setModalState(!modalState)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
