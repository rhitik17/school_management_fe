import { useEffect, useState } from "react";
import { listPost } from "../services/endpoints/postApi";
import { getPostTitle, PostType } from "../types/postType";

// Custom hook for class options
export const usePostList = (postType: PostType) => {
  const [postList, setPostList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        setLoading(true);
        const res = await listPost(postType);
        setPostList(res?.data?.results || []);
      } catch (err: any) {
        setError(`Failed to get ${getPostTitle(postType)}`);
        console.error(`Error fetching ${getPostTitle(postType)}`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostList();
  }, []);

  return { postList, loading, error };
};


