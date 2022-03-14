import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { createArticle } from "../../actions/article";

// react-draft-wysiwyg
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./CreateArticle.css";

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

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
    console.log("Editor:", formData.article_text);
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

    let articleData = {
      article_name,
      article_text,
      article_type: articleType,
    };

    dispatch(createArticle(articleData, history));
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

            <div class="cursor">
              <input
                type="text"
                className="form-control py-5 border-0"
                id="nameinput"
                required
                name="article_name"
                value={article_name}
                onChange={(e) => handleChange(e)}
                placeholder="Article Title"
              />
              <i></i>
            </div>
            <hr className="mt-0" />
            {formError.type &&
              formError.type === "article_name" &&
              errorDisplay(formError.msg)}
          </div>
          <div className="form-group my-4">
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
            <Editor
              editorState={editorState}
              onEditorStateChange={(newState) => {
                setEditorState(newState);
                setFormData({
                  ...formData,
                  article_text: draftToHtml(
                    convertToRaw(editorState.getCurrentContent())
                  ),
                });
              }}
              wrapperClassName="card mkdwn-editor-wrapper"
              editorClassName="card-body mkdwn-editor-body"
            />
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
