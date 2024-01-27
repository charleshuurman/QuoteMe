// import Auth from "../../utils/auth";
import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE , CREATE_COMMENT, LIKE_QUOTE } from "../../utils/mutations";


const PostQuote = () => {
  const [quoteText, setQuoteText] = useState('');
  const [createQuote] = useMutation(CREATE_QUOTE);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [likeQuote] = useMutation(LIKE_QUOTE);
  const [posts, setPosts] = useState([]);

  const handleInputChange = (event) => {
    setQuoteText(event.target.value);
  };

  const handlePostQuote = (event) => {
    event.preventDefault();
    createQuote({ variables: { text: quoteText } })
      .then((res) => {
        console.log('Quote created:', res.data.createQuote);
        // Reset the input field
        setQuoteText('');
        setPosts((prevPosts) => [...prevPosts, res.data.createQuote]);
      })
      .catch((error) => {
        console.error('Error creating quote:', error);
      });
  };
  const handlePostComment = (quoteId, commentText) => {
    createComment({ variables: { quoteId, text: commentText } })
      .then((res) => {
        console.log('Comment created:', res.data.createComment);
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          const postIndex = updatedPosts.findIndex((post) => post.id === quoteId);
          if (postIndex !== -1) {
            updatedPosts[postIndex].comments.push(res.data.createComment);
          }
          return updatedPosts;
        });
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
      });
  };

  const handleLikeQuote = (quoteId) => {
    likeQuote({ variables: { quoteId } })
      .then((res) => {
        console.log('Quote liked:', res.data.likeQuote);
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          const postIndex = updatedPosts.findIndex((post) => post.id === quoteId);
          if (postIndex !== -1) {
            updatedPosts[postIndex].likes.push(res.data.likeQuote);
          }
          return updatedPosts;
        });
      })
      .catch((error) => {
        console.error('Error liking quote:', error);
      });
  };

  return (
    <>
    <div className="rounded-box bg-base-200 p-2">
    <p>Post Your Quote!</p>
      <form onSubmit={handlePostQuote}>
        <input
          className="input input-bordered"
          type="text"
          value={quoteText}
          onChange={handleInputChange}
          placeholder="Enter your quote"
        />
        <button type="submit" className="btn btn-primary">Post Quote</button>
      </form>
      {/* Render the posts at the bottom of the page */}

      {posts.map((post) => (
          <div key={post.id}>
            <p>{post.text}</p>
            <button onClick={() => handleLikeQuote(post.id)}>Like</button>
            <button onClick={() => handlePostComment(post.id, "New comment")}>Comment</button>
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostQuote;
