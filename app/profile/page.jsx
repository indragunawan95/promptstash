"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

	const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

	const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed){
            try {
                await fetch(`api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                router.push("/");
            } catch (error) {
                console.log(error)
            }
        }
    };
    
	useEffect(() => {
		const fetchPost = async () => {
            console.log("fetching")
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
		};
		if(session?.user.id) fetchPost();
	}, []);
	return (
		<Profile
			name="My"
			desc="Welcome to your personal profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
