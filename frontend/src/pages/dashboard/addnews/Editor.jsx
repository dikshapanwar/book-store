import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "", errors }) {
  const apiKey = import.meta.env.VITE_APP_TINYMCE_API_KEY; // Replace with your actual API key

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <div>
            <Editor
              apiKey={apiKey}  // Pass the TinyMCE API key
              value={value || defaultValue}  // Bind value to the editor
              init={{
                plugins: [
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                  // TinyMCE premium features (you may need an API key for these)
                  'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                  // Early access to document converters
                  'importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                exportword_converter_options: { 'document': { 'size': 'Letter' } },
                importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline', 'defaults': 'inline', } },
              }}
              onEditorChange={onChange}  // Update form value on content change
            />
            {/* Display error message if validation fails */}
            {errors && errors[name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name]?.message || 'This field is required'}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
