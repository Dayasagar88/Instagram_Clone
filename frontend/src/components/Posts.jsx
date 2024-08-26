
import { useSelector } from "react-redux";
import Post from "./Post";


const Posts = () => {
  const posts = useSelector(store => store?.post?.posts);

  return (
    <div className="w-[30rem]">
        {
            posts.map((post, index) => (<Post data={post} key={index}/>))
        }
    </div>
  );
};

export default Posts;
