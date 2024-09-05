import { useSelector } from "react-redux";
import Post from "./Post";
import Stories from "./Stories";


const Posts = () => {
  const posts = useSelector((store) => store?.post?.posts);

  return (
    <div className="w-[30rem]">
      {/* Stories */}
      <Stories/>

      {posts.map((post, index) => (
        <Post data={post} key={index} />
      ))}
    </div>
  );
};

export default Posts;
