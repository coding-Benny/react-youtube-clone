import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            videoId: props.videoId,
            responseTo: props.comment._id
        }
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    setCommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(response.data.result)
                }
                else {
                    alert('커멘트를 저장하지 못했습니다.')
                }
            })
    }

    const actions = [
        <span onClick={ onClickReplyOpen } key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={ actions }
                author
                avatar={ <Avatar src alt /> }
                content={ <p>{ props.comment.content }</p> }
            />

            { OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={ onSubmit }>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={ onHandleChange }
                        value={ CommentValue }
                        placeholder="코멘트를 작성해주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={ onSubmit }>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
