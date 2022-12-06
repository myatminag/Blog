import Apply from "../models/apply.js";

/** POST: Apply */
export const postApply = async (req, res, next) => {
    try {
        const newApply = await Apply(req.body);
        const apply = await newApply.save();

        res
            .status(200)
            .json(apply)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** GET: All Apply */
let APPLY_LIST_PER_PAGE = 2;

export const getApply = async (req, res, next) => {
    try {
        // Apply Per Page
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || APPLY_LIST_PER_PAGE;

        const applyList = await Apply
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)

        const countApplyList = await Apply.countDocuments();

        res
            .status(200)
            .json({
                applyList,
                countApplyList,
                page,
                pages: Math.ceil(countApplyList / pageSize)
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** GET: Apply Detail */
export const getApplyDetail = async (req, res, next) => {
    try {
        const apply = await Apply.findById(req.params.id);
        // CHECK: if apply id is not equal
        if (!apply) {
            const error = new Error('No apply is found on this ID!');
            error.statusCode = 404;
            throw error;
        }

        res
            .status(200)
            .json(apply)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** DELETE: Apply */
export const deleteApply = async (req, res, next) => {
    try {
        const apply = await Apply.findById(req.params.id);
        // CHECK: if apply id is not equal
        if (!apply) {
            const error = new Error('A author with this ID could not be found!');
            error.statusCode = 401;
            throw error;
        };

        if (apply) {
            await apply.remove();

            res
                .status(200)
                .json({
                    message: "Author Deleted"
                })
        };
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};