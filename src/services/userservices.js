import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

const userCollectionPost = collection(db, "post");

class PostDataService {
    getAllPost = () =>{
      return getDocs(userCollectionPost)
    }
  }



export default PostDataService = new PostDataService();