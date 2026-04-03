import { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const DEFAULT_CONTENT = `
<h1 style="text-align: center;">My Document</h1>
<p>Welcome to the Word Processor Lab. This editor replicates a professional word processor experience with full formatting capabilities.</p>
<h2>Getting Started</h2>
<p>Use the toolbar above to format text, insert images, create tables, and more. Try these features:</p>
<ul>
  <li><strong>Bold</strong>, <em>Italic</em>, and <u>Underline</u> text formatting</li>
  <li>Bulleted and numbered lists</li>
  <li>Text alignment and indentation</li>
  <li>Insert tables, images, and links</li>
  <li>Font family and size selection</li>
</ul>
<h2>Practice Exercise</h2>
<p>Try creating a formatted letter with a heading, body paragraphs, and a signature block below.</p>
<br/><br/>
<p>Best regards,</p>
<p><em>Your Name</em></p>
`;

const WordPro = () => {
  return (
    <div className="h-[900px] bg-[#f3f3f3] rounded-xl overflow-hidden border border-gray-300 flex flex-col">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        init={{
          height: 900,
          menubar: "file edit view insert format tools table help",
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap",
            "preview", "anchor", "searchreplace", "visualblocks", "code",
            "fullscreen", "insertdatetime", "media", "table", "wordcount",
            "pagebreak", "emoticons",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | " +
            "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | table link image | " +
            "pagebreak emoticons charmap | fullscreen preview print",
          skin: "oxide",
          content_css: "document",
          content_style: `
            body {
              font-family: 'Calibri', 'Segoe UI', sans-serif;
              font-size: 11pt;
              max-width: 816px;
              margin: 40px auto;
              padding: 60px 72px;
              background: #fff;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              min-height: 1056px;
            }
          `,
          branding: false,
          promotion: false,
          resize: false,
          statusbar: true,
          elementpath: true,
        }}
        initialValue={DEFAULT_CONTENT}
      />
    </div>
  );
};

export default WordPro;
