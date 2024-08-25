// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import { FaHeart, FaComment } from 'react-icons/fa';

// // const Post = ({ post, addComment, likePost, user_id }) => {
// //   const {
// //     post_id,
// //     post_first_name,
// //     post_last_name,
// //     post_content,
// //     comments = [], // Ensure comments is always an array
// //     likes = 0,     // Ensure likes is a number
// //     post_created_at,
// //   } = post;

// //   const [commentText, setCommentText] = useState('');
// //   const [showCommentInput, setShowCommentInput] = useState(false);
// //   const [showMoreComments, setShowMoreComments] = useState(false);
// //   const [likeCount, setLikeCount] = useState(likes);
// //   const [liked, setLiked] = useState(false);

// //   useEffect(() => {
// //     const checkLikeStatus = async () => {
// //       try {
// //         const response = await fetch(
// //           http://localhost/hugot/api.php?action=getLikeStatus&post_id=${post_id}&user_id=${user_id}
// //         );
// //         const data = await response.json();
// //         if (data.success) {
// //           setLiked(data.liked);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching like status:', error);
// //       }
// //     };

// //     checkLikeStatus();
// //   }, [post_id, user_id]);

// //   const handleLike = async () => {
// //     try {
// //       const response = await likePost(post_id);
// //       if (response.success) {
// //         setLiked(!liked);
// //         setLikeCount(likeCount + (liked ? -1 : 1));
// //       }
// //     } catch (error) {
// //       console.error('Error liking post:', error);
// //     }
// //   };

// //   const handleAddComment = () => {
// //     if (commentText.trim()) {
// //       addComment(post_id, commentText);
// //       setCommentText('');
// //       setShowCommentInput(false);
// //     }
// //   };

// //   return (
// //     <div className="p-4 bg-white shadow rounded-lg border border-gray-300">
// //       <div className="flex justify-between items-center mb-2">
// //         <div className="text-sm text-gray-700">
// //           <span className="font-bold">{post_first_name} {post_last_name}</span> • {new Date(post_created_at).toLocaleString()}
// //         </div>
// //       </div>
// //       <p className="text-gray-800 mb-4">{post_content}</p>
// //       <div className="flex justify-between items-center">
// //         <div className="flex space-x-4">
// //           <button
// //             onClick={handleLike}
// //             className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'}`}
// //           >
// //             <FaHeart /> <span>{likeCount}</span>
// //           </button>
// //           <button
// //             onClick={() => setShowCommentInput(!showCommentInput)}
// //             className="flex items-center space-x-2 text-gray-500"
// //           >
// //             <FaComment /> <span>{comments.length}</span>
// //           </button>
// //         </div>
// //       </div>

// //       {showCommentInput && (
// //         <div className="mt-4">
// //           <input
// //             type="text"
// //             value={commentText}
// //             onChange={(e) => setCommentText(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
// //             placeholder="Write a comment..."
// //           />
// //           <button
// //             onClick={handleAddComment}
// //             className="mt-2 bg-gray-800 text-white py-1 px-4 rounded-lg hover:bg-gray-900 transition"
// //           >
// //             Comment
// //           </button>
// //         </div>
// //       )}

// //       {comments.length > 0 && (
// //         <div className="mt-4">
// //           {comments.slice(0, showMoreComments ? comments.length : 3).map((comment) => (
// //             <div key={comment.comment_id} className="mt-2 text-sm text-gray-700">
// //               <span className="font-bold">{comment.comment_first_name} {comment.comment_last_name}</span> • {new Date(comment.comment_created_at).toLocaleString()}
// //               <p>{comment.comment_text}</p>
// //             </div>
// //           ))}
// //           {comments.length > 3 && (
// //             <button
// //               onClick={() => setShowMoreComments(!showMoreComments)}
// //               className="text-amber-500 mt-2"
// //             >
// //               {showMoreComments ? 'Show less' : 'Show more'}
// //             </button>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Post;





// "use client";
// import React, { useState, useEffect } from 'react';
// import { FaHeart, FaComment, FaSmile } from 'react-icons/fa';
// import Post from './Post';

// const Home = ({ userId: initialUserId, onLogout }) => {
//   const [userId, setUserId] = useState(initialUserId || localStorage.getItem('userId'));
//   const [posts, setPosts] = useState([]);
//   const [postText, setPostText] = useState('');
//   const [showFeelingOptions, setShowFeelingOptions] = useState(false);

//   useEffect(() => {
//     if (userId) {
//       localStorage.setItem('userId', userId);
//       fetchPosts();
//     }
//   }, [userId]);

//   const fetchPosts = () => {
//     fetch('http://localhost/hugot/api.php?action=getPosts')
//       .then((response) => response.json())
//       .then((data) => setPosts(data.posts))
//       .catch((error) => console.error('Error fetching posts:', error));
//   };

//   const addPost = async () => {
//     try {
//       const response = await fetch('http://localhost/hugot/api.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           action: 'addPost',
//           user_id: userId,
//           content: postText,
//         }),
//       });

//       const result = await response.json();
//       if (result.success) {
//         setPosts([
//           {
//             post_id: result.post_id,
//             user_id: result.user_id,
//             post_first_name: result.first_name,
//             post_last_name: result.last_name,
//             post_content: postText,
//             post_created_at: new Date().toISOString(),
//             comments: [],
//             likes: 0
//           },
//           ...posts,
//         ]);
//         setPostText('');
//       } else {
//         console.error('Failed to add post:', result.message);
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };

//   const addComment = (postId, commentText) => {
//     fetch('http://localhost/hugot/api.php', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         action: 'addComment',
//         post_id: postId,
//         user_id: userId,
//         comment_text: commentText,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setPosts(
//             posts.map((post) =>
//               post.post_id === postId
//                 ? {
//                     ...post,
//                     comments: [
//                       ...post.comments,
//                       {
//                         comment_id: data.comment_id,
//                         comment_text: commentText,
//                         comment_created_at: new Date().toISOString(),
//                         comment_first_name: data.comment_first_name,
//                         comment_last_name: data.comment_last_name,
//                       },
//                     ],
//                   }
//                 : post
//             )
//           );
//         } else {
//           console.error('Failed to add comment:', data.message);
//         }
//       });
//   };

//   const likePost = async (postId) => {
//     try {
//       const response = await fetch('http://localhost/hugot/api.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           action: 'likePost',
//           post_id: postId,
//           user_id: userId,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setPosts(
//           posts.map((post) =>
//             post.post_id === postId
//               ? {
//                   ...post,
//                   likes: post.likes + (data.liked ? 1 : -1),
//                 }
//               : post
//           )
//         );
//       } else {
//         console.error('Failed to like post:', data.message);
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     setUserId(null);
//     onLogout();
//   };

//   return (
//     <div className="relative">
//       <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100 shadow-lg z-50">
//         <div className="text-2xl font-bold text-blue-800 tracking-widest">
//           Hugot App
//         </div>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </header>
//       <div className="mt-16 p-6 max-w-3xl mx-auto space-y-6">
//         <div className="p-4 bg-white shadow rounded-lg border border-gray-300">
//           <textarea
//             value={postText}
//             onChange={(e) => setPostText(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//             placeholder="What's on your mind?"
//           />
//           <div className="flex justify-between items-center mt-2">
//             <button
//               onClick={() => setShowFeelingOptions(!showFeelingOptions)}
//               className="text-gray-500 hover:text-gray-800 transition"
//             >
//               <FaSmile />
//               <span className="ml-2">Feeling/activity</span>
//             </button>
//             <button
//               onClick={addPost}
//               className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition"
//             >
//               Post
//             </button>
//           </div>
//         </div>

//         {posts.map((post) => (
//           <Post
//             key={post.post_id}
//             post={post}
//             addComment={addComment}
//             likePost={likePost}
//             user_id={userId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;