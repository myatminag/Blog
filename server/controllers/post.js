import Post from "../models/post.js";
import Author from "../models/author.js";

/** GET: All Post */
export const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find();
        // CHECK: if posts are not found
        if (!posts) {
            const error = new Error('No posts are found!');
            error.statusCode = 404;
            throw error;
        }

        res
            .status(200)
            .json(posts)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** GET: Detail Post */
export const getPostDetails = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        // CHECK: if post id is not equal
        if (!post) {
            const error = new Error('No post is found on this ID!');
            error.statusCode = 404;
            throw error;
        }

        res
            .status(200)
            .json(post)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

/** CREATE: New Post */
export const createNewPost = async (req, res, next) => {
    try {
        const newPost = new Post({
            author: 'author',
            category: 'category',
            article: 'article',
            image: 'image',
            intro: 'intro',
            description: 'description'
        });

        const post = await newPost.save();

        res
            .status(200)
            .json({
                message: "Post Created",
                post
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** UPDATE: Post */
export const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        // CHECK: if post id is not equal
        if (!post) {
            const error = new Error('No Post is found on this ID!');
            error.statusCode = 404;
            throw error;
        };

        if (post) {
            post.author = req.body.author;
            post.category = req.body.category;
            post.article = req.body.article;
            post.image = req.body.image;
            post.intro = req.body.intro;
            post.description = req.body.description;

            await post.save();

            res
                .status(200)
                .json({
                    message: "Post Updated."
                })
        };
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

/** DELETE: Post */
export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        // CHECK: if post id is not equal
        if (!post) {
            const error = new Error('No post is found on this ID!');
            error.statusCode = 404;
            throw error;
        };

        if (post) {
            await post.remove();
            res
                .status(200)
                .json({
                    message: "Post Deleted"
                })
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

/** GET: Post List */
let POST_LIST_PER_PAGE = 10;

export const getPostList = async (req, res, next) => {
    try {
        // List Per Page
        const { query } = req;
        const pageSize = query.pageSize || POST_LIST_PER_PAGE;
        const page = query.page || 1;

        const postList = await Post
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const countPostList = await Post.countDocuments();

        res
            .status(200)
            .json({
                postList,
                countPostList,
                page,
                pages: Math.ceil(countPostList / pageSize)
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** GET: Summary */
export const getSummary = async (req, res, next) => {
    try {
        // Total Posts
        const posts = await Post.aggregate([
            {
                $group: {
                    _id: null,
                    totalPosts: { $sum: 1 }
                }
            }
        ]);
        // Total Authors
        const authors = await Author.aggregate([
            {
                $group: {
                    _id: null,
                    totalAuthors: { $sum: 1 }
                }
            }
        ]);
        // Daily Posts
        const dailyPosts = await Post.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    posts: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // Categories
        const postCategories = await Post.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        res
            .status(200)
            .json({
                posts,
                authors,
                dailyPosts,
                postCategories
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** GET: Category */
export const getCategory = async (req, res, next) => {
    try {
        const categories = await Post.find().distinct('category');
        if (!categories) {
            const error = new Error('No category is found!');
            error.statusCode = 404;
            throw error;
        };

        res
            .status(200)
            .json(categories);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** GET: Search Post */
const POST_PER_PAGE = 15;

export const getSearchPost = async (req, res, next) => {
    try {
        const { query } = req;
        const pageSize = query.pageSize || POST_PER_PAGE;
        const page = query.page || 1;
        const category = query.category || '';
        const searchQuery = query.query || '';

        const filterQuery = searchQuery && searchQuery !== 'all' ? {
            article: {
                $regex: searchQuery,
                $options: 'i'
            }
        } : {};

        const filterCategory = category && category !== 'all' ? { category } : {}
           
        const posts = await Post
            .find({
                ...filterQuery,
                ...filterCategory
            })
            .skip((page -1 ) * pageSize)
            .limit(pageSize)

        const countPosts = await Post.countDocuments({
                ...filterQuery,
                ...filterCategory
            })

        res
            .status(200)
            .json({
                posts,
                countPosts,
                page,
                pages: Math.ceil(countPosts / pageSize)
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};