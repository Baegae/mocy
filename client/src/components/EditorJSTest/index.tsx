import React, {
  useEffect,
  useRef,
  ChangeEventHandler,
  useState,
  useLayoutEffect,
} from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Underline from '@editorjs/underline';
import Marker from '@editorjs/marker';
import Image from '@editorjs/image';
import QuizBlockPlugin from './QuizBlock/plugin';
import EditorWrapper from '@src/styles/EditorWrapper';
import DragDrop from 'editorjs-drag-drop';

const editorJsConfig: EditorConfig = {
  onChange: console.log,
  holder: 'editor',
  i18n: {
    messages: {
      ui: {
        blockTunes: {
          toggler: {
            'Click to tune': '클릭하거나 드래그하여, 블록 이동',
          },
        },
        inlineToolbar: {
          converter: {
            'Convert to': '변환',
          },
        },
        toolbar: {
          toolbox: {
            Add: '추가',
          },
        },
      },

      toolNames: {
        Text: '텍스트',
        Heading: '제목',
        List: '리스트',
        Link: '링크',
        Marker: '형광펜',
        Bold: '굵게',
        Italic: '기울게',
        Underline: '밑줄',
        Image: '사진'
      },
      tools: {
        image: {
          Caption: '설명',
          'Select an Image': '사진 선택...',
        },
        list: {
          Unordered: '순서가 없는 리스트',
          Ordered: '순서가 있는 리스트',
        },
        link: {
          'Add a link': '링크 추가',
        },
        stub: {
          'The block can not be displayed correctly.':
            '블록 표시 중 문제가 발생했습니다.',
        },
      },

      blockTunes: {
        delete: {
          Delete: '삭제',
        },
        moveUp: {
          'Move up': '위로 이동',
        },
        moveDown: {
          'Move down': '아래로 이동',
        },
      },
    },
  },
  tools: {
    header: Header,
    list: {
      class: List,
      inlineToolbar: true,
    },
    underline: {
      class: Underline,
      shortcut: 'CMD+SHIFT+U',
    },
    marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M',
    },
    image: {
      class: Image,
      config: {
        endpoints: {
          byFile: 'http://10.10.20.110:8000/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://10.10.20.110:8000/fetchUrl', // Your endpoint that provides uploading by Url
        },
      },
    },
    quiz: {
      // eslint-disable-next-line
      // @ts-ignore
      class: QuizBlockPlugin,
    },
  },
};

function EditorJSText() {
  const editorRef = useRef<EditorJS | null>(null);

  useLayoutEffect(() => {
    const editor = new EditorJS(
      Object.assign(
        {
          onReady: () => {
            new DragDrop(editor);
          },
        },
        editorJsConfig
      )
    );
    editorRef.current = editor;
  }, []);

  const handleSave = () => {
    editorRef.current?.save().then((data) => {
      console.log('save', data);
      setText(JSON.stringify(data));
    });
  };

  const [text, setText] = useState('');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value);
  };

  const handleLoad = () => {
    console.log('loading', text);
    editorRef.current?.render(JSON.parse(text));
  };

  return (
    <div>
      <div style={{ width: 680, margin: '0 auto' }}>
        <EditorWrapper>
          <div id="editor" />
        </EditorWrapper>
      </div>
      <button onClick={handleLoad}>load</button>
      <textarea value={text}
        onChange={handleChange}
      />
      <button onClick={handleSave}>save</button>
    </div>
  );
}

export default EditorJSText;
