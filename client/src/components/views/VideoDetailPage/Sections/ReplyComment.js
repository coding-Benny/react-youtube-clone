import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentLists])

    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                { 
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={ comment } videoId={ props.videoId } refreshFunction={ props.refreshFunction } />
                        <ReplyComment commentLists={ props.commentLists } videoId={ props.videoId } parentCommentId={ comment._id } refreshFunction={ props.refreshFunction } />
                    </div>
                }
            </React.Fragment>
    ))

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            { ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={ onHandleChange }>
                    View { ChildCommentNumber } more comment(s)
                </p>
            }

            { OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
