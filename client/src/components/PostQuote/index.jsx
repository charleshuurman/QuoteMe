// This component allows users to post quotes, comment on them, and like them. It supports both public and private (journal) posts.
// It utilizes GraphQL mutations for creating quotes, comments, and likes, and dynamically updates the posts displayed.
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE, CREATE_COMMENT, LIKE_QUOTE } from "../../utils/mutations";

// Import the emotions array
import { emotions } from "../../utils/GlobalState";

const PostQuote = (props) => {
  const isJournal = props?.isJournal || false;

  // State hooks for managing quote text, posts, and loading status
  const [quoteText, setQuoteText] = useState("");
  const [emotionText, setEmotionText] = useState("");
  const [imageUrlText, setImageUrlText] = useState("http://placekitten.com/100/200");
  const [createQuote, { loading }] = useMutation(CREATE_QUOTE);
  const [createComment] = useMutation(CREATE_COMMENT);
  const [likeQuote] = useMutation(LIKE_QUOTE);
  const [posts, setPosts] = useState([]);

  // Updates the quote text as the user types
  const handleInputChange = (name, event) => {
    if (name === "postquote") {
      setQuoteText(event.target.value);
    } else if (name === "postemotion") {
      setEmotionText(event.target.value.trim().split(" ")[0].toLowerCase());
    } else if (name === "imageurl") {
      setImageUrlText(event.target.value);
    }
  };

  // Handles posting a new Quote
  const handlePostQuote = (event) => {
    event.preventDefault();
    if (quoteText.length > 0 ) {
      createQuote({
        variables: {
          content: quoteText,
          emotion: emotionText,
          isPrivate: isJournal,
          isGenerated: false,
          imageUrl: imageUrlText,
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
    } else {
      console.log("Quote is empty, cancelling post");
    };
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
      <div className="rounded-box bg-base-200 p-2 flex flex-wrap justify-center">
        <p className="flex-1">Post Your Quote!</p>
        <form onSubmit={handlePostQuote} className="flex flex-col w-3/4 gap-2">
          <input
            className="input input-bordered"
            type="text"
            name="postquote"
            value={quoteText}
            onChange={() => handleInputChange("postquote", event)}
            placeholder="Enter your quote"
          />
          {/* emotion detector (TBD): {quoteText?(<button type="button" className="badge badge-secondary">detect emotion</button>):<div className="badge badge-outline">type in your post to detect its emotion</div>} */}
          <input
            className="input input-bordered"
            type="text"
            placeholder="How are you feeling today?"
            value={emotionText}
            name="postemotion"
            onChange={() => handleInputChange("postemotion", event)}
            list="emotionlist"
          />
          <datalist id="emotionlist">
            {emotions.map(({ name, emoji }, index) => {
              return <option key={index} value={name + " " + emoji} />;
            })}
          </datalist>
          <input
            className="input input-bordered"
            type="text"
            placeholder="Enter an image URL to set a picture"
            value={imageUrlText}
            name="imageurl"
            onChange={() => handleInputChange("imageurl", event)}
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
