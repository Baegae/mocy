import React from 'react';
import { Row, Col } from 'react-grid-system';
import Headroom from 'react-headroom';

import CTAButton from '@src/components/common/CTAButton';
import FlatButton from '@src/components/common/FlatButton';

import * as S from './styles';
import { slideEditorState, EditingState } from '@src/components/VideoEdit/states';
import { useRecoilState } from 'recoil';
import produce from 'immer';

interface EditorToolBarProps {
  name: string;
  lectureName: string;
  onNameChanged?: React.ChangeEventHandler;
}

const EditorToolBar: React.FC<EditorToolBarProps> = ({
  onNameChanged = console.log,
  name = '노래방 가고 싶다. 그럴 땐 가는게 맞다.',
  lectureName = '길범준의 노래방 강의',
}) => {
  return (
    <Headroom>
      <S.ToolbarWrapper fluid>
        <Row align="center">
          <Col>
            <Header onNameChanged={onNameChanged}
              name={name}
              lectureName={lectureName}
            />
          </Col>
          <Col>
            <Buttons />
          </Col>
        </Row>
      </S.ToolbarWrapper>
    </Headroom>
  );
};

const Header: React.FC<EditorToolBarProps> = ({
  onNameChanged = console.log,
  name = '노래방 가고 싶다. 그럴 땐 가는게 맞다.',
  lectureName = '길범준의 노래방 강의',
}) => {
  const [{ editingState }] = useRecoilState(slideEditorState);
  return (

    <S.TitleWrapper>
      <S.Symbol />
      <div>
        <input
          type="text"
          value={name}
          placeholder="새로운 강의 이름"
          onChange={onNameChanged}
          disabled={!onNameChanged}
        />
        <p>{lectureName}</p>
      </div>
    </S.TitleWrapper>
  );
};

const Buttons: React.FC = () => {
  const [slideEditor, setSlideEditor] = useRecoilState(slideEditorState);
  const { editingState } = slideEditor;

  const discardRecording = () => {
    setSlideEditor((slideEditor) => (produce(slideEditor, draftState => {
      draftState.editingState = EditingState.Editing;
      draftState.preview = {
        videoObjectUrl: '',
        currentTime: 0,
      };
      draftState.slides.forEach(slide => {
        slide.changes = [];
        slide.selectionChanges = [];
      });
      draftState.slideIndexChange = [];
    })));
  };

  return (
    <S.ButtonWrapper>
      {editingState === EditingState.Previewing && (
        <>
          <div style={{ width: 24 }} />
          <FlatButton onClick={discardRecording}>취소</FlatButton>
          <div style={{ width: 24 }} />
          <CTAButton>업로드</CTAButton>
        </>
      )}
    </S.ButtonWrapper>
  );
};

export default EditorToolBar;
