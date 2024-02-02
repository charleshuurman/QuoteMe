// This component allows users to post quotes, comment on them, and like them. It supports both public and private (journal) posts.
// It utilizes GraphQL mutations for creating quotes, comments, and likes, and dynamically updates the posts displayed.
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE, CREATE_COMMENT, LIKE_QUOTE } from "../../utils/mutations";

const PostQuote = (props) => {
  const isJournal = props?.isJournal || false;

  // State hooks for managing quote text, posts, and loading status
  const [quoteText, setQuoteText] = useState("");
  const [createQuote, { loading }] = useMutation(CREATE_QUOTE);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [likeQuote] = useMutation(LIKE_QUOTE);
  const [posts, setPosts] = useState([]);

  // Updates the quote text as the user types
  const handleInputChange = (event) => {
    setQuoteText(event.target.value);
  };

  // Handles posting a new Quote
  const handlePostQuote = (event) => {
    event.preventDefault();
    createQuote({
      variables: {
        content: quoteText,
        emotion: "Happy",
        isPrivate: isJournal,
        isGenerated: false,
        imageUrl: "http://placekitten.com/100/200",
      },
    })
      .then((res) => {
        console.log("Quote created:", res.data.createQuote);
        window.location.reload();
        setQuoteText(""); // Clear the input field after posting
        // Adds the new quote to the list of quotes without reloading the page
        setPosts((prevPosts) => [...prevPosts, res.data.createQuote]);
      })
      .catch((error) => {
        console.error("Error creating quote:", error);
      });
  };

  // Handles posting a new comment on a quote
  const handlePostComment = (quoteId, commentText) => {
    createComment({ variables: { quoteId, text: commentText } })
      .then((res) => {
        // Updates the post with the new comment
        console.log("Comment created:", res.data.createComment);
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
        console.error("Error creating comment:", error);
      });
  };

  // Handles 'liking' a quote
  const handleLikeQuote = (quoteId) => {
    likeQuote({ variables: { quoteId } })
      .then((res) => {
        console.log("Quote liked:", res.data.likeQuote);
        // Updates the post with the new like
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
        console.error("Error liking quote:", error);
      });
  };

  //  Rendering the component UI
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
          <button type="submit" className="btn btn-primary">
            {loading ? "Posting Quote..." : "Post Quote"}
          </button>
        </form>
        {/* Render the posts at the bottom of the page */}

        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.text}</p>
            <button onClick={() => handleLikeQuote(post.id)}>Like</button>
            <button onClick={() => handlePostComment(post.id, "New comment")}>Comment</button>
            <ul>
              {post.reactions ? (
                post.reactions.map((reaction) => (
                  <li key={reaction.reactionId}>
                    {reaction.userName}:{reaction.reactionBody}
                  </li>
                ))
              ) : (
                <div>No reactions</div>
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostQuote;
