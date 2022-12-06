import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import { editPostReducer } from '../reducer/editPost-reducer';
import { AuthContext } from '../context/auth-context';

const EditPost = () => {

    /** Author Info */
    const { state } = useContext(AuthContext);
    const { authorInfo } = state;

    const navigate = useNavigate();

    /** postList/:id */
    const params = useParams();
    const { id: postId } = params;

    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [article, setArticle] = useState('');
    const [image, setImage] = useState('');
    const [intro, setIntro] = useState('');
    const [description, setDescription] = useState('');

    /** Edit Post Reducer */
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] = useReducer(editPostReducer, {
        loading: true,
        error: ''
    });

    /** Fetch Post Data From Api */
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                dispatch({ type: "REQUEST_EDIT_POST" });

                const { data } = await axios.get(
                    `https://thejourney-api.onrender.com/server/posts/post/${postId}`
                );

                setAuthor(data.author);
                setCategory(data.category);
                setArticle(data.article);
                setImage(data.image);
                setIntro(data.intro);
                setDescription(data.description);

                dispatch({ type: "SUCCESS_EDIT_POST" });
            } catch (error) {
                dispatch({ 
                    type: "FAIL_EDIT_POST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
            }
        };
        fetchPostData();
    }, [postId])

    /** Upate Post */
    const uploadPostHandler =  async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: "REQUEST_POST_UPDATE" });

            await axios.put(
                `https://thejourney-api.onrender.com/server/posts/post/${postId}`, {
                    _id: postId,
                    author, category, article,
                    image, intro, description
                }, {
                    headers: { authorization: `Bearer ${authorInfo.token}` }
                }
            );

            dispatch({ type: "SUCCESS_POST_UPDATE" });
            navigate('/postList');
        } catch (error) {
            dispatch({ type: "FAIL_POST_UPDATE" });
        }
    };

    /** Upload Image */
    const uploadImageHandler = async (e, imageFile) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            dispatch({ type: "REQUEST_UPLOAD_IMAGE" });

            const { data } = await axios.post(
                'https://thejourney-api.onrender.com/server/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bearer ${authorInfo.token}`,
                    }
                }
            );

            dispatch({ type: "SUCCESS_UPLOAD_IMAGE" });
            setImage(data.secure_url);
        } catch (error) {
            dispatch({ type: "FAIL_UPLOAD_IMAGE" })
        }
    };

    /** ReactQuill Tool Bar */
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    return (
        <div className="h-[100vh] bg-[#f8f9fa] px-6 py-6">
            <header className="text-lg font-semibold tracking-wider">
                Write Some Awesomes Stories...?
            </header>
            <hr className="mt-3 mb-6" />
            {
                loading ? (
                    <p>
                        Loading...
                    </p>
                ) : error ? (
                    <p>
                        {error}
                    </p>
                ) : (
                    <form 
                        onSubmit={uploadPostHandler} 
                        className="px-4 py-4 rounded-md border shadow-CustomShadow bg-white"
                    >
                        <p className="font-[500] mb-3">
                            Stories Lists
                        </p>
                        <div className="mb-6 grid grid-cols-3 gap-x-5">
                            <div className="">
                                <label className="block mb-2">
                                    Author
                                </label>
                                <input 
                                    type="text"
                                    value={author}
                                    required
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">
                                    Category
                                </label>
                                <input 
                                    type="text"
                                    value={category}
                                    required
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">
                                    Article
                                </label>
                                <input 
                                    type="text"
                                    value={article}
                                    required
                                    onChange={(e) => setArticle(e.target.value)}
                                    className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="mb-6 grid grid-cols-3 gap-x-5">
                            <div>
                                <label className="block mb-2">
                                    Image
                                </label>
                                <input 
                                    type="text"
                                    value={loadingUpload ? "Loading..." : image}
                                    required
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">
                                    Upload Image
                                </label>
                                <input 
                                    type="file"
                                    required
                                    onChange={uploadImageHandler}
                                    className="w-[100%] px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">
                                    Intro
                                </label>
                                <input 
                                    type="text"
                                    value={intro}
                                    required
                                    onChange={(e) => setIntro(e.target.value)}
                                    className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2">
                                Description
                            </label>
                            <div className="xl:h-[250px] 2xl:h-[350px]">
                                <ReactQuill 
                                    theme='snow'
                                    modules={modules}
                                    value={description}
                                    onChange={setDescription}
                                    className="h-[100%]"
                                />
                            </div>
                            {/* <textarea 
                                value={description}
                                placeholder="description"
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-[100%] xl:h-[300px] 2xl:h-[400px] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                            /> */}
                        </div>
                        <button
                            type="submit"
                            className="mt-12 px-8 py-1 text-sm bg-[#000000] uppercase text-white rounded-md"
                        >
                            Publish
                        </button>
                        {
                            loadingUpdate && (
                                <p>
                                    Loading...
                                </p>
                            )
                        }
                    </form>
                )
            }
        </div>
    )
};

export default EditPost;