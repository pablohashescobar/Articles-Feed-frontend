import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { createArticle } from "../../actions/article";

const options = [
  { value: "sports", label: "Sports" },
  { value: "space", label: "Space" },
  { value: "automobile", label: "Automobile" },
  { value: "politics", label: "Politics" },
  { value: "myself", label: "Myself" },
];

const CreateArticle = ({ history }) => {
  const dispatch = useDispatch();

  const [articlePreferences, setArticlePreferences] = useState(null);
  const [formData, setFormData] = useState({
    article_name: "",
    article_text: "",
  });
  //FrontEnd form validation error
  const [formError, setFormError] = useState({
    msg: "",
    type: "",
  });
  const { article_name, article_text } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

    dispatch(createArticle(formdata, history));
  };

  //Display in form errors
  const errorDisplay = (errMsg) => (
    <span className="text-danger">{errMsg}</span>
  );

  return (
    <div>
      <h3 className="display-4 m-2">Create Article</h3>

      <div className="container-md mt-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="nameinput"></label>
            <input
              type="text"
              className="form-control"
              id="nameinput"
              required
              name="article_name"
              value={article_name}
              onChange={(e) => handleChange(e)}
              placeholder="Name"
            />
            {formError.type &&
              formError.type === "article_name" &&
              errorDisplay(formError.msg)}
          </div>
          <div className="form-group">
            <Select
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
              rows="5"
              name="article_text"
              value={article_text}
              required
              onChange={(e) => handleChange(e)}
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
    </div>
  );
};

export default CreateArticle;
