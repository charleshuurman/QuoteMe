import Auth from "../../utils/auth";

const BulletinBoard = () => {
  const commentItem = {
    user: {
      name: "dummyuser",
      alias: "dummyalias",
    },
    content: "This is a comment content",
    createdAt: new Date().toLocaleString(),
  };

  return (
    <>
      <h1>Bulletin Board</h1>
      <div className="hero min-h-fit bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Bulletin Board</h1>
            <p className="py-6">Bulletin Board</p>
            <button className="btn btn-primary">Create Quote</button>
          </div>
        </div>
      </div>

      {/* Comment Right */}
      <div className="chat chat-end">
        <div className="dropdown dropdown-end chat-image avatar">
          <div tabIndex="0" role="button" className="w-10 rounded-full m-1">
            <img alt="chat bubble" src="/images/user_kmg.png" />
          </div>

          <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 text-xs">
            <li>
              <button className="min-w-full" type="submit" >
                {/* onClick */}
                Delete
              </button>
            </li>
          </ul>
        </div>
        <div className="chat-header">
          <div className="badge badge-outline badge-neutral">{commentItem.user.alias}</div>
        </div>
        <div className="chat-bubble">{commentItem.content}</div>
        <div className="chat-footer opacity-50">
          <time className="text-xs opacity-50">{commentItem.createdAt}</time>
        </div>
      </div>
      {/* Comment Left */}
      <div className="chat chat-start">
        <div className="dropdown dropdown-end chat-image avatar">
          <div tabIndex="0" role="button" className="w-10 rounded-full m-1">
            <img alt="chat bubble" src="/images/user_kmg.png" />
          </div>

          <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 text-xs">
            <li>
              <button className="min-w-full" type="submit" >
                {/* onClick */}
                Delete
              </button>
            </li>
          </ul>
        </div>
        <div className="chat-header">
          <div className="badge badge-outline badge-neutral">{commentItem.user.alias}</div>
        </div>
        <div className="chat-bubble">{commentItem.content}</div>
        <div className="chat-footer opacity-50">
          <time className="text-xs opacity-50">{commentItem.createdAt}</time>
        </div>
      </div>
    </>
  );
};

export default BulletinBoard;
