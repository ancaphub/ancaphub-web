/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { generate } from 'shortid';
import {
  FiImage as ImageIcon,
  FiCode as EmbedIcon,
  FiBarChart as PollIcon,
  FiX as CloseIcon,
  FiPlusCircle as AddIcon,
} from 'react-icons/fi';

import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createListPlugin from 'draft-js-list-plugin';
import { FormattedMessage } from 'react-intl';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import { bindActionCreators } from 'redux';

// Botões da inline toolbar
import {
  CodeButton,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  UnorderedListButton,
} from 'draft-js-buttons';

import { Form } from '@unform/web';
import {
  TextField,
  CardBody,
  CardFooter,
  Card,
  IconButton,
  Button,
} from '../../ui';

// Plugins customizados
import basicTextStylePlugin from '../../editor/plugins/basicTextStylePlugin';
import mentions from '../../editor/plugins/mentionPluginInfo';
import inlineToolbar, {
  HeadlineButton,
} from '../../editor/plugins/inlineToolbarPlugin';
// CSS do editor
import 'draft-js/dist/Draft.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import '../../../assets/mentions.css';
import '../../../assets/inline-toolbar.css';

import {
  createPostRequest,
  getPostsRequest,
  getUserPostsRequest,
} from '../../../actions/posts';

import PostFormStyle from './styles';

const mentionPlugin = createMentionPlugin({
  mentionsPrefix: '@',
  entityMutability: 'IMMUTABLE',
  supportWhitespace: true,
});

const linkifyPlugin = createLinkifyPlugin();
const listPlugin = createListPlugin();
const hashtagPlugin = createHashtagPlugin();

// Lista todos os plugins
const plugins = [
  linkifyPlugin,
  basicTextStylePlugin,
  listPlugin,
  hashtagPlugin,
  mentionPlugin,
  inlineToolbar,
];

function PostForm({ createPostRequest: createPost }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([]);
  const contentState = editorState.getCurrentContent();
  const [media, setMedia] = useState(null);
  const uploadInputRef = useRef(null);
  const preview = useMemo(
    () =>
      media && media.type === 'image' ? URL.createObjectURL(media.data) : null,
    [media]
  );

  // eslint-disable-next-line no-shadow
  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      // eslint-disable-next-line react/no-this-in-sfc
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  function handleSubmit() {
    const content = JSON.stringify(convertToRaw(contentState));

    /*
    let data;
    if (media !== null) {
      if (media.type === 'image') {
        data = new FormData();
        data.append('content', content);
        data.append('mediaType', media.type);
        data.append('file', media.data);
      } else {
        data = {
          content,
          mediaType: media.type,
          media: media.data,
        };
      }
    } else {
      data = { content };
    } */

    createPost({ content });
    setMedia(null);
    setEditorState(EditorState.createEmpty());
  }

  const handleAddImage = (e) => {
    setMedia({
      type: 'image',
      data: e.target.files[0],
    });
  };

  const handleAddEmbed = () => {
    setMedia({
      type: 'embed',
      data: '',
    });
  };

  const handleAddPoll = () => {
    setMedia({
      type: 'poll',
      data: ['', ''],
    });
  };

  const addPollOption = () => {
    if (media.data.length < 4) {
      setMedia({ ...media, data: [...media.data, ''] });
    }
  };

  const handleChangePollOption = (index, e) => {
    const newArray = [...media.data];
    newArray[index] = e.target.value;
    setMedia({ ...media, data: newArray });
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    document.getElementById('image-input').value = null;
  };

  // On search term changed
  const onSearchChange = async ({ value }) => {
    const results = await mentions(value);
    setSuggestions(results);
  };

  // Do something with the object
  const onAddMention = () => {};

  // Suggestions box
  const { MentionSuggestions } = mentionPlugin;

  // Inline toolbar component
  const { InlineToolbar } = inlineToolbar;

  // Determine whether placeholder should be displayed (to avoid overlap with lists)
  const blockType = RichUtils.getCurrentBlockType(editorState);
  const isOl = blockType === 'ordered-list-item';
  const isUl = blockType === 'unordered-list-item';
  const placeholderIsVisible = !isOl && !isUl;

  return (
    <div style={{ width: '100%' }}>
      <PostFormStyle>
        <Form onSubmit={handleSubmit}>
          <div className="text-box">
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
              placeholder={
                placeholderIsVisible ? (
                  <FormattedMessage id="components.postNewStatus.thinking" />
                ) : (
                  ''
                )
              }
              plugins={plugins}
              spellCheck
              name="content"
            />
            <MentionSuggestions
              onSearchChange={onSearchChange}
              suggestions={suggestions}
              onAddMention={onAddMention}
            />
            <InlineToolbar>
              {(externalProps) => (
                <>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <HeadlineButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <CodeButton {...externalProps} />
                </>
              )}
            </InlineToolbar>
            {media && (
              <div className="media-preview">
                {media.type === 'image' && (
                  <div className="image-box">
                    <IconButton
                      icon={<CloseIcon />}
                      onClick={handleRemoveMedia}
                      className="close-icon"
                    />
                    <img src={preview} alt="preview" />
                  </div>
                )}
                {media.type === 'poll' && (
                  <Card>
                    <div className="poll-box">
                      <ul>
                        {media.data.map((option, index) => (
                          <li
                            key={() => generate()}
                            style={{ marginBottom: 8 }}
                          >
                            <FormattedMessage
                              id={`components.postForm.pollOptionNumber${
                                index >= 2 ? 'Optional' : ''
                              }`}
                              values={{ optionNumber: index + 1 }}
                            >
                              {(msg) => (
                                <TextField
                                  fullWidth
                                  type="text"
                                  placeholder={msg}
                                  value={media.data[index]}
                                  name={`options[${index}]`}
                                  onChange={(e) =>
                                    handleChangePollOption(index, e)
                                  }
                                />
                              )}
                            </FormattedMessage>
                          </li>
                        ))}
                      </ul>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          minWidth: 56,
                          padding: '16px 8px',
                        }}
                      >
                        {media.data.length < 4 && (
                          <IconButton
                            icon={<AddIcon size="20px" />}
                            onClick={addPollOption}
                          />
                        )}
                      </div>
                    </div>
                    <CardFooter
                      label={
                        <FormattedMessage id="components.postForm.removePoll" />
                      }
                      action={handleRemoveMedia}
                    />
                  </Card>
                )}
                {media.type === 'embed' && (
                  <Card>
                    <CardBody>
                      <FormattedMessage id="components.postForm.videoUrl">
                        {(msg) => (
                          <TextField
                            fullWidth
                            placeholder={msg}
                            value={media.data}
                            name="url"
                            onChange={(e) =>
                              setMedia({
                                type: 'embed',
                                data: e.target.value,
                              })
                            }
                          />
                        )}
                      </FormattedMessage>
                      {media.data !== '' && (
                        <ReactPlayer
                          url={media.data}
                          light
                          style={{ marginTop: 8 }}
                          width="100%"
                        />
                      )}
                    </CardBody>

                    <CardFooter
                      label={
                        <FormattedMessage id="components.postForm.removeEmbed" />
                      }
                      action={handleRemoveMedia}
                    />
                  </Card>
                )}
              </div>
            )}
          </div>
          <div className="form-actions">
            <div className="upload-button">
              <IconButton
                icon={<ImageIcon />}
                size="small"
                onClick={() => uploadInputRef.current.click()}
              />
              <input
                ref={uploadInputRef}
                id="image-input"
                type="file"
                onChange={(e) => handleAddImage(e)}
              />
            </div>

            <IconButton
              icon={<PollIcon />}
              size="small"
              onClick={handleAddPoll}
            />

            <IconButton
              icon={<EmbedIcon />}
              size="small"
              onClick={handleAddEmbed}
            />

            <Button
              variant="contained"
              disableElevation
              color="secondary"
              size="small"
              style={{ marginLeft: 'auto' }}
              disabled={!contentState.hasText()}
              onClick={handleSubmit}
            >
              <FormattedMessage id="common.publish" />
            </Button>
          </div>
        </Form>
      </PostFormStyle>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { createPostRequest, getUserPostsRequest, getPostsRequest },
    dispatch
  );
export default connect(null, mapDispatchToProps)(PostForm);
