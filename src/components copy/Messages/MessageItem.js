import React, { Component } from 'react';

import './index.css';
import { Icon, Button, List , Input } from 'antd';

class MessageItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            editMode: false,
            editText: this.props.message.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.message.text,
        }));
    };

    onChangeEditText  = event => {
        this.setState({ editText: event.target.value });
    };

    onSaveEditText = () => {
        this.props.onEditMessage(this.props.message, this.state.editText);

        this.setState({ editMode: false });
    };

    render() {
        const { authUser, message, onRemoveMessage } = this.props;
        const { editMode, editText } = this.state;

        return (
           <List.Item>
            {editMode ? (
              <Input
                 className="edit-input"
                 value={editText}
                 onChange={this.onChangeEditText}
              />
            ) : (
               <span>
               <strong>
                {message.user.username || message.user.userId}
               </strong>{' '}
               {message.text} {message.editedAt && <span className="edited">(Edited)</span>}
              </span> 
            )}
                
           {authUser.uid === message.userId && (     
             <span>          
              {editMode ? (
                <span>
                  <Button onClick={this.onSaveEditText} className="small-button">
                    <Icon type="save"/>
                    Save
                  </Button>
                  <Button onClick={this.onToggleEditMode} className="small-button">
                    <Icon type="reload"/>
                    Reset
                  </Button>
                </span>
              ) : (
                <Button 
                  className="edit-button"
                  onClick={this.onToggleEditMode}>
                  <Icon type="edit"/>
                  
                </Button>
              )}

              {!editMode && (
                <Button
                  className="delete-button"
                  onClick={() => onRemoveMessage(message.uid)}
                >
                <Icon type="delete"/>                
                </Button>
              )}
            </span> 
           )}
          </List.Item>
        );
    }
}

export default MessageItem;