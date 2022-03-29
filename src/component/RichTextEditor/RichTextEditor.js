import React, { Fragment, useState } from "react";
// react-draft-wysiwyg
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ApiClient from "../../utils/ApiClient";

const RichTextEditor = ({ formData, setFormData }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [error, setError] = useState(false);

  const uploadImageCallback = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await ApiClient().post("/articles/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        data: {
          link: result.data,
        },
      };
    } catch (error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const seeEditorChange = (e) => {
    console.log(e.entityMap);
  };

  return (
    <Fragment>
      <Editor
        editorState={editorState}
        onChange={seeEditorChange}
        toolbar={{
          image: {
            uploadCallback: uploadImageCallback,
            previewImage: true,
          },
        }}
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

      {error && <div className="alert alert-danger">{error}</div>}
    </Fragment>
  );
};

export default RichTextEditor;
