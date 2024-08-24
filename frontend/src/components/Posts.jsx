
import Post from "./Post";


const Posts = () => {
  return (
    <div className="w-[30rem]">
        {
            [1,2,3,4].map((item, index) => (<Post key={index}/>))
        }
    </div>
  );
};

export default Posts;
